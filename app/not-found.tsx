import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-32 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="text-soft">Lo que buscás no existe o fue movido.</p>
      <Link href="/" className="mt-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90">
        Volver al inicio
      </Link>
    </div>
  );
}
