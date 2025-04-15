import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import I18nProvider from '@/components/I18nProvider';
import { SERVER_CONFIG } from '@/constant/server-config';

export const metadata = {
  title: SERVER_CONFIG.name,
  description: SERVER_CONFIG.description,
  icons: {
    icon: '/imgs/llm-logo.ico' // 更新为正确的文件名
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <I18nProvider>{children}</I18nProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
