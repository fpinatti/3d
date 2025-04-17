import { useEffect, useState } from 'react'
import { preloadModels } from '@/store/useModelLoader'

// Define all models used in the game
const GAME_MODELS = [
  { path: '/assets/meteor.glb' },
  // { path: '/models/city.gltf' },
  // { path: '/models/explosion.gltf' },
  // { path: '/models/silo.gltf', options: { draco: true } },
  // Add all your models here
]

interface ModelManagerProps {
  children: React.ReactNode
  onLoadComplete?: () => void
}

export const ModelManager = ({ children, onLoadComplete }: ModelManagerProps) => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loadAllModels = async () => {
      try {
        // Preload all models
        await preloadModels(
          GAME_MODELS.map((model) => ({
            ...model,
            options: {
              ...model.options,
              onProgress: (event) => {
                // Calculate overall progress
                if (event.lengthComputable) {
                  setProgress(
                    (prev) => prev + (1 / GAME_MODELS.length) * (event.loaded / event.total)
                  )
                }
              },
            },
          }))
        )

        setLoading(false)
        if (onLoadComplete) onLoadComplete()
      } catch (error) {
        console.error('Failed to preload models:', error)
        setLoading(false)
      }
    }

    loadAllModels()
  }, [onLoadComplete])

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000',
        }}
      >
        <div>
          <h2>Loading Models: {Math.round(progress * 100)}%</h2>
          <div
            style={{
              width: '300px',
              height: '20px',
              border: '1px solid white',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: 'green',
                transition: 'width 0.3s ease-in-out',
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
