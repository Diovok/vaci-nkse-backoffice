import { CSSProperties } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import atomOneDark from 'react-syntax-highlighter/dist/styles/atom-one-dark';
// @ts-ignore
import atomOneLight from 'react-syntax-highlighter/dist/styles/atom-one-light';


// project-imports
import { ThemeMode } from 'config';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({ children, customStyle, ...others }: { children: string; customStyle?: CSSProperties }) {
  const theme = useTheme();

  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers
      style={theme.palette.mode === ThemeMode.DARK ? atomOneDark : atomOneLight}
      customStyle={customStyle}
      {...others}
    >
      {children}
    </SyntaxHighlighter>
  );
}
