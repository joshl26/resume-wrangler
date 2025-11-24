// Definition of the Page component for the resume section
// app/ui/resume/page.tsx

import { ReactNode } from "react";
import styles from "./Page.module.css";

interface PageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page component wrapper for resume templates
 * Provides consistent page structure and styling for all resume layouts
 */
export default function Page({ children, className }: PageProps) {
  return <div className={`${styles.page} ${className || ""}`}>{children}</div>;
}
