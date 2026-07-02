import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-black tracking-tight">
            mi<span className="text-primary">tienda</span>
          </p>
          <p className="mt-2 text-sm text-soft">
            MVP de ecommerce con Next.js, Tailwind CSS y tema personalizable.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Navegación</p>
          <ul className="space-y-2 text-soft">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li><Link href="/productos" className="hover:text-primary">Productos</Link></li>
            <li><Link href="/checkout" className="hover:text-primary">Checkout</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Contacto</p>
          <ul className="space-y-2 text-soft">
            <li>hola@mitienda.com</li>
            <li>Buenos Aires, Argentina</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-soft">
        © {new Date().getFullYear()} mitienda · Proyecto de portfolio
      </div>
    </footer>
  );
}
