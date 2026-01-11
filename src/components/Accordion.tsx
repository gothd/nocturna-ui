"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
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
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const isFirst = index === 0;

        return (
          <div
            key={item.id}
            className={cn(
              "bg-black border-2 transition-shadow duration-300",
              variant === "void" ? "border-white" : "border-red-900",
              !isFirst && "-mt-0.5", // Overlap borders
              // Hover Shadow
              "hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]",
              // Focus Within Shadow (para acessibilidade quando foca no botão)
              "focus-within:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] focus-within:z-10 relative"
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-serif text-lg uppercase tracking-tighter text-white">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  size={20}
                  className={variant === "void" ? "text-white" : "text-red-600"}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-zinc-500 text-sm font-sans leading-relaxed border-t border-zinc-900/50 pt-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
