// Τΰιλ: src/components/ui/button.tsx
import { cn } from "../../utils/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    variant = "default",
    size = "md",
    className,
    ...props
}: ButtonProps) => {
    const base =
        "rounded-2xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        default: "bg-[#2ECC71] text-white hover:bg-[#27ae60]",
        outline: "border border-[#3498DB] text-[#3498DB] hover:bg-[#ecf6fd]",
        danger: "bg-[#E74C3C] text-white hover:bg-[#c0392b]",
    };

    const sizes = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
    };

    return (
        <button
            className={cn(base, variants[variant], sizes[size], className)}
            {...props}
        />
    );
};