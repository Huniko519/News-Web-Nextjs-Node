import React from 'react';
import NextDocument, {
  Html, Head, Main, NextScript,
} from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const dirtyAmp = true;
    return {
      dirtyAmp, ...initialProps,
    };
  }

  render() {
    const { dirtyAmp } = this.props;
    return (
      <Html lang="en" data-dirty-amp={dirtyAmp}>
        <Head />
        <Main />
        <NextScript />
      </Html>
    );
  }
}

export default Document;
