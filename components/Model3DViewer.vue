<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="model-3d-viewer"
        @click.self="close"
      >
        <div class="model-3d-viewer__container">
          <!-- Back/Close Button -->
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

          <!-- Top Title -->
          <div class="model-3d-viewer__header">
            <h2 class="model-3d-viewer__title">ИНТЕРАКТИВНЫЙ ГЕНПЛАН</h2>
          </div>

          <div class="model-3d-viewer__canvas-wrapper" ref="wrapperRef">
            <canvas ref="canvasRef" class="model-3d-viewer__canvas"></canvas>
            
            <!-- Hotspot Popup (Figma Design) -->
            <Transition name="popup-scale">
              <div 
                v-if="selectedHotspot" 
                class="hotspot-card"
                :style="popupStyle"
                @click.stop
              >
                <div class="hotspot-card__image-wrap">
                  <img :src="selectedHotspot.image" :alt="selectedHotspot.title" class="hotspot-card__image" />
                </div>
                <div class="hotspot-card__info">
                  <h3 class="hotspot-card__title">{{ selectedHotspot.title }}</h3>
                  <p class="hotspot-card__text">{{ selectedHotspot.description }}</p>
                  <button 
                    class="hotspot-card__btn"
                    @click="handleHotspotClick(selectedHotspot)"
                  >
                    {{ selectedHotspot.buttonText }}
                  </button>
                </div>
              </div>
            </Transition>
            
            <div v-if="loading" class="model-3d-viewer__loading">
              <div class="model-3d-viewer__spinner"></div>
              <p class="model-3d-viewer__loading-text">Загрузка 3D модели...</p>
            </div>

            <div v-if="error" class="model-3d-viewer__error">
              <p>Ошибка загрузки модели</p>
              <p class="model-3d-viewer__error-details">{{ errorMessage }}</p>
              <button @click="initModel" class="model-3d-viewer__retry">Попробовать снова</button>
            </div>

            <!-- Debug Coordinates (Hidden by default) -->
            <div v-if="debugMode" class="model-3d-viewer__debug">
              <p>Pos: {{ clickPos.x.toFixed(2) }}, {{ clickPos.y.toFixed(2) }}, {{ clickPos.z.toFixed(2) }}</p>
              <button @click="debugMode = false" class="text-xs opacity-50 underline mt-1">Hide</button>
            </div>
          </div>

          <div class="model-3d-viewer__footer">
            <div class="model-3d-viewer__controls-hint">
              <span class="hint-item">🖱️ Левая кнопка — вращение</span>
              <span class="hint-line"></span>
              <span class="hint-item">⚙️ Колесо — масштаб</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  modelPath: {
    type: String,
    default: '/models/Plan_1.gltf'
  }
})

const emit = defineEmits(['close'])

const canvasRef = ref(null)
const wrapperRef = ref(null)
const loading = ref(false)
const error = ref(false)
const errorMessage = ref('')
const selectedHotspot = ref(null)
const debugMode = ref(false)
const clickPos = ref({ x: 0, y: 0, z: 0 })

let THREE = null
let GLTFLoader = null
let OrbitControls = null
let scene = null
let camera = null
let renderer = null
let controls = null
let model = null
let animationId = null
let raycaster = null
let mouse = null
let hotspotObjects = []
let labelRenderer = null
let css2dObjects = []

