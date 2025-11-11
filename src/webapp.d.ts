interface WebApp {
  close: () => void
  enableClosingConfirmation: () => void
}

declare global {
  interface Window {
    WebApp: WebApp
  }
}

export {}
