import Image from "next/image";
import Link from "next/link";

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

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
              <Link href={href}>
                <a target="_blank">{title}</a>
              </Link>
            </h2>
          </div>
          <Link href={href} target="_blank">
            <a className="media" target="_blank">
              <div className="image">
                <picture>
                  <Image
                    loader={imageLoader}
                    src={img}
                    alt={title}
                    width={3840}
                    height={2160}
                  />
                </picture>
              </div>
            </a>
          </Link>
        </div>
      )}

      {!!children && children}
    </div>
  );
}
