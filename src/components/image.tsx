'use client';

import clsx from 'clsx';
import NextImage from 'next/image';
import { ImageProps } from '@/components/types';

const DEFAULT_QUALITY = 70;

export const Image = (props: ImageProps) => {
  const {
    src,
    width,
    fill,
    sizes,
    aspectRatio,
    quality = DEFAULT_QUALITY,
    className,
    imageClassName,
    objectType,
    ...restImage
  } = props;

  const hasGif = typeof src === 'string' && src.includes('.gif');

  if (fill && !aspectRatio) {
    throw new Error('aspectRatio is required when fill is true');
  }

  if (fill && !sizes) {
    throw new Error('sizes is required when fill is true');
  }

  return (
    <div
      className={clsx('static', fill && 'w-full', className)}
      style={{
        ...(fill && { aspectRatio })
      }}
    >
      <NextImage
        {...restImage}
        width={width}
        src={src}
        sizes={sizes}
        fill={fill}
        className={clsx(imageClassName, objectType ?? objectType)}
        {...(hasGif && { unoptimized: true })}
      />
    </div>
  );
};
