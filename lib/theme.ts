export interface ThemeState {
  primary: string;
  accent: string;
  mode: "light" | "dark";
  font: FontId;
}

export type FontId = "inter" | "poppins" | "grotesk" | "playfair";

export const fonts: { id: FontId; label: string }[] = [
  { id: "inter", label: "Inter" },
  { id: "poppins", label: "Poppins" },
  { id: "grotesk", label: "Space Grotesk" },
  { id: "playfair", label: "Playfair Display" },
];

export const presets: { name: string; primary: string; accent: string }[] = [
  { name: "Océano", primary: "#0d9488", accent: "#f59e0b" },
  { name: "Violeta", primary: "#7c3aed", accent: "#ec4899" },
  { name: "Coral", primary: "#e11d48", accent: "#f97316" },
  { name: "Bosque", primary: "#15803d", accent: "#eab308" },
  { name: "Azul", primary: "#2563eb", accent: "#06b6d4" },
  { name: "Carbón", primary: "#18181b", accent: "#d97706" },
];

export const defaultTheme: ThemeState = {
  primary: "#0d9488",
  accent: "#f59e0b",
  mode: "light",
  font: "inter",
};

export const THEME_KEY = "store-theme";

export function applyTheme(t: ThemeState) {
  const el = document.documentElement;
  el.style.setProperty("--primary", t.primary);
  el.style.setProperty("--accent", t.accent);
  el.style.setProperty("--font-active", `var(--font-${t.font})`);
  el.dataset.mode = t.mode;
}
