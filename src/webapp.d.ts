interface WebApp {
  close: () => void
}

declare global {
  interface Window {
    WebApp: WebApp
  }
}

export {}
