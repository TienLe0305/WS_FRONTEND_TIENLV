<template>
  <div class="upload-container">
    <div
      class="dropzone"
      :class="{ 'dropzone-active': isDragging }"
      @click="triggerFileSelect"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <div class="dropzone-content">
        <div class="upload-icon">
          <UploadIcon />
        </div>
        <span class="dropzone-text">
          {{ t('dragDrop') }}
        </span>
        <span class="upload-hint">{{ t('supports') }}</span>
      </div>
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        @change="handleFileSelect"
        class="file-input"
      />
    </div>

    <div class="image-preview" v-if="previews.length">
      <h3>{{ t('imagePreview') }}</h3>
      <div class="preview-items">
        <div class="preview-item" v-for="(src, index) in previews" :key="index">
          <img
            :key="index"
            :src="src"
            alt="Image Preview"
            class="preview-image"
          />
          <button class="remove-button" @click="removeImage(index)">
            &times;
          </button>
        </div>
      </div>
      <button
        class="add-button"
        @click="addImages"
        :disabled="!selectedFiles.length"
      >
        {{ t('addImages') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UploadIcon from './icons/IconUpload.vue'
import { useI18n } from 'vue-i18n'

interface Props {
  onUpload: (files: FileList | File[]) => void
}

const { t } = useI18n()

const props = defineProps<Props>()

const isDragging = ref(false)
const previews = ref<string[]>([])
const selectedFiles = ref<File[]>([])

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileSelect = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const fileInputElement = event.target as HTMLInputElement
  if (fileInputElement.files?.length) {
    selectedFiles.value = Array.from(fileInputElement.files)
    generatePreviews(selectedFiles.value)
  }
}

const generatePreviews = (files: File[]) => {
  previews.value = []
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result) {
        previews.value.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  })
}

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false

  const files = e.dataTransfer?.files
  if (files?.length) {
    selectedFiles.value = Array.from(files)
    generatePreviews(selectedFiles.value)
  }
}

const addImages = () => {
  props.onUpload(selectedFiles.value)
  selectedFiles.value = []
  previews.value = []
}

const removeImage = (index: number) => {
  previews.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
}
</script>

<style scoped></style>
