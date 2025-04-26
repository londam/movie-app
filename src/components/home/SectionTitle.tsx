"use client";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2 className={cn("text-2xl font-bold tracking-tight text-white mb-6", className)}>{title}</h2>
  );
}
