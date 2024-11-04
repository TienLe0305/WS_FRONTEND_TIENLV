<script setup lang="ts">
import '@/assets/main.css'
import { useImageManager } from '@/composables/useImageManager'
import ImageUpload from './ImageUpload.vue'
import ProductList from './ProductList.vue'

const {
  images,
  isDragging,
  draggedItem,
  handleFileUpload,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
  deleteImage,
  saveImages,
  moveImageForward,
  moveImageBackward,
} = useImageManager()
</script>

<template>
  <div class="product-image-manager">
    <ImageUpload :onUpload="handleFileUpload" />

    <ProductList
      :images="images"
      :isDragging="isDragging"
      :draggedItem="draggedItem"
      :onDragStart="handleDragStart"
      :onDragEnd="handleDragEnd"
      :onDragOver="handleDragOver"
      :onDrop="handleDrop"
      :onDelete="deleteImage"
      :moveImageForward="moveImageForward"
      :moveImageBackward="moveImageBackward"
    />

    <button @click="saveImages" class="save-button" :disabled="!images.length">
      Save
    </button>
  </div>
</template>

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
