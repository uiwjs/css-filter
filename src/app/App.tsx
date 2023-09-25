import { useEffect, useReducer, useState } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import '@wcj/dark-mode';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import img from './avatar.jpg';

const Wrapper = styled.main`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 900;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji';
  height: 42px;
  border-bottom: 1px solid var(--color-border-default);
  display: flex;
  align-items: center;
  padding-left: 40px;
`;

const Divider = styled.div`
  border-bottom: 1px solid var(--color-border-default);
`;

const Input = styled.input`
  padding: 10px 10px;
  min-width: 100%;
`;

const InputRange = styled.input`
  flex: 1;
`;

const Label = styled.label`
  display: flex;
  background: var(--color-label-bg, #333);
  padding: 5px 5px;
  border-radius: 3px;
  > span {
    width: 90px;
    text-align: right;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

type ImageProps = {
  $filter?: string;
};

const Image = styled.img<ImageProps>`
  max-width: 100%;
  filter: ${({ $filter }) => $filter};
`;

const Main = styled.main`
  height: calc(100vh - 42px);
  display: grid;
  grid-template-columns: 300px 1fr;
  overflow: hidden;
`;

const Aside = styled.aside`
  border-right: 1px solid var(--color-border-default);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;
const Article = styled.article`
  overflow: auto;
  padding: 1rem;
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
  theme?: 'light' | 'dark';
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
  useEffect(() => {
    document.addEventListener('colorschemechange', (evn) => {
      dispatch({
        theme: evn.detail.colorScheme === 'dark' ? 'dark' : 'light',
      });
    });
    dispatch({
      theme: document.documentElement.dataset.colorMode === 'dark' ? 'dark' : 'light',
    });
  }, []);

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
  const filterCSS = filters.length ? `img {\n   filter: ${filters.join('\n       ')};\n}` : '';
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
      <dark-mode permanent style={{ position: 'fixed', top: 9, left: 10, fontSize: 21 }} />
      <GitHubCorners fixed size={52} target="_blank" href="https://github.com/uiwjs/css-filter/" />
      <Title>Filter CSS Generator</Title>
      <Main>
        <Aside>
          <Input type="url" spellCheck={false} onChange={(evn) => setImgSrc(evn.target.value || img)} placeholder={img} />
          {labels.map(({ label, ...reset }, idx) => {
            return (
              <Label key={idx}>
                <span>{label}:</span>
                <InputRange {...reset} />
              </Label>
            );
          })}
          <Divider />
          <CodeMirror
            // theme="light"
            theme={state.theme === 'dark' ? 'dark' : 'light'}
            readOnly
            value={filterCSS}
            extensions={[css()]}
            basicSetup={false}
            style={{ textAlign: 'left' }}
          />
        </Aside>
        <Article>
          <ImageWrapper>
            <Image src={imgSrc} alt="Blur an image" $filter={filters.join(' ')} />
          </ImageWrapper>
        </Article>
      </Main>
    </Wrapper>
  );
};

export default App;
