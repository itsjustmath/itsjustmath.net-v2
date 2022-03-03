import Image from "next/image";

/**
 * Full Width (Figure/Image)
 *
 * @name FullWidth
 * @description Add a full-wdith image (with an optional caption)
 * @param {string} image - path to image
 * @param {number} height
 * @param {number} width
 * @param {string} [caption]
 * @example
 * <FullWidth
      image='path/to/image'
      height={300}
      width={300}
      caption='This is the (optional) caption'
    />;
 */

export default function FullWidth({ image, height, width, caption }) {
  return (
    <figure className="fullwidth">
      <Image src={image} alt={caption} height={height} width={width} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
