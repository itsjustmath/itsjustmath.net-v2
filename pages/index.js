import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { essayFilePaths, ESSAYS_PATH } from "../utils/mdxUtils";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";
import MarginFigure from "../components/MarginFigure";
export default function IndexPage({ sortedEssays: essays }) {
  return (
    <>
      <Head>
        <title>Start Here</title>
      </Head>
      <>
        <MarginFigure
          id="Justin Mather"
          image="/images/tie-dye-justin.jpg"
          height={300}
          width={300}
        />
        {/* TODO: pass this in as MDX? */}
        {/* Intro Blurb */}
        <h1>Hi, I’m Justin!</h1>
        <p>
          I’m a New York-born and Los Angeles-raised front-end developer / UI
          engineer. When I’m not working, you can find me hiking, reading,
          sipping coffee, or laughing at my own terrible puns.
        </p>
        <p>
          I currently work at a digital agency called{" "}
          <strong>
            <em>The Stable</em>
          </strong>{" "}
          — where I’ve helped build sites such as{" "}
          <a href="https://store.stamps.com/">Stamps.com</a>,{" "}
          <a href="https://nhsfunfactory.com/">NHS Fun Factory</a>,{" "}
          <a href="https://www.fijiwater.com">FIJI Water</a>,{" "}
          <a href="https://www.samuseum.org/">San Antonio Museum of Art</a>,{" "}
          <a href="https://www.trustthebum.com/">Sun Bum</a>, and{" "}
          <a href="https://www.zehnergroup.com/work">more</a>. Previously I
          worked on the apartment rental platform,{" "}
          <a href="https://en.wikipedia.org/wiki/RadPad">Radpad</a>.
        </p>
        <p>
          I’m interested in how we can use technology to upgrade our tools and
          techniques, and help us understand the complexity of the world. From
          there we’ll be able to develop new thoughts and new solutions to the
          most pressing issues we face today.
        </p>

        {/* TODO: read my latest essay */}
      </>
    </>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DefaultLayout>{page}</DefaultLayout>
    </Layout>
  );
};

export function getStaticProps() {
  const essays = essayFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(ESSAYS_PATH, filePath));
    const { content, data } = matter(source);
    const slug = filePath.replace(/\.mdx$/, "");

    return {
      content,
      data,
      slug,
      filePath,
    };
  });

  const sortedEssays = essays.sort((a, b) => {
    return Date.parse(b.data.publishDate) - Date.parse(a.data.publishDate);
  });

  return { props: { sortedEssays } };
}
