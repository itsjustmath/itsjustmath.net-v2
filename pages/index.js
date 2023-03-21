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
import Link from "next/link";
export default function IndexPage({ sortedEssays: essays }) {
  const pageTitle = `Start Here | ${config.title}`;

  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
      </Head>
      <>
        <h1>Hi, I’m Justin!</h1>
        <MarginFigure
          id="Justin Mather"
          image="/images/tie-dye-justin.jpg"
          height={300}
          width={300}
        />
        <p>
          I’m a New York-born and Los Angeles-raised front-end developer / UI
          engineer. When I’m not working, you can find me hiking, biking,
          reading, sipping coffee, or laughing at my own terrible puns.
        </p>
        <p>
          I build sites for a consulting agency called{" "}
          <em>
            <a
              href="https://www.accenture.com/ch-en/about/accenture-song-index"
              title="Accenture Song"
              target="_blank"
            >
              Accenture Song
            </a>
          </em>
          . Prior to that I worked on the apartment rental platform, Radpad.
          <SideNote id="portfolio">
            Keep scrolling to preview some of the sites I’ve help build
          </SideNote>{" "}
        </p>
        <p>
          I’m interested in exploring how to use technology to improve people's
          lives, provide a new engaging medium for learning and storytelling,
          and to make interpersonal communication and collaboration more
          effective (so we can devote time and energy to what's most important
          to us).
        </p>

        <h3>Read My Latest Essays:</h3>
        <p>
          <Link href="/cultivating-collective-creativity">
            Cultivating Collective Creativity
          </Link>
        </p>
        <p>
          <a
            href="https://writeofpassage.school/2022/08/26/how-to-make-friends-on-the-internet/"
            target="_blank"
          >
            How to Make Friends on the Internet
          </a>
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
