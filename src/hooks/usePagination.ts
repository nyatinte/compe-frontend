import { useState } from 'react'

export const usePagination = (
  initialOffset = 0,
  initialLimit = 10,
): {
  offset: number
  limit: number
  next: () => void
  prev: () => void
  page: number
} => {
  const [offset, setOffset] = useState(initialOffset)
  const [limit] = useState(initialLimit)

  const next = () => {
    setOffset((prev) => prev + limit)
  }

  const prev = () => {
    if (offset - limit < 0) return
    setOffset((prev) => prev - limit)
  }

  const page = offset / limit + 1

  return { offset, limit, next, prev, page }
}
