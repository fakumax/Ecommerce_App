// Visual generado por CSS: cero requests de red = LCP instantáneo.
// Reemplazá este componente por <Image> cuando tengas fotos reales.
export function ProductVisual({ hue, name }: { hue: number; name: string }) {
  return (
    <div
      role="img"
      aria-label={`Imagen de ${name}`}
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 88%), hsl(${hue} 60% 72%))`,
      }}
    >
      <span
        className="select-none text-5xl font-black opacity-30"
        style={{ color: `hsl(${hue} 60% 30%)` }}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    </div>
  );
}
