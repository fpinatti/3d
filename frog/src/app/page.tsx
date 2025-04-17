'use client'

import FrogGame from '@/components/game/FrogGame';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <FrogGame />
    </main>
  );
}