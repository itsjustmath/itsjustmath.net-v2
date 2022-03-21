import fs from "fs";
import { Fragment } from "react";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import { config } from "../config";
import { essayFilePaths, ESSAYS_PATH } from "../utils/mdxUtils";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";

const pageName = "Essays";

export default function EssaysPage({ sortedEssays }) {
  // console.log(sortedEssays);
  return (
    <Fragment>
      <Head>
        <title>
          {pageName} | {config.title}
        </title>
      </Head>
      <h1>{pageName}</h1>

      {sortedEssays.length ? (
        <>
          <p className="margin-maker" />
          {sortedEssays.map((essay) => (
            <div key={essay.filePath}>
              <h2>{essay.data.title}</h2>

              {essay.data.description && (
                <div>
                  <p>{essay.data.description}</p>
                </div>
              )}
              <p>
                <Link as={`/${essay.slug}`} href={`/${essay.slug}`}>
                  Read More
                </Link>
              </p>
            </div>
          ))}
        </>
      ) : (
        <h2>Coming Soon</h2>
      )}
    </Fragment>
  );
}

EssaysPage.getLayout = function getLayout(page) {
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
