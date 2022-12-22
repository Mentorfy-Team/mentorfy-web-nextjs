import EmotionRootStyleRegistry from '../EmotionRootStyleRegistry';

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <EmotionRootStyleRegistry>{children}</EmotionRootStyleRegistry>
      </body>
    </html>
  );
}
