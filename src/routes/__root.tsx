import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { DesktopBlocker } from '../components/layout/DesktopBlocker'
import { useSettingsStore } from '../store/settingsStore'

export const Route = createRootRoute({
  component: RootComponent,
})


function ThemeEffect() {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode)

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDarkMode])

  return null
}

function RootComponent() {
  return (
    <DesktopBlocker>
      <ThemeEffect />
      <Header />
      <main className="container mx-auto p-4 flex-1">
        <Outlet />
      </main>
    </DesktopBlocker>
  )
}