<template>
  <div>
    <div class="images-grid">
      <div
        v-for="(image, index) in paginatedImages"
        :key="image.id"
        class="image-container"
        draggable="true"
        @dragstart="handleDragStart(image, getOriginalIndex(index))"
        @dragend="handleDragEnd"
        @dragover="handleDragOver"
        @drop="handleDrop(getOriginalIndex(index))"
        :class="{ dragging: isDragging && draggedItem?.id === image.id }"
      >
        <img :src="image.url" alt="Product image" class="product-image" />

        <div
          class="dropdown"
          :class="{ 'is-active': openDropdownId === image.id }"
        >
          <button class="edit-button" @click="toggleDropdown(image.id)">
            {{ t('edit') }}
          </button>
          <div class="dropdown-menu">
            <button
              @click="moveImageBackward(getOriginalIndex(index))"
              class="dropdown-item move-button"
              :disabled="index === 0"
            >
              <IconBack />
              {{ t('moveLeft') }}
            </button>

            <button
              @click="moveImageForward(getOriginalIndex(index))"
              class="dropdown-item move-button"
              :disabled="index === images.length - 1"
            >
              <IconNext />
              {{ t('moveRight') }}
            </button>

            <button
              @click="onDelete(image.id)"
              class="dropdown-item delete-button"
            >
              <IconTrash />
              {{ t('delete') }}
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
        {{ t('previous') }}
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        {{ t('next') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import IconTrash from './icons/IconTrash.vue'
import IconBack from './icons/IconBack.vue'
import IconNext from './icons/IconNext.vue'
import { useI18n } from 'vue-i18n'

interface ImageItem {
  id: string
  url: string
}

const props = defineProps<{
  images: ImageItem[]
  onDelete: (id: string) => void
  moveImageForward: (index: number) => void
  moveImageBackward: (index: number) => void
}>()

const { t } = useI18n()

const isDragging = ref(false)
const draggedItem = ref<ImageItem | null>(null)
const draggedIndex = ref<number>(-1)

const handleDragStart = (image: ImageItem, index: number) => {
  isDragging.value = true
  draggedItem.value = image
  draggedIndex.value = index
}

const handleDragEnd = () => {
  isDragging.value = false
  draggedItem.value = null
}

const handleDrop = (dropIndex: number) => {
  if (!draggedItem.value) return
  const draggedIndex = props.images.findIndex(
    img => img.id === draggedItem.value?.id,
  )
  if (draggedIndex === -1) return

  if (draggedIndex < dropIndex) {
    for (let i = draggedIndex; i < dropIndex; i++) {
      props.moveImageForward(i)
    }
  } else {
    for (let i = draggedIndex; i > dropIndex; i--) {
      props.moveImageBackward(i)
    }
  }

  handleDragEnd()
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

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

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>
