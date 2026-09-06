import { steps } from "../data/dummyData";

export default function CaraPesan() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">Cara Pesan</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">Gampang banget.</h2>
          <p className="text-gray-500">Tiga langkah, selesai.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
              )}
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 text-black rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
