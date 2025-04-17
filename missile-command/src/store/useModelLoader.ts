import { useState, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Group } from 'three'

// Global model cache to prevent duplicate loading
const modelCache: Record<string, any> = {}

// Model types supported by the loader
type ModelType = 'gltf' | 'obj' | 'fbx'

interface ModelOptions {
  draco?: boolean // Enable DRACO compression for GLTF models
  onProgress?: (event: ProgressEvent) => void
  scale?: number
}

/**
 * Custom hook for loading and caching 3D models
 * @param path Path to the model file
 * @param type Type of the model (gltf, obj, fbx)
 * @param options Additional loading options
 * @returns An object containing the loaded model and loading state
 */
export function useModelLoader(path: string, type: ModelType = 'gltf', options: ModelOptions = {}) {
  const [model, setModel] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Check if model is already in cache
    if (modelCache[path]) {
      // Clone the cached model to avoid reference issues
      const clonedModel = modelCache[path].clone()

      // Apply scale if provided
      if (options.scale) {
        clonedModel.scale.set(options.scale, options.scale, options.scale)
      }

      setModel(clonedModel)
      setLoading(false)
      return
    }

    const loadModel = async () => {
      try {
        setLoading(true)
        let loader

        switch (type) {
          case 'gltf':
            loader = new GLTFLoader()

            // Setup DRACO decoder if requested
            if (options.draco) {
              const dracoLoader = new DRACOLoader()
              dracoLoader.setDecoderPath('/draco-gltf/')
              loader.setDRACOLoader(dracoLoader)
            }
            break
          case 'obj':
            loader = new OBJLoader()
            break
          case 'fbx':
            loader = new FBXLoader()
            break
          default:
            throw new Error(`Unsupported model type: ${type}`)
        }

        // Add progress handler if provided
        if (options.onProgress) {
          loader.manager.onProgress = options.onProgress
        }

        // Load the model
        const result = await new Promise((resolve, reject) => {
          loader.load(path, resolve, options.onProgress, reject)
        })

        // Process the loaded model based on its type
        let processedModel
        if (type === 'gltf') {
          processedModel = (result as any).scene.clone()
        } else {
          processedModel = result as Group
        }

        // Apply scale if provided
        if (options.scale) {
          processedModel.scale.set(options.scale, options.scale, options.scale)
        }

        // Cache the model
        modelCache[path] = processedModel.clone()

        setModel(processedModel)
        setLoading(false)
      } catch (err) {
        console.error('Error loading model:', err)
        setError(err instanceof Error ? err : new Error('Unknown error loading model'))
        setLoading(false)
      }
    }

    loadModel()
  }, [path, type, options.draco, options.scale])

  return { model, loading, error }
}

/**
 * Preload multiple models at once
 * @param models Array of model configurations to preload
 * @returns Promise that resolves when all models are loaded
 */
export function preloadModels(
  models: Array<{ path: string; type?: ModelType; options?: ModelOptions }>
) {
  return Promise.all(
    models.map(({ path, type = 'gltf', options = {} }) => {
      return new Promise((resolve, reject) => {
        // Skip if already cached
        if (modelCache[path]) {
          resolve(modelCache[path])
          return
        }

        let loader
        switch (type) {
          case 'gltf':
            loader = new GLTFLoader()
            if (options.draco) {
              const dracoLoader = new DRACOLoader()
              dracoLoader.setDecoderPath('/draco-gltf/')
              loader.setDRACOLoader(dracoLoader)
            }
            break
          case 'obj':
            loader = new OBJLoader()
            break
          case 'fbx':
            loader = new FBXLoader()
            break
          default:
            reject(new Error(`Unsupported model type: ${type}`))
            return
        }

        loader.load(
          path,
          (result) => {
            let model
            if (type === 'gltf') {
              model = (result as any).scene
            } else {
              model = result as Group
            }

            modelCache[path] = model
            resolve(model)
          },
          options.onProgress,
          reject
        )
      })
    })
  )
}

// Helper to clear the model cache if needed
export function clearModelCache(specificPaths?: string[]) {
  if (specificPaths) {
    specificPaths.forEach((path) => {
      delete modelCache[path]
    })
  } else {
    Object.keys(modelCache).forEach((key) => {
      delete modelCache[key]
    })
  }
}
