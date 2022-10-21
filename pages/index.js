import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { essayFilePaths, ESSAYS_PATH } from "../utils/mdxUtils";
import { config } from "../config";
import Layout from "../components/Layout";
import PortfolioLayout from "../components/layouts/PortfolioLayout";
import MarginFigure from "../components/MarginFigure";
import SideNote from "../components/SideNote";

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
          engineer. When I’m not working, you can find me hiking, reading,
          sipping coffee, or laughing at my own terrible puns.
        </p>
        <p>
          I lead builds
          <SideNote id="portfolio">
            Keep scrolling to preview some of the sites I’ve help build
          </SideNote>{" "}
          at an agency of called{" "}
          <em>
            <a
              href="https://www.accenture.com/ch-en/about/accenture-song-index"
              title="Accenture Song"
              target="_blank"
            >
              Accenture Song
            </a>
          </em>
          <SideNote id="acquisition">
            The interactive digital wing of Accenture
          </SideNote>
          . Prior to my current position, I worked on the apartment rental
          platform, Radpad.
        </p>
        <p>
          {/* Add note about "growth"? Pull from 12 fav problems */}
          I’m interested in exploring how to use technology to: improve people’s
          lives, provide a new engaging medium for learning{" "}
          <s>teaching and storytelling</s>, and to make interpersonal
          communication and collaboration more effective (so we can devote time
          and energy to what's most important to us).
        </p>

        {/* TODO: read my latest essay */}
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
