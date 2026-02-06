import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/layout/Header'
import { DesktopBlocker } from '../components/layout/DesktopBlocker'

export const Route = createRootRoute({
  component: () => (
    <DesktopBlocker>
      <Header />
      <main className="container mx-auto p-4 flex-1">
        <Outlet />
      </main>
    </DesktopBlocker>
  ),
})