'use client';

import clsx from 'clsx';
import NextImage from 'next/image';
import { ImageProps } from '@/components/types';
import { twMerge } from 'tailwind-merge';

export const Image = (props: ImageProps) => {
  const {
    src,
    width,
    height,
    fill,
    fillWithSize,
    sizes,
    aspectRatio,
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

  if (fillWithSize && !sizes) {
    throw new Error('sizes is required when fillWithSizes is true');
  }

  if (fillWithSize === true && fill === true) {
    throw new Error(
      'fill and fillWithSize can not be applied at the same time.'
    );
  }

  let fillValue = !fillWithSize || fill;

  if (!fill && !fillWithSize) {
    fillValue = false;
  }
  if (fill === true) {
    fillValue = fill;
  }

  const fillWithSizeWidth = `w-[${width}px]`;

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        fill && 'w-full',
        fillWithSize && 'overflow-hidden',
        className
      )}
      style={{
        ...(fill && { aspectRatio }),
        ...(fillWithSize && { width, height })
      }}
    >
      <NextImage
        {...restImage}
        width={width}
        height={height}
        src={src}
        sizes={sizes}
        fill={fillValue}
        className={twMerge(imageClassName, objectType ?? objectType)}
        {...(hasGif && { unoptimized: true })}
      />
    </div>
  );
};
