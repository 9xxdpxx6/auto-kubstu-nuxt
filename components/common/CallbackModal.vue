<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <template v-if="isSubmitted">
          <h5>Заявка успешно отправлена!</h5>
          <p>Спасибо за запись. Мы свяжемся с вами в ближайшее время.</p>
        </template>
        <template v-else>
          <h5>{{ title }}</h5>
          <form @submit.prevent="submitCallbackRequest" method="POST">
            <div class="mb-3">
              <label for="full_name" class="form-label">ФИО</label>
              <input 
                type="text" 
                class="form-control" 
                id="full_name" 
                v-model="form.full_name" 
                required
                :disabled="isSubmitting"
              >
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Телефон</label>
              <input 
                type="tel" 
                class="form-control" 
                id="phone" 
                v-model="form.phone" 
                required
                :disabled="isSubmitting"
              >
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Почта</label>
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                v-model="form.email"
                :disabled="isSubmitting"
              >
            </div>
            <div class="mb-3">
              <label for="comment" class="form-label">Комментарий</label>
              <textarea 
                class="form-control" 
                id="comment" 
                v-model="form.comment"
                :disabled="isSubmitting"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button 
                v-if="!isSubmitting" 
                type="button" 
                class="btn btn-secondary" 
                @click="close"
              >
                Отмена
              </button>
              <button 
                type="submit" 
                class="btn btn-primary" 
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Идёт отправка...' : 'Отправить' }}
              </button>
            </div>
          </form>
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue'
import { useApi } from '~/composables/useApi'

const props = defineProps<{
  isOpen: boolean
  title?: string
  initialComment?: string
}>()

const emit = defineEmits(['update:isOpen', 'close'])

const api = useApi()
const isSubmitted = ref(false)
const isSubmitting = ref(false)

const form = ref({
  full_name: '',
  phone: '',
  email: '',
  comment: ''
})

// Обработчик нажатия клавиши Escape
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

// Добавляем и удаляем обработчик при монтировании/размонтировании
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Следим за изменением initialComment и обновляем форму
watch(() => props.initialComment, (newComment) => {
  if (newComment) {
    form.value.comment = newComment
  }
}, { immediate: true })

// Следим за изменением isOpen и сбрасываем форму при закрытии
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    resetForm()
  } else if (props.initialComment) {
    form.value.comment = props.initialComment
  }
})

const close = () => {
  emit('update:isOpen', false)
  emit('close')
  isSubmitted.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    full_name: '',
    phone: '',
    email: '',
    comment: ''
  }
}

const submitCallbackRequest = async () => {
  if (isSubmitting.value) return // Защита от повторных отправок

  try {
    isSubmitting.value = true
    // Создаем копию данных формы, чтобы избежать изменений во время отправки
    const formData = { ...form.value }
    await api.callbacks.create(formData)
    isSubmitted.value = true
    setTimeout(() => {
      close()
    }, 2000)
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
