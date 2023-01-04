import EmotionRootStyleRegistry from '../EmotionRootStyleRegistry';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <head>
        <title>MentorFy</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="theme-color" content="#FE7D22" />
        <meta
          name="description"
          content="A primeira Área de membros 100% focada em processos de mentorias com
          experiência Premium."
        />
        <meta name="robots" content="index, follow" />
        <meta
          httpEquiv="Content-Type"
          lang="pt-BR"
          content="text/html; charset=utf-8"
        />
        <meta name="language" content="Portuguese" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="MentorFy" />
        <meta name="keywords" content="MentorFy" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta name="canonical" content="https://www.mentorfy.com.br" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MentorFy" />
        <meta
          property="og:description"
          content="A primeira Área de membros 100% focada em processos de mentorias com
          experiência Premium."
        />
        <meta property="og:url" content="https://www.mentorfy.com.br" />
        <meta property="og:site_name" content="MentorFy" />
        <meta property="og:image" content="/images/lp-main-image.png" />
        {/* canonical */}
        <link rel="canonical" href="https://www.mentorfy.com.br" />
        <meta lang="pt-br" />
      </head>
      <body>
        <EmotionRootStyleRegistry>{children}</EmotionRootStyleRegistry>
      </body>
    </html>
  );
}
