import { handleize } from "../utils";

/**
 * Side Note
 *
 * @name SideNote
 * @description Add some text to the margin of a page
 * @param {string} id - Human-readable text (handleized into an ID)
 * @param {JSX} [children] - for passing a caption into the component (accepts MD)
 * @example
 * <SideNote id='Arbitrary ID'>
 *  Markdown formatted caption
 * </SideNote>
 */
export default function SideNote({ id, children }) {
  return (
    <>
      <label
        htmlFor={handleize(id)}
        className="margin-toggle sidenote-number"
      ></label>
      <input type="checkbox" id={handleize(id)} className="margin-toggle" />
      <span className="sidenote">{children}</span>
    </>
  );
}
