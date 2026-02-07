import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { DesktopBlocker } from '../components/layout/DesktopBlocker'
import { useSettingsStore } from '../store/settingsStore'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <DesktopBlocker>
      <Header />
      <main className="container mx-auto p-4 flex-1">
        <Outlet />
      </main>
    </DesktopBlocker>
  )
}