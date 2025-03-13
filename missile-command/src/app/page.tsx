'use client'

import Game from '@/components/game/Game'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </main>
  )
}
