import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

export function Playground({ __code, __scope, children }: any) {
  return <React.Fragment>
    {/*<pre>{__code}</pre>*/}
    <LiveProvider code={__code} scope={__scope}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </React.Fragment>;
}
