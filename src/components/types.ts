import { Control, FieldError } from 'react-hook-form';
import { ImageProps as NextImageProps } from 'next/image';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: 'filled' | 'outlined' | 'ghost' | 'bright'
    size?: 'xs' | 'lg'
    link?: string | null;
    linkclassname?: string;
};

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    label?: string;
    labelStyle?: 'outer' | 'inner' | 'floating';
    error?: FieldError | undefined;
    control?: Control<any, any>;
    required?: boolean;
};

export interface InputLabelProps extends React.HTMLProps<HTMLInputElement> {
    label: string | undefined;
    labelStyle?: 'outer' | 'inner' | 'floating';
    focused: boolean;
    hasValue: boolean;
    required: boolean;
    disabled: boolean;
    id: string | undefined;
  };

export interface SectionProps {
    children: React.ReactNode;
    itemtag?: 'section' | 'div' | 'span' | 'main';
    appearance?: 'thinnest' | 'thin' | 'wide' | 'full';
    className?: string;
};

export interface ImageProps extends NextImageProps {
    fill?: boolean;
    aspectRatio?: number;
    sizes?: string;
    imageClassName?: string;
    objectType?: 'object-contain' | 'object-cover';
  }