// Hotspots Data - Positions adjusted to match Figma layout
const hotspots = [
  {
    id: 'ecogorod-3',
    title: 'ЖК ЭКОГОРОД 3',
    description: 'Жилой комплекс «Экогород 3» создан в гармонии и уважении к природе и здоровью человека. Проектом предусмотрено размещение шести 8-9 этажных жилых домов.',
    image: '/images/ecocity3/rectangle_1098.png',
    buttonText: 'ПОСМОТРЕТЬ ПРОЕКТ',
    link: '/images/ecocity3/Group.svg',
    isInternal: true,
    position: { x: 1.7, y: 0.2, z: -0.6 },  // Center-right of model
    markerIcon: '/images/ecocity3/Group.svg'  // Green Ecogorod logo
  },
  {
    id: 'ecogorod-2',
    title: 'ЖК ЭКОГОРОД 2',
    description: 'Продолжение успешного проекта «Экогород» с улучшенными планировками и благоустроенной территорией.',
    image: '/images/figma_assets/312883e98b52c1283bea27e972c12073a2f735e4.png',
    buttonText: 'ПОСМОТРЕТЬ ПРОЕКТ',
    link: '/images/contacts/Group_146.png',
    isInternal: true,
    position: { x: 2.4, y: 0.2, z: -1.1 },  // Left of Ecogorod 3
    markerIcon: '/images/contacts/marker-2.png'  // Blue buildings logo
  },
  {
    id: 'ecogorod-1',
    title: 'ЖК ЭКОГОРОД',
    description: 'Первый этап масштабного проекта, где уют загородной жизни встречается с городским комфортом.',
    image: '/images/figma_assets/4e4112f445b0c7267c10356a73c3802dd6bed991.png',
    buttonText: 'ПОСМОТРЕТЬ ПРОЕКТ',
    link: '/images/contacts/Group_146.png',
    isInternal: true,
    position: { x: 2.5, y: 0.8, z: 0.5 },  // Right and below Ecogorod 3
    markerIcon: '/images/contacts/marker-1.png'
  },
  {
    id: 'newhouse',
    title: 'ЖК НОВЫЙ ДОМ',
    description: 'Современный жилой комплекс с уникальной архитектурой и продуманными общественными пространствами.',
    image: '/images/figma_assets/3a1eb57e0ac6865bc94f8b62f37cbda2d8d29a35.png',
    buttonText: 'ПОСМОТРЕТЬ ПРОЕКТ',
    link: '/images/contacts/ND.png',
    isInternal: true,
    position: { x: -2.5, y: 0.8, z: 1.5 },  // Far left
    markerIcon: '/images/contacts/marker-2.png'
  },
  {
    id: 'tasty',
    title: 'ВКУСНО И ТОЧКА',
    description: '«Вкусно — и точка» – ведущая сеть общественного питания, насчитывающая более 950 предприятий в 65 субъектах РФ.',
    image: '/images/figma_assets/6098935f3e0b4a4084bf4e0ff52bf6bbc43f99e8.png',
    buttonText: 'БОЛЬШЕ ИНФОРМАЦИИ',
    link: 'https://vkusnoitochka.ru',
    isInternal: false,
    position: { x: -1.0, y: 0.5, z: -3.5 },  // Top left of model
    markerIcon: '/images/contacts/marker-5.png'  // Orange M logo
  },
  {
    id: 'globus',
    title: 'ТЦ ГЛОБУС',
    description: '«Глобус» — международная сеть гипермаркетов, магазины которой представлены в Германии, Чехии и России.',
    image: '/images/figma_assets/45babc800c37169b87c9ca232dd0e61336524f21.png',
    buttonText: 'БОЛЬШЕ ИНФОРМАЦИИ',
    link: 'https://www.globus.ru',
    isInternal: false,
    position: { x: -3.5, y: 0.5, z: 3.0 },  // Far left bottom
    markerIcon: '/images/contacts/image_80.png'  // Green Globus logo
  },
  {
    id: 'school',
    title: 'НОВАЯ ШКОЛА',
    description: 'Современная школа в Красном Бору. Совсем скоро будет построена рядом с нашими объектами.',
    image: '/images/figma_assets/baa1ff7eb4478501e5c6ecba181729748dccbc9c.png',
    buttonText: 'БОЛЬШЕ ИНФОРМАЦИИ',
    link: '#',
    isInternal: false,
    position: { x: 2.0, y: 0.5, z: 3.0 },  // Right side, bottom
    markerIcon: '/images/contacts/marker-3.png'  // Plus/cross icon
  },
  {
    id: 'clinic',
    title: 'ПОЛИКЛИНИКА',
    description: 'Современная поликлиника появится рядом с нашими объектами уже в этом году.',
    image: '/images/figma_assets/e12370a44e92aa917f3b96bf8a02c5fa69e64c1d.png',
    buttonText: 'БОЛЬШЕ ИНФОРМАЦИИ',
    link: '#',
    isInternal: false,
    position: { x: 3.5, y: 0.5, z: 2.0 },  // Far right
    markerIcon: '/images/contacts/marker-4.png'  // Plus/cross icon
  }
]

const popupPos = ref({ x: 0, y: 0 })

const popupStyle = computed(() => {
  return {
    left: `${popupPos.value.x}px`,
    top: `${popupPos.value.y}px`
  }
})

const close = () => {
  emit('close')
}

const handleHotspotClick = (hotspot) => {
  if (hotspot.isInternal) {
    router.push(hotspot.link)
    close()
  } else if (hotspot.link !== '#') {
    window.open(hotspot.link, '_blank')
  }
}

