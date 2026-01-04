"use client";

import { cn } from "../utils/cn";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SoulTabsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tabs: Tab[];
  variant?: "void" | "blood";
}

export const SoulTabs = ({
  tabs,
  variant = "void",
  className = "",
  ...props
}: SoulTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div
        className="flex border-b-2 border-zinc-900"
        role="tablist"
        aria-label="Soul Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-2 font-serif uppercase tracking-widest border-2 border-b-0",
              // Border style
              variant === "void" ? "border-white" : "border-red-900",
              "transition-all duration-300",
              // Active background
              activeTab === tab.id
                ? variant === "void"
                  ? "bg-white text-black"
                  : "bg-red-900 text-white"
                : "bg-black text-zinc-500 hover:text-white",
              "-mr-0.5",
              className
            )}
            {...props}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="text-zinc-500 font-sans leading-relaxed animate-in fade-in duration-500"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
