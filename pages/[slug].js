import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import { config } from "../config";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { essayFilePaths, ESSAYS_PATH } from "../utils/mdxUtils";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
  FullWidth: dynamic(() => import("../components/FullWidth")),
  MainColumn: dynamic(() => import("../components/MainColumn")),
  MarginFigure: dynamic(() => import("../components/MarginFigure")),
  MarginNote: dynamic(() => import("../components/MarginNote")),
  SideNote: dynamic(() => import("../components/SideNote")),
};

export default function PostPage({ source, frontMatter }) {
  return (
    <>
      <Head>
        <title>
          {frontMatter.title} | {config.title}
        </title>
      </Head>
      <>
        <h1>{frontMatter.title}</h1>
        {frontMatter.subtitle && (
          <p className="subtitle">{frontMatter.subtitle}</p>
        )}
      </>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </>
  );
}

PostPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DefaultLayout>{page}</DefaultLayout>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(ESSAYS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = essayFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
