import EmotionRootStyleRegistry from './EmotionRootStyleRegistry';

export default function RootLayout({ children }: { children: JSX.Element }) {
  console.log('RootLayout');
  return (
    <html>
      <head></head>
      <body>
        <EmotionRootStyleRegistry>{children}</EmotionRootStyleRegistry>
      </body>
    </html>
  );
}
