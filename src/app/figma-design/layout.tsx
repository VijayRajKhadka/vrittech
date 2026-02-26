import React from "react";

interface FigmaDesignLayoutProps {
  children: React.ReactNode;
}
const FigmaDesignLayout = ({ children }: FigmaDesignLayoutProps) => {
  return <div className="px-6 py-16 md:px-28 md:py-34.5 ">{children}</div>;
};

export default FigmaDesignLayout;
