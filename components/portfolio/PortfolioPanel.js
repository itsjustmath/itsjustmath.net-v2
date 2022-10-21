import Image from "next/image";
import Link from "next/link";

export default function PortfolioPanel({
  alignment,
  title,
  img,
  href,
  panelColor,
  children,
  classNames,
  index,
}) {
  return (
    <div
      className={`panel ${alignment ? alignment : ""} ${
        classNames ? classNames : ""
      }`}
      panelcolor={panelColor}
      key={index}
    >
      {!!title && (
        // {!!title && !!img && (
        <div className="inner">
          <div className="copy">
            <h2 className="font-black">
              <a href="#">{title}</a>
            </h2>
          </div>
          <a href="#" className="media">
            <div className="image">
              <picture>
                <img src={img} />
              </picture>
            </div>
          </a>
        </div>
      )}

      {!!children && children}
    </div>
  );
}
