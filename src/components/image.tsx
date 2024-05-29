import clsx from "clsx";
import NextImage from "next/image";
import { ImageProps } from "@/components/types";
import { twMerge } from "tailwind-merge";

export const Image = (props: ImageProps) => {
  const {
    src,
    width,
    height,
    imageHeight,
    fill,
    fillWithSize,
    showBG,
    sizes,
    aspectRatio,
    className,
    imageClassName,
    objectType,
    ...restImage
  } = props;

  const hasGif = typeof src === "string" && src.includes(".gif");

  let imageHg: number | undefined | `${number}`;

  if (fill && !aspectRatio) {
    throw new Error("aspectRatio is required when fill is true");
  }

  if (fill && !sizes) {
    throw new Error("sizes is required when fill is true");
  }

  if (fillWithSize && !sizes) {
    throw new Error("sizes is required when fillWithSizes is true");
  }

  if (fillWithSize === true && fill === true) {
    throw new Error("fill and fillWithSize can not be applied at the same time.");
  }

  if (imageHeight) {
    imageHg = imageHeight;
  }

  if (!imageHeight && height) {
    imageHg = height;
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center relative",
        fill && "w-full h-full",
        fillWithSize && "overflow-hidden w-full relative",
        fillWithSize && showBG && "w-full",
        className
      )}
      style={{
        ...(fill && { aspectRatio }),
        ...(fillWithSize === true && { height }),
      }}
    >
      {fillWithSize && showBG && (
        <NextImage
          {...restImage}
          src={src}
          sizes={sizes}
          fill
          quality={1}
          className={"hidden blur-lg object-cover brightness-75 md:block"}
          {...(hasGif && { unoptimized: true })}
        />
      )}
      <NextImage
        {...restImage}
        width={width}
        height={imageHg}
        src={src}
        sizes={sizes}
        fill={fill}
        className={twMerge(
          fillWithSize && showBG && "z-10 rounded shadow-xl",
          imageClassName,
          objectType && !fillWithSize ? objectType : "object-cover"
        )}
        {...(!fill && { style: { height: imageHg } })}
        {...(hasGif && { unoptimized: true })}
      />
    </div>
  );
};
