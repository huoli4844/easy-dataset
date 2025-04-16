import * as pdfjsLib from 'pdfjs-dist';

// 配置PDF.js worker使用本地文件
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default pdfjsLib;