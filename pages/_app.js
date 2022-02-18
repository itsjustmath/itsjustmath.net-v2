import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  // REVIEW: what does the fallback layout look like?

  return getLayout(<Component {...pageProps} />);
}