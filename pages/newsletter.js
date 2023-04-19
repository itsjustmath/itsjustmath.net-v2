import Head from "next/head";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { config } from "../config";

const pageName = "Newsletter";

export default function NewsletterPage() {
  return (
    <>
      <Head>
        <title key="title">
          {pageName} | {config.title}
        </title>
      </Head>
      {/* TODO: hide on 'newsletter' page */}
      <div className="wrapper">
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/itsjustmath"
          method="post"
          target="popupwindow"
          onSubmit={() => {
            window.open("https://buttondown.email/itsjustmath", "popupwindow");
          }}
          className="newsletter-form"
        >
          <h2 style={{ marginBottom: 15 }}>Subscribe to My Newsletter</h2>

          <div>
            <input
              required
              type="email"
              name="email"
              id="bd-email"
              placeholder="Your email"
              className="form-input w-100 sans-serif"
              style={{ marginBottom: 7 }}
            />
            <div>
              <input type="submit" className="btn" value="Subscribe" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

NewsletterPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DefaultLayout>{page}</DefaultLayout>
    </Layout>
  );
};
