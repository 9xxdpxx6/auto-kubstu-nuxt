declare module '#app' {
  interface NuxtApp {
    $api: {
      get<T>(url: string, params?: object): Promise<T>
    }
  }
}

export {}