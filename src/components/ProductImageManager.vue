<template>
  <div class="product-image-manager">
    <ImageUpload :onUpload="handleFileUpload" />

    <ProductList
      :images="images"
      :onDelete="deleteImage"
      :moveImageForward="moveImageForward"
      :moveImageBackward="moveImageBackward"
    />

    <button @click="saveImages" class="save-button" :disabled="!images.length">
      {{ t('save') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import '@/assets/main.css'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ImageUpload from './ImageUpload.vue'
import ProductList from './ProductList.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface ImageItem {
  id: string
  url: string
}

const images = ref<ImageItem[]>([])

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

const saveToLocalStorage = () => {
  localStorage.setItem('productImages', JSON.stringify(images.value))
}

onMounted(() => {
  const savedImages = localStorage.getItem('productImages')
  if (savedImages) {
    images.value = JSON.parse(savedImages)
  }
})

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
</script>

<style scoped>
.save-button {
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: var(--color-text-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
  min-width: 30%;
  float: right;
}
.save-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
