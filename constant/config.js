'use client';

import { SERVER_CONFIG } from './server-config';

export const APP_CONFIG = {
  ...SERVER_CONFIG,
  // 在这里添加仅客户端需要的配置
  clientOnly: true
};