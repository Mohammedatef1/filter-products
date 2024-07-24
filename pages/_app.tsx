import ReactQueryProvider from "@/components/Providers";
import "@/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </ReactQueryProvider>
  );
}
