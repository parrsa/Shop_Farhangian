
export interface DialogTitleProps {
    id?: string;
    children?: React.ReactNode;
    title?: string,
    text?: string,
    onClose?: () => void;
    details:socialMediaInterface
    color?:string
}
export interface socialMediaInterface {
    icon: any,
    caption?: string,
    address?: string,
    link?: string
}
