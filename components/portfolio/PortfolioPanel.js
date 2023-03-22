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
              <Link href={href} target="_blank">
                {title}
              </Link>
            </h2>
          </div>
          <Link href={href} target="_blank" className="media">
            <div className="image">
              <picture>
                <Image src={img} alt={title} layout="fill" />
              </picture>
            </div>
          </Link>
        </div>
      )}

      {!!children && children}
    </div>
  );
}
