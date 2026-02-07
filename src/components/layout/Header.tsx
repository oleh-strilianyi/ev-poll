import { useSettingsStore } from '../../store/settingsStore'

export function Header() {
  const { isDarkMode, toggleDarkMode } = useSettingsStore()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 px-4 py-3 shadow-lg shadow-purple-900/20 rounded-b-xl border-b border-white/5 ring-1 ring-white/10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none rounded-b-xl"></div>
      <div className="relative z-20 flex justify-between items-center">
        <div className="select-none">
          <span className="text-xl font-bold text-white tracking-tight">
            euro
            <span className="text-fuchsia-300 font-medium italic opacity-90 mx-px">(no)</span>
            fun
          </span>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition-colors text-white border border-white/10"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}