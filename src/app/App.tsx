import { useState } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import '@wcj/dark-mode';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import img from './avatar.jpg';

const Wrapper = styled.main`
  text-align: center;
`;

const Header = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 6rem;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 4rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji';
  margin-top: 4rem;
`;

const Input = styled.input`
  padding: 10px 10px;
  min-width: 320px;
`;

const InputRange = styled.input`
  min-width: 320px;
`;

const Label = styled.label`
  margin-top: 1rem;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 0.25rem;
  margin-inline: 1rem;
  margin-top: 2rem;
`;

const Image = styled.img<{ $filter: number }>`
  max-width: 100%;
  filter: blur(${(props) => props.$filter}px);
`;

const App = () => {
  const [range, setRange] = useState(75);
  const [imgSrc, setImgSrc] = useState(img);
  return (
    <Wrapper>
      <dark-mode permanent light="Light" dark="Dart" style={{ position: 'fixed', top: '6px', left: '10px', fontSize: 18 }} />
      <GitHubCorners fixed size={56} target="_blank" href="https://uiwjs.github.io/css-filter/" />
      <Header>
        <Title>Blur an image</Title>
        <Input type="url" spellCheck={false} onChange={(evn) => setImgSrc(evn.target.value || img)} placeholder={img} />
        <Label>
          <InputRange type="range" max={100} min={0} value={range} onChange={(evn) => setRange(Number(evn.target.value))} />
        </Label>
        <CodeMirror
          theme="dark"
          readOnly
          value={`img {\n  filter: blur(${range}px);\n}`}
          extensions={[css()]}
          basicSetup={false}
          style={{ textAlign: 'left' }}
        />
        <ImageWrapper>
          <Image src={imgSrc} alt="Blur an image" $filter={range} />
        </ImageWrapper>
      </Header>
    </Wrapper>
  );
};

export default App;
