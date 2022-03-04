import fs from 'fs'
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";
import Layout from "../components/Layout";
import DefaultLayout from "../components/layouts/DefaultLayout";
import MarginFigure from "../components/MarginFigure";
import profilePic from "../public/images/tie-dye-justin.jpg";
export default function IndexPage({ posts }) {
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
          wrapInDiv={true}
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
      </>

      {/* {posts.length && <h2>Recent Posts</h2>}
      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul> */}
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
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
