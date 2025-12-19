<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="model-3d-viewer"
        @click.self="close"
      >
        <div class="model-3d-viewer__container">
          <button
            class="model-3d-viewer__close"
            @click="close"
            aria-label="Закрыть"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="model-3d-viewer__canvas-wrapper">
            <canvas ref="canvasRef" class="model-3d-viewer__canvas"></canvas>
            
            <div v-if="loading" class="model-3d-viewer__loading">
              <div class="model-3d-viewer__spinner"></div>
              <p class="model-3d-viewer__loading-text">Загрузка 3D модели...</p>
            </div>

            <div v-if="error" class="model-3d-viewer__error">
              <p>Ошибка загрузки модели</p>
              <p class="model-3d-viewer__error-details">{{ errorMessage }}</p>
              <button @click="initModel" class="model-3d-viewer__retry">Попробовать снова</button>
            </div>
          </div>

          <div class="model-3d-viewer__controls">
            <p class="model-3d-viewer__hint">Перетащите для поворота • Прокрутите для масштабирования</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  modelPath: {
    type: String,
    default: '/models/4.gltf'
  }
})

const emit = defineEmits(['close'])

const canvasRef = ref(null)
const loading = ref(false)
const error = ref(false)
const errorMessage = ref('')

let THREE = null
let GLTFLoader = null
let OrbitControls = null
let scene = null
let camera = null
let renderer = null
let controls = null
let model = null
let animationId = null

const close = () => {
  emit('close')
}

const initModel = async () => {
  if (typeof window === 'undefined') return
  
  if (!canvasRef.value) {
    console.error('Canvas ref не найден')
    error.value = true
    errorMessage.value = 'Canvas элемент не найден'
    return
  }

  loading.value = true
  error.value = false
  errorMessage.value = ''

  try {
    // Динамический импорт Three.js только на клиенте
    if (!THREE) {
      THREE = (await import('three')).default || await import('three')
      const loaders = await import('three/examples/jsm/loaders/GLTFLoader.js')
      GLTFLoader = loaders.GLTFLoader
      const controlsModule = await import('three/examples/jsm/controls/OrbitControls.js')
      OrbitControls = controlsModule.OrbitControls
    }

    // Очистка предыдущей сцены
    if (model && scene) {
      scene.remove(model)
      model.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose()
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose())
            } else {
              child.material.dispose()
            }
          }
        }
      })
    }

    if (renderer) {
      renderer.dispose()
    }
    if (controls) {
      controls.dispose()
    }
    if (animationId) {
      cancelAnimationFrame(animationId)
    }

    // Создание сцены
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1b26)

    // Камера
    const width = canvasRef.value.clientWidth || 800
    const height = canvasRef.value.clientHeight || 600
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)

    // Рендерер с улучшенными настройками
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: false
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = false
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Улучшенное освещение
    // Мягкий ambient свет для заполнения теней
    const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.4)
    scene.add(ambientLight)

    // Hemisphere light для более естественного освещения (небо/земля)
    const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x444444, 0.6)
    scene.add(hemisphereLight)

    // Основной солнечный свет
    const sunLight = new THREE.DirectionalLight(0xfff4e6, 1.2)
    sunLight.position.set(50, 80, 30)
    sunLight.castShadow = false
    scene.add(sunLight)

    // Дополнительный fill-свет для мягких теней
    const fillLight = new THREE.DirectionalLight(0xc4e0ff, 0.4)
    fillLight.position.set(-30, 20, -20)
    scene.add(fillLight)

    // Загрузка модели
    const loader = new GLTFLoader()
    loader.setPath('/models/')
    
    console.log('Начинаем загрузку GLTF модели...')
    const gltf = await loader.loadAsync('4.gltf')
    model = gltf.scene
    console.log('GLTF модель загружена:', model)

    // Вычисление границ модели для центрирования
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    
    console.log('Размер модели:', size)
    console.log('Центр модели:', center)
    console.log('Максимальный размер:', maxDim)
    
    // Проверяем, что модель не пустая
    if (maxDim === 0 || !isFinite(maxDim)) {
      console.error('Модель пустая или имеет некорректные размеры!')
      throw new Error('Модель пустая или поврежденная')
    }
    
    // Создаём группу-контейнер для правильного центрирования
    const modelContainer = new THREE.Group()
    modelContainer.add(model)
    
    // Сначала масштабируем модель
    const targetSize = 10 // Целевой размер модели
    const scale = targetSize / maxDim
    model.scale.setScalar(scale)
    
    // Теперь центрируем модель с учётом масштаба
    // Позиция должна быть отрицательной от центра, умноженной на масштаб
    model.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    )
    
    console.log('Применённый масштаб:', scale)
    console.log('Позиция модели после центрирования:', model.position)
    
    // Убедимся, что материалы видимы
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide
        if (child.material.transparent === undefined) {
          child.material.transparent = false
        }
        child.material.needsUpdate = true
      }
    })
    
    const fov = camera.fov * (Math.PI / 180)
    const cameraZ = Math.abs(targetSize / 2 / Math.tan(fov / 2))
    const distance = cameraZ * 0.6

    camera.position.set(distance * 0.7, distance * 0.5, distance)
    camera.lookAt(0, 0, 0)
    
    console.log('Позиция камеры:', camera.position)
    console.log('Дистанция:', distance)

    scene.add(modelContainer)

    // Контролы
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = distance * 0.1
    controls.maxDistance = distance * 10
    controls.target.set(0, 0, 0)
    controls.update()

    loading.value = false
    console.log('3D модель успешно инициализирована!')
    animate()


    // Обработчик изменения размера
    const handleResize = () => {
      if (!canvasRef.value || !camera || !renderer) return
      const w = canvasRef.value.clientWidth
      const h = canvasRef.value.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)
    
    // Сохраняем обработчик для очистки
    if (typeof window !== 'undefined') {
      window._model3dResizeHandler = handleResize
    }
  } catch (err) {
    console.error('Ошибка загрузки 3D модели:', err)
    loading.value = false
    error.value = true
    errorMessage.value = err.message || 'Неизвестная ошибка загрузки модели'
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (controls) {
    controls.update()
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

onMounted(async () => {
  if (props.isOpen && typeof window !== 'undefined') {
    await nextTick()
    setTimeout(() => {
      initModel()
    }, 100)
  }
})

watch(() => props.isOpen, async (newVal) => {
  if (newVal && typeof window !== 'undefined') {
    await nextTick()
    setTimeout(() => {
      initModel()
    }, 100)
  } else {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    if (typeof window !== 'undefined' && window._model3dResizeHandler) {
      window.removeEventListener('resize', window._model3dResizeHandler)
      delete window._model3dResizeHandler
    }
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined' && window._model3dResizeHandler) {
    window.removeEventListener('resize', window._model3dResizeHandler)
    delete window._model3dResizeHandler
  }

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (controls) {
    controls.dispose()
  }

  if (renderer) {
    renderer.dispose()
  }

  if (model && scene) {
    model.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      }
    })
  }
})
</script>

