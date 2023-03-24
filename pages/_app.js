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
          images: [
            {
              url: "https://itsjustmath.net/images/tie-dye-justin.jpg",
              width: 1146,
              height: 1146,
              alt: "Justin Mather",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@itsjustmath",
          cardType: "summary_large_image",
        }}
      />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
