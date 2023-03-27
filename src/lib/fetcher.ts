import { isLoading } from '../App'

export const fetcher = (...args: unknown[]) => {
  isLoading.value = true

  return fetch(...args).then((res) => {
    isLoading.value = false
    return res.json()
  })
}
