import { ref, onMounted } from 'vue'
import axios from 'axios'

export interface ImageItem {
  id: string
  url: string
}

export function useImageManager() {
  const images = ref<ImageItem[]>([])
  const isDragging = ref(false)
  const draggedItem = ref<ImageItem | null>(null)
  const draggedIndex = ref<number>(-1)

  onMounted(() => {
    const savedImages = localStorage.getItem('productImages')
    if (savedImages) {
      images.value = JSON.parse(savedImages)
    }
  })

  const saveToLocalStorage = () => {
    localStorage.setItem('productImages', JSON.stringify(images.value))
  }

  const handleFileUpload = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(
      file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024,
    )

    for (const file of validFiles) {
      const reader = new FileReader()
      reader.onload = e => {
        const newImage: ImageItem = {
          id: crypto.randomUUID(),
          url: e.target?.result as string,
        }
        images.value.push(newImage)
        saveToLocalStorage()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragStart = (image: ImageItem, index: number) => {
    isDragging.value = true
    draggedItem.value = image
    draggedIndex.value = index
  }

  const handleDragEnd = () => {
    isDragging.value = false
    draggedItem.value = null
    draggedIndex.value = -1
  }

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex.value === -1 || !draggedItem.value) return

    const imagesCopy = [...images.value]
    imagesCopy.splice(draggedIndex.value, 1)
    imagesCopy.splice(dropIndex, 0, draggedItem.value)
    images.value = imagesCopy

    handleDragEnd()
    saveToLocalStorage()
  }

  const deleteImage = (id: string) => {
    images.value = images.value.filter(img => img.id !== id)
    saveToLocalStorage()
  }

  const saveImages = async () => {
    try {
      const response = await axios.post('https://httpbin.org/post', {
        images: images.value,
      })
      console.log('Images saved successfully:', response.data)
      return true
    } catch (error) {
      console.error('Error saving images:', error)
      return false
    }
  }

  const moveImageForward = (index: number) => {
    if (index < images.value.length - 1) {
      const imagesCopy = [...images.value]
      const [movedImage] = imagesCopy.splice(index, 1)
      imagesCopy.splice(index + 1, 0, movedImage)
      images.value = imagesCopy
      saveToLocalStorage()
    }
  }

  const moveImageBackward = (index: number) => {
    if (index > 0) {
      const imagesCopy = [...images.value]
      const [movedImage] = imagesCopy.splice(index, 1)
      imagesCopy.splice(index - 1, 0, movedImage)
      images.value = imagesCopy
      saveToLocalStorage()
    }
  }

  return {
    images,
    isDragging,
    draggedItem,
    handleFileUpload,
    handleDragStart,
    handleDragEnd,
    handleDragOver: (e: DragEvent) => e.preventDefault(),
    handleDrop,
    deleteImage,
    saveImages,
    moveImageForward,
    moveImageBackward,
  }
}
