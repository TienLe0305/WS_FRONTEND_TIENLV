export const TOAST_MESSAGES = {
  UPLOAD_ERROR: 'toast.uploadError',
  UPLOAD_SUCCESS: 'toast.uploadSuccess',
  DELETE_SUCCESS: 'toast.deleteSuccess',
  DELETE_ERROR: 'toast.deleteError',
  SAVE_SUCCESS: 'toast.saveSuccess',
  SAVE_ERROR: 'toast.saveError',
} as const

export type ToastMessageKey =
  (typeof TOAST_MESSAGES)[keyof typeof TOAST_MESSAGES]
