"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "row-span-1 rounded-[32px] group/bento transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden",
        "bg-[var(--brand-surface)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        className
      )}
    >
      {header && <div className="mb-4 flex-1">{header}</div>}
      <div className="group-hover/bento:translate-x-2 transition duration-300">
        <div className="mb-4 bg-white/50 w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div className="font-bold text-[var(--brand-text)] text-xl mb-2">
          {title}
        </div>
        <div className="font-medium text-[var(--brand-text-secondary)] text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
