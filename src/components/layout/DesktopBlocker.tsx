import type { ReactNode } from 'react'

interface DesktopBlockerProps {
  children: ReactNode
}

export const DesktopBlocker = ({ children }: DesktopBlockerProps) => {
  return (
    <>
      <div className="md:hidden min-h-dvh flex flex-col">
        {children}
      </div>

      <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-white">
        <h1>Mobile Only</h1>
      </div>
    </>
  )
}