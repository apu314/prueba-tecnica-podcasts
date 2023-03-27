import { DAY_IN_MILISECONDS, LOCALSTORAGE_LAST_REQUESTED_DATE } from '../consts'

/**
 * isAbleToFetch when
 * 'key' is not in loalStorage
 * || when 'lastRequestedDate' is not in localStorage
 * || passed 1 hay from lastResquetDate
 *
 */
export const isAbleToFetchByDate = () => {
  const now = new Date()
  const lastRequestedDate = localStorage.getItem(LOCALSTORAGE_LAST_REQUESTED_DATE)

  if (!lastRequestedDate) {
    localStorage.setItem(LOCALSTORAGE_LAST_REQUESTED_DATE, now.getTime().toString())
    return true
  }

  if (lastRequestedDate) {
    // now > new Date(lastRequestedDate)
    const differenceInMiliseconds = now.getTime() - new Date(lastRequestedDate).getTime()

    if (differenceInMiliseconds >= DAY_IN_MILISECONDS) {
      localStorage.setItem(LOCALSTORAGE_LAST_REQUESTED_DATE, now.getTime().toString())
      return true
    }
  }

  return false
}
