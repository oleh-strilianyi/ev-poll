export function Header() {
  return (
    <header className="relative z-10 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 px-4 py-3 shadow-lg shadow-purple-900/20 rounded-b-xl border-b border-white/5 ring-1 ring-white/10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none rounded-b-xl"></div>
      <div className="relative z-20 flex justify-start items-center">
        <div className="select-none">
          <span className="text-xl font-bold text-white tracking-tight">
            euro
            <span className="text-fuchsia-300 font-medium italic opacity-90 mx-px">(no)</span>
            fun
          </span>
        </div>
      </div>
    </header>
  )
}