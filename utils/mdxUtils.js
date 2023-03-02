const fs = require("fs");
const path = require("path");

// *_PATH is useful when you want to get the path to a specific file
// *FilePaths is the list of all mdx files inside the *_PATH directory

const ESSAYS_PATH = path.join(process.cwd(), "posts", "essays");

const essayFilePaths = fs
  .readdirSync(ESSAYS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

// NOTES
const NOTES_PATH = path.join(process.cwd(), "posts", "notes");

const notesFilePaths = fs
  .readdirSync(NOTES_PATH)
  .filter((path) => /\.mdx?$/.test(path));

module.exports = {
  essayFilePaths,
  notesFilePaths,
  ESSAYS_PATH,
  NOTES_PATH,
};
