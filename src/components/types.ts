import { Control, FieldError } from 'react-hook-form';
import { ImageProps as NextImageProps } from 'next/image';
import { ReactElement, ReactNode } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'filled' | 'outlined' | 'ghost' | 'bright';
  size?: 'xs' | 'lg';
  link?: string | null;
  linkclassname?: string;
  isloading?: string | boolean;
}

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  inputClassName?: string;
  inputWidth?: number | Array<number>;
  inputHeight?: number | Array<number>;
  error?: FieldError | undefined;
  appearance?: 'square' | 'circle';
  tick?: boolean;
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  labelStyle?: 'outer' | 'inner' | 'floating';
  labelClassName?: string;
  error?: FieldError | undefined;
  control?: Control<any, any>;
  required?: boolean;
}

export interface InputLabelProps extends React.HTMLProps<HTMLInputElement> {
  label: string | undefined;
  labelStyle?: 'outer' | 'inner' | 'floating';
  focused: boolean;
  hasValue: boolean;
  required: boolean;
  disabled: boolean;
  id: string | undefined;
  className: string;
  hasError?: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
  tag?: 'section' | 'div' | 'span' | 'main';
  appearance?: 'thinnest' | 'thin' | 'wide' | 'full';
  outerClassName?: string;
  className?: string;
}

export interface ImageProps extends NextImageProps {
  /**
   * @param {number} imageHeight - If fill is not true, you can set height of the image with this param.
   */
  imageHeight?: number | `${number}` | null;

  /**
   * @param {boolean} fill - Fills the container behinds it, needs "sizes" and "aspectRatio" params.
   *
   * @param {string} sizes - sizes="(max-width: 768px) 100vw, 33vw"
   * First, the value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically generated srcset.
   * When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport.
   * The sizes property allows you to tell the browser that the image will actually be smaller than full screen.
   * If you don't specify a sizes value in an image with the fill property, a default value of 100vw (full screen width) is used.
   *
   *  Second, the sizes property changes the behavior of the automatically generated srcset value.
   * If no sizes value is present, a small srcset is generated, suitable for a fixed-size image (1x/2x/etc).
   * If sizes is defined, a large srcset is generated, suitable for a responsive image (640w/750w/etc).
   * If the sizes property includes sizes such as 50vw, which represent a percentage of the viewport width,
   * then the srcset is trimmed to not include any values which are too small to ever be necessary.
   *
   * @param {number} aspectRatio - width/height value applied to outer div of image component.
   */
  fill?: boolean;

  /**
   * @param {boolean} fillWithSize - If enabled let's the "height" param to change height of outside div. Can be used with "showBG".
   * @param {boolean} showBG - If enabled with "fillWithSize" param adds a blurred background image which fills the outer div.
   */
  fillWithSize?: boolean;

  /**
   * @param {boolean} showBG - If enabled with "fillWithSize" param adds a blurred background image which fills the outer div.
   * @param {boolean} fillWithSize - If enabled let's the "height" param to change height of outside div. Can be used with "showBG".
   */
  showBG?: boolean;

  /**
   * @param {number} aspectRatio - width/height value applied to outer div of image component.
   */
  aspectRatio?: number;

  /**
   * @param {number} sizes - sizes="(max-width: 768px) 100vw, 33vw"
   * First, the value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically generated srcset.
   * When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport.
   * The sizes property allows you to tell the browser that the image will actually be smaller than full screen.
   * If you don't specify a sizes value in an image with the fill property, a default value of 100vw (full screen width) is used.
   *
   *  Second, the sizes property changes the behavior of the automatically generated srcset value.
   * If no sizes value is present, a small srcset is generated, suitable for a fixed-size image (1x/2x/etc).
   * If sizes is defined, a large srcset is generated, suitable for a responsive image (640w/750w/etc).
   * If the sizes property includes sizes such as 50vw, which represent a percentage of the viewport width,
   * then the srcset is trimmed to not include any values which are too small to ever be necessary.
   */
  sizes?: string;

  /**
   * @param {string} imageClassName - class of the image.
   */
  imageClassName?: string;

  /**
   * @param {'object-contain' | 'object-cover'} objectType - is object-cover(crops the image) or object-contain(doesn't crop, trims the width).

   */
  objectType?: 'object-contain' | 'object-cover';
}

export interface PriceProps {
  value: number;
  displayType?: 'input' | 'text';
  decimalScale?: number;
  thousandSeperator?: '.' | ',';
  decimalSeperator?: '.' | ',';
  currency?: string;
  fixedDecimalScale?: true;
}

export type AccordionItemProps = {
  active: number;
  accordionId: number;
  title?: string;
  showIcon?: boolean;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  activeClassName?: string;
  activeTitleClassName?: string;
  iconClassName?: string;
  handleToggle: (index: any) => void;
};

export type TabTitleProps = {
  title: string;
  id: number;
};

export type TabItemProps = {
  active: number;
  tabId: number;
  title: string;
  handleToggle: (index: any) => void;
  className?: string;
};

export type TabContentProps = {
  active: number;
  tabId: number;
  children?: ReactNode;
};

export type SelectItem = {
  label: string | number;
  value: string | number;
  class?: string;
  is_selected?: boolean;
};

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: SelectItem[];
  loading?: boolean;
  labelStyle?: 'default' | 'floating';
  labelClassName?: string;
  itemListClassName?: string;
  itemClassName?: string;
  selectedOption: any;
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
}

export interface SliderMenuProps extends React.HTMLProps<HTMLDivElement> {
  open: boolean;
  /**
   * @param {PayloadAction} closePop - PayloadAction or boolean
   */
  closePop?: PayloadAction;
  enableDesktop?: boolean;
  /**
   * @param {string} desktopWidth - Mobile width will be full screen, desktop width is determined by tailwind style, for ex: sm:w-96
   */
  desktopWidth?: string;
  className?: string;
  children: ReactNode;
}
