import React, { useContext } from 'react';
import Head from 'next/head';
import PageContext from './PageContext';

const Skimlinks = () => {
  const ctx = useContext(PageContext);
  return (
    !ctx.dirtyAmp
    && (
      <>
        <Head>
          <script async custom-element="amp-skimlinks" src="https://cdn.ampproject.org/v0/amp-skimlinks-0.1.js" />
        </Head>
        <amp-skimlinks layout="nodisplay" publisher-code="55199X1622456" data-block-on-consent="" />
      </>
    )
  );
};

export default Skimlinks;
