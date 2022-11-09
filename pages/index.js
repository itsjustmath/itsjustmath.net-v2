import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { essayFilePaths, ESSAYS_PATH } from "../utils/mdxUtils";
import { config } from "../config";
import Layout from "../components/Layout";
import PortfolioLayout from "../components/layouts/PortfolioLayout";
import MarginFigure from "../components/MarginFigure";
export default function IndexPage({ sortedEssays: essays }) {
  return (
    <>
      <Head>
        <title key="title">Start Here | {config.title}</title>
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
          engineer. When I’m not working, you can find me hiking, biking, reading,
          sipping coffee, or laughing at my own terrible puns.
        </p>
        <p>
          I currently work at a consulting agency called {" "}
          <em>
            <a
              href="https://www.accenture.com/ch-en/about/accenture-song-index"
              title="Accenture Song"
              target="_blank"
            >
              Accenture Song
            </a>
          </em>
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
          I’m interested in exploring how to use technology to improve people's lives, provide a new engaging medium for learning and storytelling, and to make interpersonal communication and collaboration more effective (so we can devote time
          and energy to what's most important to us).
        </p>

        <h3>Read My Latest Essay:</h3>
        <p>
          <a href="https://writeofpassage.school/2022/08/26/how-to-make-friends-on-the-internet/" target="_blank">How to Make Friends on the Internet</a>
        </p>
      </>
    </>
  );
}

IndexPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PortfolioLayout>{page}</PortfolioLayout>
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
