"use client";
/**
 * Navbar/index.tsx
 * Entry point — imports global nav styles and re-exports NavbarShell.
 * Drop-in replacement for the original Navbar.tsx:
 *   import Navbar from "@/components/Navbar"
 */

import NavbarShell from "./NavbarShell";

export { default as NavbarShell } from "./NavbarShell";
export { default as TopBar } from "./TopBar";
export { default as DesktopNav } from "./DesktopNav";
export { default as DesktopCTAs } from "./DesktopCTAs";
export { default as MobileMenu } from "./MobileMenu";
export * from "./navConstants";
export * from "./navStyles";

// ─── Global nav styles (CSS classes used across sub-components) ───────────────
// These are injected once at the entry point level so all children can use them.
import "./navbar.css";

export default NavbarShell;
