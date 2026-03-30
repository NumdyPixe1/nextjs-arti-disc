import React, { Children } from "react";

interface Props {
    disabled?: boolean;
    style?: string;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    onClick?: () => void;
}
export const Button = ({ style, disabled, type, children, onClick }: Props) => {
    return (
        <button
            type={type}
            className={style}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}