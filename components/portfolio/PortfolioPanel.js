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
                  <Image src={img} alt={title} layout="fill" priority={true} />
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
