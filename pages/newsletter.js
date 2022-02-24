import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";

const pageName = "Newsletter";

export default function NewsletterPage() {
  return (
    <>
      <p className="margin-marker">
        <iframe
          scrolling="no"
          style={{
            width: "100%",
            height: 220,
            border: "1px #ccc solid",
            paddingTop: "20px",
          }}
          // style={""}
          src="https://buttondown.email/itsjustmath?as_embed=true"
        ></iframe>
        <br />
        <br />

        <a
          href="https://buttondown.email/itsjustmath/archive"
          target="_blank"
          title="Newsletter Archive"
        >
          Newsletter Archive
        </a>
      </p>
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
