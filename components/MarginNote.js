import { handleize } from "../utils";

/**
 * Margin Note
 */
export default function MarginNote({ id, children }) {
  return (
    // `.paragraph` necessary for staying within tufte-css layout
    <div className="paragraph">
      <label htmlFor={handleize(id)} className="margin-toggle">
        {" "}
        &#8853;
      </label>
      <input type="checkbox" id={handleize(id)} className="margin-toggle" />
      <span className="marginnote">{children}</span>
    </div>
  );
}
