import fs from "fs";
import { Feed } from "feed";
import { config } from "../config";

// Source: https://github.com/jpmonette/feed
// https://ashleemboyer.com/how-i-added-an-rss-feed-to-my-nextjs-site
// https://dev.to/sreetamdas/rss-feed-in-a-next-js-site-52d0

export default function generateRSSFeed(posts) {
  const baseUrl = config?.baseUrl;
  const author = {
    name: config?.author,
    email: config?.email,
    link: `https://twitter.com/${config?.handle}`,
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: config?.title,
    description: config?.description,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  // Add each article to the feed
  posts.forEach((post) => {
    const postUrl = `${baseUrl}/${post.slug}`;

    feed.addItem({
      title: post.data.title,
      id: postUrl,
      link: postUrl,
      content: post.content,
      author: [author],
      date: new Date(post.data.publishDate),
    });
  });

  // Write the RSS output to a public file
  fs.writeFileSync("public/rss.xml", feed.rss2());
}
