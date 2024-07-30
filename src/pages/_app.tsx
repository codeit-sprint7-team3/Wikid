import '@/styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
