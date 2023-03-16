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
import {
  essayFilePaths,
  noteFilePaths,
  ESSAYS_PATH,
  NOTES_PATH,
} from "../utils/mdxUtils";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
export const components = {
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

export default function PostPage({ source, frontMatter, slug }) {
  // console.log("source", source);

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
  const essays = fs.readdirSync(ESSAYS_PATH);
  const notes = fs.readdirSync(NOTES_PATH);

  let type;
  if (("essays", essays.find((file) => file.includes(params.slug)))) {
    type = "essay";
  } else if (notes.find((file) => file.includes(params.slug))) {
    type = "note";
  }

  // switch case statement to determine which file to load
  let filePath;
  switch (type) {
    case "essay":
      filePath = path.join(ESSAYS_PATH, `${params.slug}.mdx`);
      break;
    case "note":
      filePath = path.join(NOTES_PATH, `${params.slug}.mdx`);
      break;
  }

  const source = fs.readFileSync(filePath);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      development: false,
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  // Get slugs for all file paths passed in
  const getSlugParams = (filePaths) =>
    filePaths
      // Remove the .mdx extension
      .map((path) => path.replace(/\.mdx?$/, ""))
      .map((slug) => ({ params: { slug } }));
  const essayPaths = getSlugParams(essayFilePaths);
  const notepaths = getSlugParams(noteFilePaths);

  const paths = notepaths.concat(essayPaths);

  return {
    paths,
    fallback: false,
  };
};
