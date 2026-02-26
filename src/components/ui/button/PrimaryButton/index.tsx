import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
  padding?: string;
  fontSize?: string;
  radius?: string;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const PrimaryButton = ({
  label = "Button",
  bgColor = "#1253ED",
  textColor = "#ffffff",
  padding = "p-5",
  fontSize = "text-[16px]",
  radius = "rounded-[100px]",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        "font-semibold flex items-center justify-center gap-2 transition-all duration-200",
        "outline-2 outline-transparent", // Start with transparent outline
        "hover:outline-(--hover-outline) hover:outline-offset-2", // Use variable and offset
        "active:scale-95",
        padding,
        fontSize,
        radius,
        fullWidth && "w-full",
        className
      )}
      style={
        {
          backgroundColor: bgColor,
          color: textColor,
          "--hover-outline": `color-mix(in srgb, ${bgColor}, transparent 80%)`,
        } as React.CSSProperties
      }
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && leftIcon}
      {children ?? label}
      {!loading && rightIcon}
    </Button>
  );
};

export default PrimaryButton;