const initModel = async () => {
  if (typeof window === 'undefined') return
  
  if (!canvasRef.value) {
    error.value = true
    errorMessage.value = 'Canvas элемент не найден'
    return
  }

  loading.value = true
  error.value = false
  errorMessage.value = ''

  try {
    if (!THREE) {
      THREE = (await import('three')).default || await import('three')
      const loaders = await import('three/examples/jsm/loaders/GLTFLoader.js')
      GLTFLoader = loaders.GLTFLoader
      const controlsModule = await import('three/examples/jsm/controls/OrbitControls.js')
      OrbitControls = controlsModule.OrbitControls
    }

    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) renderer.dispose()
    if (controls) controls.dispose()

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0b10)

    const width = canvasRef.value.clientWidth || 800
    const height = canvasRef.value.clientHeight || 600
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2)
    sunLight.position.set(10, 20, 10)
    scene.add(sunLight)

    // Raycaster
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    // Load Model
    const loader = new GLTFLoader()
    const gltf = await loader.loadAsync(props.modelPath)
    model = gltf.scene

    // Position and scale
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 12 / maxDim
    model.scale.setScalar(scale)
    
    model.position.x = -center.x * scale
    model.position.y = -box.min.y * scale
    model.position.z = -center.z * scale
    
    scene.add(model)

    // Markers
    initMarkers()

    // Camera setup
    camera.position.set(12, 12, 12)
    camera.lookAt(0, 0, 0)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 5
    controls.maxDistance = 25
    controls.maxPolarAngle = Math.PI / 2.2
    controls.update()

    loading.value = false
    animate()

    // Event listeners
    window.addEventListener('resize', handleResize)
    canvasRef.value.addEventListener('click', onCanvasClick)
    canvasRef.value.addEventListener('mousemove', onCanvasMove)
    
  } catch (err) {
    console.error('3D Error:', err)
    loading.value = false
    error.value = true
    errorMessage.value = err.message
  }
}

const initMarkers = async () => {
  // Import CSS2DRenderer dynamically
  const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer.js')
  
  // Setup CSS2DRenderer
  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0'
  labelRenderer.domElement.style.left = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  wrapperRef.value.appendChild(labelRenderer.domElement)
  
  css2dObjects = []
  hotspotObjects = []
  
  hotspots.forEach((hs) => {
    // Create teardrop marker HTML
    const markerDiv = document.createElement('div')
    markerDiv.className = 'marker-pin'
    markerDiv.style.pointerEvents = 'auto'
    markerDiv.innerHTML = `
      <div class="marker-pin__body">
        <img src="${hs.markerIcon}" alt="${hs.title}" class="marker-pin__icon" />
      </div>
      <div class="marker-pin__pointer"></div>
    `
    
    markerDiv.addEventListener('click', (e) => {
      e.stopPropagation()
      selectedHotspot.value = hs
      updatePopupPosition(hs.position)
    })
    
    const label = new CSS2DObject(markerDiv)
    label.position.set(hs.position.x, hs.position.y + 0.3, hs.position.z)
    label.userData = hs
    scene.add(label)
    css2dObjects.push(label)
    
    // Also create invisible sprite for raycasting (fallback)
    const geometry = new THREE.SphereGeometry(0.3, 8, 8)
    const material = new THREE.MeshBasicMaterial({ visible: false })
    const hitMesh = new THREE.Mesh(geometry, material)
    hitMesh.position.set(hs.position.x, hs.position.y + 0.3, hs.position.z)
    hitMesh.userData = hs
    scene.add(hitMesh)
    hotspotObjects.push(hitMesh)
  })
}

const handleResize = () => {
  if (!canvasRef.value || !camera || !renderer) return
  const w = canvasRef.value.clientWidth
  const h = canvasRef.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  if (labelRenderer) {
    labelRenderer.setSize(w, h)
  }
}

const onCanvasClick = (event) => {
  updateMouse(event)
  
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(hotspotObjects)

  if (intersects.length > 0) {
    const hs = intersects[0].object.userData
    selectedHotspot.value = hs
    updatePopupPosition(hs.position)
  } else {
    // Debug mode with Alt
    if (event.altKey) {
      const terrainIntersects = raycaster.intersectObject(model, true)
      if (terrainIntersects.length > 0) {
        const p = terrainIntersects[0].point
        clickPos.value = { x: p.x, y: p.y, z: p.z }
        debugMode.value = true
        console.log(`Pos: { x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)}, z: ${p.z.toFixed(2)} }`)
      }
    }
    selectedHotspot.value = null
  }
}

const onCanvasMove = (event) => {
  updateMouse(event)
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(hotspotObjects)
  
  canvasRef.value.style.cursor = intersects.length > 0 ? 'pointer' : 'default'
  
  if (selectedHotspot.value) {
    updatePopupPosition(selectedHotspot.value.position)
  }
}

