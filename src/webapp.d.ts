interface WebApp {
  close: () => void
  enableClosingConfirmation: () => void
  HapticFeedback: {
    impactOccurred: (
      style: 'heavy' | 'light' | 'medium' | 'rigid' | 'soft',
      disableVibrationFallback?: boolean,
    ) => void
    notificationOccurred: (
      style: 'error' | 'success' | 'warning',
      disableVibrationFallback?: boolean,
    ) => void
    selectionChanged: () => void
  }
  ready: () => void
}

declare global {
  interface Window {
    WebApp: WebApp
  }
}

export {}
