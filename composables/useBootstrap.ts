import type { Modal, Toast, Popover, Tooltip } from 'bootstrap'

export const useBootstrap = () => {
  const { $bootstrap } = useNuxtApp()
  
  return {
    Modal: $bootstrap?.Modal as typeof Modal,
    Toast: $bootstrap?.Toast as typeof Toast,
    Popover: $bootstrap?.Popover as typeof Popover,
    Tooltip: $bootstrap?.Tooltip as typeof Tooltip
  }
} 