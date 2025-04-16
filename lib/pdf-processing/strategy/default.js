import * as pdfjsLib from 'pdfjs-dist';
import { getProjectRoot } from '@/lib/db/base';
import fs from 'fs';
import path from 'path';

class DefaultStrategy {
    async process(projectId,fileName) {
        console.log("正在执行PDF默认转换策略......")
        // 获取项目根目录
        const projectRoot = await getProjectRoot();
        const projectPath = path.join(projectRoot, projectId);

        // 获取文件路径
        const filePath = path.join(projectPath, 'files', fileName);
        
        const loadingTask = pdfjsLib.getDocument(filePath);
        const pdfDocument = await loadingTask.promise;

         let textContent = '';
         for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
             const page = await pdfDocument.getPage(pageNum);
             const content = await page.getTextContent();
             textContent += content.items.map(item => item.str).join(' ') + '\n';
         }

         //转后文件名
        const convertName = fileName.replace(/\.([^.]*)$/, '') + ".md";

        // 保存提取的文本内容
        const outputFile = path.join(projectPath, 'files', convertName);
        console.log(`Writing to ${outputFile}...`);
        fs.writeFileSync(outputFile, textContent);
        console.log('Done.');
        console.log("PDF转换完成！")
        //仅将修改后的文件名返回即可，不需要完整路径
        return convertName;
    }
}

module.exports = DefaultStrategy;