const updateMouse = (event) => {
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

const updatePopupPosition = (pos3d) => {
  if (!camera || !renderer) return
  
  const vector = new THREE.Vector3(pos3d.x, pos3d.y, pos3d.z)
  vector.project(camera)

  const rect = canvasRef.value.getBoundingClientRect()
  const x = (vector.x * 0.5 + 0.5) * rect.width
  const y = (-vector.y * 0.5 + 0.5) * rect.height
  
  popupPos.value = { x, y }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  if (controls) controls.update()
  
  // Update popup every frame
  if (selectedHotspot.value) {
    updatePopupPosition(selectedHotspot.value.position)
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
  
  // Render CSS2D labels
  if (labelRenderer && scene && camera) {
    labelRenderer.render(scene, camera)
  }
}

onMounted(() => {
  if (props.isOpen) {
    setTimeout(initModel, 100)
  }
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    setTimeout(initModel, 100)
  } else {
    if (animationId) cancelAnimationFrame(animationId)
  }
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  if (renderer) renderer.dispose()
  if (labelRenderer && labelRenderer.domElement && labelRenderer.domElement.parentNode) {
    labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement)
  }
})
</script>

<style scoped>
.model-3d-viewer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-3d-viewer__container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #0a0b10;
  display: flex;
  flex-direction: column;
}

.model-3d-viewer__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  z-index: 5;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
}

.model-3d-viewer__title {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
}

.model-3d-viewer__close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 20;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.model-3d-viewer__close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.model-3d-viewer__canvas-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
}

.model-3d-viewer__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* --- THE CARD DESIGN (Figma) --- */
.hotspot-card {
  position: absolute;
  width: 480px;
  max-width: 90vw;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  padding: 10px;
  gap: 16px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.35);
  transform: translate(-50%, calc(-100% - 30px));
  pointer-events: auto;
  z-index: 30;
  font-family: 'Manrope', 'Inter', sans-serif;
}

.hotspot-card__image-wrap {
  flex: 0 0 180px;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
}

.hotspot-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotspot-card__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 4px 8px 0;
}

.hotspot-card__title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1b2b;
  margin: 0 0 8px 0;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: 0;
}

.hotspot-card__text {
  font-size: 12px;
  line-height: 1.5;
  color: #1a1b2b;
  margin: 0;
  opacity: 0.7;
  max-width: 220px;
}

.hotspot-card__btn {
  margin-top: 16px;
  width: fit-content;
  padding: 12px 28px;
  background: #1a1b2b;
  color: #fff;
  border: none;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hotspot-card__btn:hover {
  background: #2d3045;
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(26, 27, 43, 0.2);
}

/* Animations */
.popup-scale-enter-active,
.popup-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.popup-scale-enter-from,
.popup-scale-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-100% - 30px)) scale(0.95);
}

.model-3d-viewer__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  z-index: 5;
  background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
  pointer-events: none;
}

.model-3d-viewer__controls-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 500;
}

.hint-line {
  width: 1px;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
}

.model-3d-viewer__loading {
  position: absolute;
  inset: 0;
  background: #0a0b10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.model-3d-viewer__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.05);
  border-top-color: #f8b543;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.model-3d-viewer__debug {
  position: absolute;
  bottom: 4rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.9);
  color: #0f0;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 10px;
  border-radius: 4px;
  z-index: 1000;
}

@media (max-width: 1024px) {
  .hotspot-card {
    width: 420px;
    gap: 14px;
    padding: 10px;
  }
  .hotspot-card__image-wrap {
    flex: 0 0 150px;
    height: 150px;
  }
  .hotspot-card__title {
    font-size: 16px;
  }
  .hotspot-card__text {
    font-size: 11px;
    max-width: 180px;
  }
}

@media (max-width: 768px) {
  .hotspot-card {
    width: 300px;
    flex-direction: column;
    padding: 12px;
    gap: 12px;
    transform: translate(-50%, calc(-100% - 50px));
  }
  .hotspot-card__image-wrap {
    flex: none;
    width: 100%;
    height: 140px;
  }
  .hotspot-card__title {
    font-size: 15px;
  }
  .hotspot-card__text {
    font-size: 11px;
    max-width: 100%;
  }
  .hotspot-card__btn {
    width: 100%;
    padding: 12px;
    margin-top: 12px;
  }
}

/* --- TEARDROP PIN MARKERS --- */
:global(.marker-pin) {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

:global(.marker-pin:hover) {
  transform: scale(1.15);
}

:global(.marker-pin__body) {
  width: 50px;
  height: 50px;
  background: #ffffff;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

:global(.marker-pin__icon) {
  width: 32px;
  height: 32px;
  object-fit: contain;
  transform: rotate(45deg);
  border-radius: 4px;
}

:global(.marker-pin__pointer) {
  display: none; /* The rotation creates the pointer effect */
}
</style>





