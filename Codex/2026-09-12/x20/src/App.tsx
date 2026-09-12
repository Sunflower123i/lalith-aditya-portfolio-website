import { AtSign, Circle, Camera, Send } from 'lucide-react'
import { FormEvent, type ComponentType, useEffect, useState } from 'react'
import Workspace from './Workspace'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4'

const TAGS = [
  'Hospital / Health System',
  'Pharmacy Network',
  'EHR Integration',
  'Telehealth Platform',
  'Health Insurer',
  'Clinical Research',
  'Government / Public Health',
  'Investor Inquiry',
  'Other',
]

type SocialBtnProps = {
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  className: string
}

function SocialBtn({ label, icon: Icon, className }: SocialBtnProps) {
  return (
    <a
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-opacity hover:opacity-80 ${className}`}
      href="mailto:hello@rxsentry.co"
    >
      <Icon size={13} strokeWidth={2.25} />
    </a>
  )
}

export default function App() {
  const [workspace, setWorkspace] = useState(() => window.location.hash === '#workspace')
  const [selected, setSelected] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onHashChange = () => setWorkspace(window.location.hash === '#workspace')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const toggleTag = (tag: string) => {
    setSelected((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSending(false)
    setSent(true)
  }

  if (workspace) return <Workspace />

  return (
    <main className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      <section className="relative min-h-[calc(100vh-24px)] overflow-hidden rounded-2xl bg-slate-900 sm:min-h-[calc(100vh-32px)] sm:rounded-3xl md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          src={VIDEO_URL}
        />
        <div className="absolute inset-0 bg-slate-950/35" />

        <div className="relative z-10 flex min-h-[calc(100vh-24px)] flex-col gap-6 p-4 sm:min-h-[calc(100vh-32px)] sm:p-6 md:min-h-[calc(100vh-48px)] md:p-8 lg:h-full">
          <nav className="flex w-full items-center gap-3 rounded-2xl bg-white/60 py-2 pl-3 pr-2 shadow-sm backdrop-blur-md sm:w-auto sm:gap-6 sm:pl-4">
            <a aria-label="RxSentry home" className="flex items-center" href="#top">
              <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 256 256">
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" fill="currentColor" />
                <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="currentColor" />
              </svg>
            </a>
            <div className="hidden items-center gap-6 sm:flex">
              {['How it works', 'Clinical evidence', 'For health systems', 'Docs'].map((link) => (
                <a
                  className="whitespace-nowrap text-sm font-medium text-gray-800 transition-opacity hover:opacity-60"
                  href="#contact"
                  key={link}
                >
                  {link}
                </a>
              ))}
            </div>
            <a
              className="ml-auto rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 sm:px-5"
              href="#workspace"
            >
              Request a demo
            </a>
          </nav>

          <div className="min-h-[2rem] flex-1" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="shrink-0 lg:max-w-lg xl:max-w-2xl">
              <p className="text-3xl font-medium leading-tight text-white drop-shadow-lg sm:text-4xl xl:text-5xl">
                We catch dangerous prescriptions
                <br />
                before they reach the{' '}
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  patient
                </span>
              </p>
            </div>

            <div className="w-full shrink-0 lg:w-[min(480px,45%)]" id="contact">
              <div className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-2xl sm:rounded-3xl sm:p-6 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
                <h1 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
                  Let&apos;s talk safety 🛡️
                </h1>

                <div className="flex flex-row items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Reach the team</p>
                    <a
                      className="block truncate text-sm font-semibold text-blue-600 hover:underline"
                      href="mailto:hello@rxsentry.co"
                    >
                      hello@rxsentry.co
                    </a>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <SocialBtn className="bg-gray-100 text-gray-800" icon={Send} label="Twitter" />
                    <SocialBtn className="bg-pink-100 text-pink-500" icon={Circle} label="Community" />
                    <SocialBtn className="bg-orange-100 text-orange-400" icon={Camera} label="Instagram" />
                    <SocialBtn className="bg-blue-100 text-blue-600" icon={AtSign} label="LinkedIn" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm font-medium text-gray-400">OR</span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>

                {sent ? (
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl text-green-700">
                      ✓
                    </div>
                    <p className="text-base font-semibold text-gray-900">You&apos;re all set!</p>
                    <p className="max-w-xs text-sm text-gray-500">
                      A member of our clinical team will reach out within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="text-sm font-medium text-black" htmlFor="full-name">
                      Tell us about your organization
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                        id="full-name"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Full name"
                        required
                        value={name}
                      />
                      <input
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                        id="work-email"
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Work email"
                        required
                        type="email"
                        value={email}
                      />
                    </div>
                    <textarea
                      className="resize-none rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="What's your current prescribing/medication-review workflow..."
                      rows={4}
                      value={message}
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-black">I&apos;m interested in...</p>
                      <div className="flex flex-wrap gap-1.5">
                        {TAGS.map((tag) => {
                          const isSelected = selected.includes(tag)
                          return (
                            <button
                              aria-pressed={isSelected}
                              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                                isSelected
                                  ? 'border-black bg-gray-100 text-black'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                              }`}
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              type="button"
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <button
                      className="w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
                      disabled={sending}
                      type="submit"
                    >
                      {sending ? 'Sending...' : 'Request a demo'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <footer className="text-xs text-white/70">
            RxSentry is a clinical decision-support tool for licensed healthcare professionals. Not a substitute for clinical judgment.
          </footer>
        </div>
      </section>
    </main>
  )
}
