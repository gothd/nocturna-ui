"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

interface GrimoireAccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface GrimoireAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GrimoireAccordionItem[];
  variant?: "void" | "blood";
}

export const GrimoireAccordion = ({
  items,
  variant = "void",
  className,
  ...props
}: GrimoireAccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const contentId = `accordion-content-${item.id}`;
        const titleId = `accordion-title-${item.id}`;
        const isOpen = openId === item.id;
        const isFirst = index === 0;
        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState(0);

        // mede a altura real do conteúdo sempre que abre
        useLayoutEffect(() => {
          if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
          }
        }, [isOpen]);

        return (
          <div
            key={item.id}
            className={cn(
              "bg-black border-2",
              // Border color
              variant === "void" ? "border-white" : "border-red-900",
              // Space y
              !isFirst && "-mt-0.5",
              "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
              className
            )}
            {...props}
          >
            {/* Header fixo */}
            <button
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span
                id={titleId}
                className="font-serif text-lg uppercase tracking-tighter text-white"
              >
                {item.title}
              </span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                className={cn(
                  // Icon color
                  variant === "void" ? "text-white" : "text-red-600",
                  "transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {/* Painel animado com altura dinâmica */}
            <motion.div
              role="region"
              id={contentId}
              aria-labelledby={titleId}
              className="overflow-hidden w-full"
              animate={{ maxHeight: isOpen ? height : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                ref={contentRef}
                className="px-4 pb-4 text-zinc-500 text-sm font-sans leading-relaxed"
              >
                {item.content}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
