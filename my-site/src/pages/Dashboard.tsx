import {
  AlertTriangle,
  Bell,
  ChevronRight,
  ClipboardList,
  Home,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

function Dashboard() {
  return (
    <main className="min-h-screen bg-[#f4f6f3] text-[#17201b]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-black/5 bg-white p-6 lg:block">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17201b] text-white">
              <ShieldCheck size={20} />
            </div>
            RxSentry
          </div>

          <nav className="mt-10 space-y-2">
            <a className="flex items-center gap-3 rounded-xl bg-[#17201b] px-4 py-3 text-sm font-medium text-white">
              <Home size={18} />
              Dashboard
            </a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-black/55 hover:bg-black/5">
              <UserRound size={18} />
              Patients
            </a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-black/55 hover:bg-black/5">
              <ClipboardList size={18} />
              Prescriptions
            </a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-black/55 hover:bg-black/5">
              <Bell size={18} />
              Alerts
            </a>
          </nav>
        </aside>

        <section className="flex-1 p-5 sm:p-8">
          <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-black/40">Clinical workspace</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Good morning, Dr. Patel
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-black/10 bg-white p-3">
                <Bell size={18} />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe8df] text-sm font-semibold">
                DP
              </div>
            </div>
          </header>

          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
            <Search size={20} className="text-black/35" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
              placeholder="Search patients by name, ID, or medication..."
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm text-black/45">Patients today</p>
              <p className="mt-2 text-3xl font-semibold">24</p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm text-black/45">Prescriptions reviewed</p>
              <p className="mt-2 text-3xl font-semibold">18</p>
            </div>

            <div className="rounded-2xl bg-[#fff4dc] p-5">
              <p className="text-sm text-black/45">Safety alerts</p>
              <p className="mt-2 text-3xl font-semibold">3</p>
            </div>
          </div>

          <section className="mt-8 rounded-3xl bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent safety alerts</h2>
                <p className="mt-1 text-sm text-black/45">
                  Review clinically relevant medication risks.
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium">
                View all <ChevronRight size={16} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-4">
                <div className="rounded-xl bg-red-100 p-3 text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Major drug interaction detected</p>
                  <p className="mt-1 text-sm text-black/50">
                    Warfarin + NSAID · Patient: James Wilson
                  </p>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  High
                </span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Allergy risk detected</p>
                  <p className="mt-1 text-sm text-black/50">
                    Amoxicillin · Patient: Sarah Chen
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Moderate
                </span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
