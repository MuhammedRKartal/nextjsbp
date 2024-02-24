export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: 'filled' | 'outlined' | 'ghost' | 'bright'
    size?: 'xs' | 'lg'
    link?: string | null;
    linkclassname?: string;
}

export interface SectionProps {
    children: React.ReactNode;
    itemtag?: 'section' | 'div' | 'span' | 'main';
    appearance?: 'thinnest' | 'thin' | 'wide' | 'full';
    className?: string;
  };