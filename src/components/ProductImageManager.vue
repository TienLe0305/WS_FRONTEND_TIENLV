<script setup lang="ts">
import '@/assets/main.css'
import ImageUpload from './ImageUpload.vue'
import ProductList from './ProductList.vue'
import { useImageManager } from '@/composables/useImageManager';

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
  moveImageBackward
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

    <button 
      @click="saveImages"
      class="save-button"
      :disabled="!images.length"
    >
      Save
    </button>
  </div>
</template>
