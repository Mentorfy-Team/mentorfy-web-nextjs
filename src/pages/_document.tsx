import React from 'react';
import {
ServerStyles, createGetInitialProps, createStylesServer,
} from '@mantine/next';
import NextDocument, {
  DocumentContext,
Head, Html, Main, NextScript,
} from 'next/document';
import {rtlCache} from '~/rtl-cache';
import {getCssText} from '~/theme/stitches.config';

const stylesServer = createStylesServer(rtlCache);

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{__html: getCssText()}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
