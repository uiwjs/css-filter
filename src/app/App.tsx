import { useReducer, useState } from 'react';
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
  display: flex;
  > span {
    width: 90px;
    text-align: right;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 0.25rem;
  margin-inline: 1rem;
  margin-top: 2rem;
`;

type ImageProps = {
  $filter?: string;
};

const Image = styled.img<ImageProps>`
  max-width: 100%;
  filter: ${({ $filter }) => $filter};
`;

interface Filter {
  blur?: number;
  grayscale?: number;
  brightness?: number;
  contrast?: number;
  sepia?: number;
  saturate?: number;
  opacity?: number;
  invert?: number;
}

function reducer(state: Filter, action: Filter): Filter {
  return { ...state, ...action };
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    blur: 0,
    grayscale: 0,
    brightness: 100,
    contrast: 100,
    sepia: 0,
    saturate: 100,
    opacity: 100,
    invert: 0,
  });
  const [imgSrc, setImgSrc] = useState(img);
  const filters = [
    state.blur !== 0 ? `blur(${state.blur}px)` : '',
    state.grayscale !== 0 ? `grayscale(${state.grayscale}%)` : '',
    state.sepia !== 0 ? `sepia(${state.sepia}%)` : '',
    state.saturate !== 100 ? `saturate(${state.saturate}%)` : '',
    state.brightness !== 100 ? `brightness(${state.brightness}%)` : '',
    state.contrast !== 100 ? `contrast(${state.contrast}%)` : '',
    state.opacity !== 100 ? `opacity(${state.opacity}%)` : '',
    state.invert !== 0 ? `invert(${state.invert}%)` : '',
  ].filter(Boolean);
  const filterCSS = filters.length ? `img {\n  filter: ${filters.join(' ')};\n}` : '';
  const labels = [
    {
      type: 'range',
      max: 100,
      min: 0,
      label: 'blur',
      value: state.blur,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          blur: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 100,
      min: 0,
      label: 'grayscale',
      value: state.grayscale,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          grayscale: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 200,
      min: 0,
      label: 'brightness',
      value: state.brightness,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          brightness: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 1000,
      min: 0,
      label: 'contrast',
      value: state.contrast,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          contrast: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 100,
      min: 0,
      label: 'sepia',
      value: state.sepia,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          sepia: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 1000,
      min: 0,
      label: 'saturate',
      value: state.saturate,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          saturate: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 100,
      min: 0,
      label: 'opacity',
      value: state.opacity,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          opacity: Number(evn.target.value),
        }),
    },
    {
      type: 'range',
      max: 100,
      min: 0,
      label: 'invert',
      value: state.invert,
      onChange: (evn: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          invert: Number(evn.target.value),
        }),
    },
  ];
  return (
    <Wrapper>
      <dark-mode permanent light="Light" dark="Dart" style={{ position: 'fixed', top: '6px', left: '10px', fontSize: 18 }} />
      <GitHubCorners fixed size={56} target="_blank" href="https://github.com/uiwjs/css-filter/" />
      <Header>
        <Title>Filter CSS Generator</Title>
        <Input type="url" spellCheck={false} onChange={(evn) => setImgSrc(evn.target.value || img)} placeholder={img} />
        {labels.map(({ label, ...reset }, idx) => {
          return (
            <Label key={idx}>
              <span>{label}:</span>
              <InputRange {...reset} />
            </Label>
          );
        })}
        <CodeMirror
          theme="dark"
          readOnly
          value={filterCSS}
          extensions={[css()]}
          basicSetup={false}
          style={{ textAlign: 'left' }}
        />
        <ImageWrapper>
          <Image src={imgSrc} alt="Blur an image" $filter={filters.join(' ')} />
        </ImageWrapper>
      </Header>
    </Wrapper>
  );
};

export default App;
