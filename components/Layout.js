import Head from "next/head";
import { config } from "../config";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
        <meta name="author" content={config.author} key="author" />
      </Head>
      {children}
    </>
  );
}
