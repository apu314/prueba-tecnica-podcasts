import { isLoading } from '../App'

export const fetcher = (...args: unknown[]) => {
  isLoading.value = true

  return fetch(...args)
    .then((res) => res.json())
    .then((jsonRes) => {
      isLoading.value = false
      return jsonRes
    })
}
