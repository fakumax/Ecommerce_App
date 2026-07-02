// Se ejecuta antes del primer paint para evitar flash de tema incorrecto.
export function ThemeScript() {
  const code = `try{var t=JSON.parse(localStorage.getItem("store-theme")||"null");if(t){var e=document.documentElement;t.primary&&e.style.setProperty("--primary",t.primary);t.accent&&e.style.setProperty("--accent",t.accent);t.font&&e.style.setProperty("--font-active","var(--font-"+t.font+")");t.mode&&(e.dataset.mode=t.mode);}}catch(_){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
