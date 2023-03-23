import { GoogleAnalytics } from "nextjs-google-analytics";
import { DefaultSeo } from "next-seo";
import { config } from "../config";
import "../styles/global.scss";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  // REVIEW: what does the fallback layout look like?

  return getLayout(
    <>
      <DefaultSeo
        title={config.title}
        description={config.description}
        openGraph={{
          url: "https://itsjustmath.net/",
          title: config.title,
          description: config.description,
          site_name: "itsjustmath.net", // REVIEW: or call it Justin Mather?
        }}
        twitter={{
          handle: "@itsjustmath",
          site: "@itsjustmath",
          cardType: "summary_large_image",
        }}
      />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
