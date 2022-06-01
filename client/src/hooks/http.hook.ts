import { useState, useCallback } from 'react'
import { Headers, bag } from 'fetch-headers'

interface IError {
  message?: string
}

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IError | null>(null)

  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('Content-Type', 'application/json; charset=utf-8')

  const request = useCallback(
    async (
      url: string,
      method = 'GET',
      body: BodyInit | null = null,
      headers = {}
    ) => {
      setLoading(true)
      try {
        if (body) {
          headers = requestHeaders
          body = JSON.stringify({ name: body })
          // headers.set('content-type', 'application/json')
        }
        console.log(body)

        const response = await fetch(url, { method, body, headers })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Ошибка. Повторите позже')
        }

        setLoading(false)

        return data
      } catch (e) {
        if (e instanceof Error) {
          setLoading(false)
          setError(e)
          throw e
        } else {
          console.log(e)
        }
      }
    },
    []
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { request, loading, error, clearError }
}
