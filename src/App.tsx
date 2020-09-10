import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';

import MDX, { metadata } from './example.mdx';

interface AppProps {
}

function App({}: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {JSON.stringify(metadata)}
        </div>

        <MDXWrapper>
          <MDX />
          <MDX />
          <MDX />
        </MDXWrapper>
      </header>
    </div>
  );
}

function MDXWrapper({ children }) {
  const components = {
    pre: props => <div {...props} />,
    code: CodeBlock,
  };

  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
}

function CodeBlock({ children }) {
  return (
    <Highlight {...defaultProps} code={children} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default App;
