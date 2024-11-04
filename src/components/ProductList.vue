<template>
  <div>
    <div class="images-grid">
      <div
        v-for="(image, index) in paginatedImages"
        :key="image.id"
        class="image-container"
        draggable="true"
        @dragstart="onDragStart(image, getOriginalIndex(index))"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @drop="onDrop(getOriginalIndex(index))"
        :class="{ dragging: isDragging && draggedItem?.id === image.id }"
      >
        <img :src="image.url" alt="Product image" class="product-image" />

        <div
          class="dropdown"
          :class="{ 'is-active': openDropdownId === image.id }"
        >
          <button class="edit-button" @click="toggleDropdown(image.id)">
            Edit
          </button>
          <div class="dropdown-menu">
            <button
              @click="moveImageBackward(index)"
              class="dropdown-item move-button"
              :disabled="index === 0"
            >
              <IconBack />
              Move Backward
            </button>

            <button
              @click="moveImageForward(index)"
              class="dropdown-item move-button"
              :disabled="index === images.length - 1"
            >
              <IconNext />
              Move Forward
            </button>

            <button
              @click="onDelete(image.id)"
              class="dropdown-item delete-button"
            >
              <IconTrash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ImageItem } from '@/composables/useImageManager'
import IconTrash from './icons/IconTrash.vue'
import IconBack from './icons/IconBack.vue'
import IconNext from './icons/IconNext.vue'

const props = defineProps<{
  images: ImageItem[]
  isDragging: boolean
  draggedItem: ImageItem | null
  onDragStart: (image: ImageItem, index: number) => void
  onDragEnd: () => void
  onDragOver: (e: DragEvent) => void
  onDrop: (index: number) => void
  onDelete: (id: string) => void
  moveImageForward: (index: number) => void
  moveImageBackward: (index: number) => void
}>()

const openDropdownId = ref<string | null>(null)

const toggleDropdown = (id: string) => {
  if (openDropdownId.value === id) {
    openDropdownId.value = null
  } else {
    openDropdownId.value = id
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    openDropdownId.value = null
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const itemsPerPage = 8
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.images.length / itemsPerPage))

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.images.slice(start, end)
})

const getOriginalIndex = (paginatedIndex: number) => {
  return (currentPage.value - 1) * itemsPerPage + paginatedIndex
}
</script>

<style scoped></style>
