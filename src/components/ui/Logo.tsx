import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  imageClassName, 
  textClassName, 
  showText = false 
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/assets/logo_yingahub-removebg-preview.png" 
        alt="Yinga Hub" 
        className={cn("h-10 w-auto object-contain", imageClassName)}
      />
      {showText && (
        <span className={cn("text-xl font-bold text-foreground ml-2", textClassName)}>
          Yinga Hub
        </span>
      )}
    </div>
  );
};

export default Logo;
