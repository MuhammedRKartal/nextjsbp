export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: 'filled' | 'outlined' | 'ghost' | 'bright'
    link?: string;
}