import { ArrowRight, ShieldCheck, Activity, AlertTriangle } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen bg-[#f4f6f3] p-3 text-[#17201b] sm:p-4 md:p-6">
      <div className="relative min-h-[calc(100vh-24px)] overflow-hidden rounded-[28px] bg-[#17201b] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)]">
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#17201b] via-[#20342a] to-[#0c1210]" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck size={21} />
            </div>
            RxSentry
          </div>

          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#evidence" className="transition hover:text-white">
              Clinical evidence
            </a>
            <a href="#systems" className="transition hover:text-white">
              For health systems
            </a>
            <a href="#docs" className="transition hover:text-white">
              Docs
            </a>
          </div>

          <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#17201b] transition hover:bg-emerald-100">
            Request a demo
          </button>
        </nav>

        <section className="relative z-10 flex min-h-[calc(100vh-120px)] items-center px-6 pb-16 pt-12 md:px-10 lg:pb-24">
          <div className="max-w-5xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <Activity size={16} />
              Intelligent medication safety
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
              We catch dangerous prescriptions
              <span className="block text-white/45">
                before they reach the patient.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              RxSentry analyzes medications, allergies, diagnoses and dosage
              in real time to surface clinically meaningful safety risks.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-medium text-[#17201b] transition hover:bg-emerald-100">
                Request a demo
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-white backdrop-blur transition hover:bg-white/10">
                See how it works
              </button>
            </div>

            <div className="mt-16 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <AlertTriangle size={20} className="mb-4 text-amber-300" />
                <p className="text-sm font-medium text-white">Drug interactions</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Detect clinically significant combinations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <ShieldCheck size={20} className="mb-4 text-emerald-300" />
                <p className="text-sm font-medium text-white">Allergy safety</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Catch allergy risks before prescribing.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <Activity size={20} className="mb-4 text-cyan-300" />
                <p className="text-sm font-medium text-white">Explainable alerts</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Every warning comes with clinical reasoning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="absolute bottom-5 right-6 z-10 text-xs text-white/35 md:right-10">
          Decision support · Not a substitute for clinical judgment
        </div>
      </div>
    </main>
  )
}

export default App
