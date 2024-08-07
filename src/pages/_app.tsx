import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/header/Header';
import useAuthStore from '@/store/AuthStore';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
