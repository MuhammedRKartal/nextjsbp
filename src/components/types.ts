export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: 'filled' | 'outlined' | 'ghost' | 'bright'
    size?: 'xs' | 'lg'
    link?: string;
    linkclassname?: string;
}