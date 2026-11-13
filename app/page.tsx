import Link from "next/link";
import Image from "next/image";

const MODULES = [
  ["📖", "Reading", "Academic matnlar va turli savol turlari"],
  ["🎧", "Listening", "Haqiqiy audio bilan Form/Note Completion"],
  ["✍️", "Writing", "AI orqali 4 ta mezon boyicha baholash"],
  ["🎤", "Speaking", "Ovoz yozib, AI fikr-mulohaza oling"],
  ["🅰️", "General English", "A1 dan C2 gacha grammatika"],
  ["🎓", "Multilevel CEFR", "Avtomatik CEFR daraja taxmini"],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg text-[#eef1fb]">
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[11px] overflow-hidden flex items-center justify-center bg-card2 p-1">
            <Image src="/logo.png" alt="IELTS Assistant" width={36} height={36} className="object-contain w-full h-full" />
          </div>
          <div>
            <div className="font-sora font-bold text-sm leading-tight">IELTS Assistant</div>
            <div className="text-[11px] text-muted">from Akramjon</div>
          </div>
        </div>
        <Link href="/login" className="text-sm font-semibold text-muted hover:text-white">
          Kirish
        </Link>
      </header>

      <section className="max-w-3xl mx-auto text-center px-6 pt-16 pb-20">
        <h1 className="font-sora text-4xl font-bold leading-tight mb-5">
          IELTS'ga <span className="text-blue">AI yordamida</span> tayyorlaning
        </h1>
        <p className="text-muted text-[15px] mb-8 max-w-xl mx-auto">
          Learn Smarter. Practice Better. Achieve More. — Reading, Listening, Writing, Speaking va CEFR
          darajasini baholovchi, suniy intellekt bilan ishlaydigan ozbek tilidagi IELTS platformasi.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/signup" className="bg-grad text-white text-sm font-semibold px-6 py-3 rounded-lg">
            Bepul boshlash
          </Link>
          <Link href="/login" className="bg-card2 border border-border text-sm font-semibold px-6 py-3 rounded-lg">
            Hisobim bor
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1">
          {MODULES.map(([icon, title, desc]) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-semibold text-[14.5px] mb-1">{title}</div>
              <div className="text-[12.5px] text-muted">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted">IELTS Assistant from Akramjon — Learn Smarter. Practice Better. Achieve More.</p>
      </footer>
    </main>
  );
}
