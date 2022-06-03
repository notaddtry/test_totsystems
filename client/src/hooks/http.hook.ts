import { useState, useCallback } from 'react'
import { Headers, bag } from 'fetch-headers'

const requestHeaders: HeadersInit = new Headers()
requestHeaders.set('Content-Type', 'application/json; charset=utf-8')

export const request = async (
  url: string,
  method = 'GET',
  body: string | null = null,
  headers = {}
) => {
  try {
    headers = requestHeaders
    if (body) {
      body = JSON.stringify({ name: body })
    }

    const response = await fetch(url, { method, body, headers })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data || 'Ошибка. Повторите позже')
    }

    return data
  } catch (e) {
    if (e instanceof Error) {
      throw e
    } else {
      console.log(e)
    }
  }
}
