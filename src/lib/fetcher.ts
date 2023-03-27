import { isLoadingSignal } from '../App'

export const fetcher = (...args: [string, RequestInit?]): Promise<Response> => {
  isLoadingSignal.value = true

  return fetch(...args).then((res) => {
    isLoadingSignal.value = false
    return res.json()
  })
}
