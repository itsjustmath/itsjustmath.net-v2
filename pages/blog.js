import fs from "fs";
import { Fragment } from "react";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

const pageName = "Blog";

export default function BlogPage({ posts }) {
  return (
    <Fragment>
      <Head>
        <title>{pageName}</title>
      </Head>
      <h1>{pageName}</h1>

      {posts.length ? (
        <>
          <p className="margin-maker" />
          {posts.map((post) => (
            <div key={post.filePath}>
              <h2>{post.data.title}</h2>

              {post.data.description && (
                <div>
                  <p>{post.data.description}</p>
                </div>
              )}
              <p>
                <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                  href={`/posts/[slug]`}
                >
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

BlogPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DefaultLayout>{page}</DefaultLayout>
    </Layout>
  );
};

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
