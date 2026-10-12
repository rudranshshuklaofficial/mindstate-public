import {useReducedMotion} from "motion/react";
// MindState deliberately uses Arc's quieter branch even without reduced motion.
// Subscribing still rerenders when the OS preference changes.
export function useQuietMotion() { useReducedMotion(); return true; }
