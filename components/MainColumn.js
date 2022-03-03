import Image from "next/image";

/**
 * Main Column (Image/Figure)
 *
 * @name MainColumn
 * @description Add an image (with an optional caption) within the text container
 * @param {string} image - path to image
 * @param {number} height
 * @param {number} width
 * @param {string} [caption]
 * @param {JSX} [children]
 * @example
 * <MainColumn
      image='path/to/image'
      height={300}
      width={300}
      caption='This is the (optional) caption'
    />;
 */

export default function MainColumn({
  image,
  height,
  width,
  caption,
  children,
}) {
  return (
    <figure>
      <figcaption>
        <span>{children}</span>
      </figcaption>
      <Image src={image} height={height} width={width} alt={caption} />
    </figure>
  );
}
