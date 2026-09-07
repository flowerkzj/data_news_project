import type { Metadata } from 'next';
import './globals.css';
import './chart-polish.css';
import './chart-v4.css';
import './h5-v4.css';
import './h5-number-row.css';
import './opening-copy.css';
import './data-narrative.css';

export const metadata: Metadata = {
  title: '独居青年：空巢的孤独，还是高巢的自由？',
  description: '一篇关于独居青年、消费、幸福感与社会联系的数据新闻文章骨架。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
