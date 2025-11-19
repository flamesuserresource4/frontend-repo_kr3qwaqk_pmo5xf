import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Fram figures
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Live passenger numbers from the Norwegian Railway Directorate.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
    </section>
  );
}
