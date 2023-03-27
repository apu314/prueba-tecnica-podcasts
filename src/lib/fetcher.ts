import { isLoadingSignal } from '../App'

export const fetcher = (...args: unknown[]) => {
  isLoadingSignal.value = true

  return fetch(...args).then((res) => {
    isLoadingSignal.value = false
    return res.json()
  })
}
