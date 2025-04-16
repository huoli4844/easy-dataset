import * as pdfjsLib from 'pdfjs-dist';

// 配置PDF.js worker使用CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default pdfjsLib;