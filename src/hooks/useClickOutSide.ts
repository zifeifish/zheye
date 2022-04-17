import { ref, onMounted, onUnmounted, Ref } from 'vue'

export const useClickOutSide = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutSide = ref(false)
  const dropdownHandler = (e: MouseEvent) => {
    if (elementRef.value) {
      // e.target as HTMLElement 类型断言防止报错
      if (!elementRef.value?.contains(e.target as HTMLElement) && isClickOutSide.value) {
        isClickOutSide.value = false
      } else {
        isClickOutSide.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', dropdownHandler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', dropdownHandler)
  })

  return isClickOutSide
}
