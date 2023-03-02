import fs from "fs";
import { Fragment } from "react";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import { config } from "../config";
import { notesFilePaths, NOTES_PATH } from "../utils/mdxUtils";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";

const pageName = "Notes";

export default function NotesPage({ sortedNotes }) {
  return (
    <Fragment>
      <Head>
        <title>
          {pageName} | {config.title}
        </title>
      </Head>
      <h1>{pageName}</h1>

      {sortedNotes.length ? (
        <>
          <p className="margin-maker" />
          {sortedNotes.map((note) => (
            <div key={note.filePath}>
              <h2>
                <Link as={`/${note.slug}`} href={`/${note.slug}`}>
                  {note.data.title}
                </Link>
              </h2>

              {note.data.description && (
                <div>
                  <p>{note.data.description}</p>
                </div>
              )}
              <p>
                <Link as={`/${note.slug}`} href={`/${note.slug}`}>
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

NotesPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DefaultLayout>{page}</DefaultLayout>
    </Layout>
  );
};

export function getStaticProps() {
  const notes = notesFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(NOTES_PATH, filePath));
    const { content, data } = matter(source);
    const slug = filePath.replace(/\.mdx$/, "");

    return {
      content,
      data,
      slug,
      filePath,
    };
  });

  const sortedNotes = notes.sort((a, b) => {
    return Date.parse(b.data.publishDate) - Date.parse(a.data.publishDate);
  });

  return { props: { sortedNotes } };
}
