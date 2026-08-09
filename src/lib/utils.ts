import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A tiny SVG data-URI used as next/image's blur placeholder, tinted to
 * the project's brand color. Keeps large images from popping in blank:
 * the frame paints instantly in the project's tone, then sharpens.
 */
export function colorBlurDataURL(hex = "#12372A") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10"><rect width="16" height="10" fill="${hex}"/></svg>`
  // btoa is global in both the browser and Node 18+, so this helper is
  // safe to call from server and client components alike.
  return `data:image/svg+xml;base64,${btoa(svg)}`
}