<style scoped>
.model-3d-viewer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.model-3d-viewer__container {
  position: relative;
  width: 100%;
  max-width: 90vw;
  max-height: 90vh;
  background: #1a1b26;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.model-3d-viewer__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.model-3d-viewer__close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.model-3d-viewer__canvas-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 400px;
}

.model-3d-viewer__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.model-3d-viewer__loading,
.model-3d-viewer__error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #fff;
  z-index: 5;
}

.model-3d-viewer__spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #f8b543;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.model-3d-viewer__loading-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.model-3d-viewer__error {
  color: #ff6b6b;
}

.model-3d-viewer__error-details {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  opacity: 0.8;
  word-break: break-word;
  max-width: 500px;
  text-align: center;
}

.model-3d-viewer__retry {
  padding: 0.5rem 1rem;
  background: #f8b543;
  color: #1a1b26;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.3s ease;
  margin-top: 1rem;
}

.model-3d-viewer__retry:hover {
  opacity: 0.9;
}

.model-3d-viewer__controls {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.model-3d-viewer__hint {
  text-align: center;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* Transition animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .model-3d-viewer__container,
.modal-fade-leave-active .model-3d-viewer__container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .model-3d-viewer__container,
.modal-fade-leave-to .model-3d-viewer__container {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .model-3d-viewer__container {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }

  .model-3d-viewer__canvas-wrapper {
    min-height: 300px;
  }

  .model-3d-viewer__close {
    top: 0.5rem;
    right: 0.5rem;
    width: 40px;
    height: 40px;
  }
}
</style>





