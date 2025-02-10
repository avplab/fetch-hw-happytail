const BASE_URL = 'https://frontend-take-home-service.fetch.com'

const fetchApiRequest = async (url: string | URL, opts: RequestInit = {}) => {
  const reqInitOpts: RequestInit = {
    ...opts,
    credentials: 'include',
    headers: {
      ...opts?.headers,
      'Content-Type': 'application/json'
    },
  }
  const res = await fetch(BASE_URL + url, reqInitOpts)
  if (!res.ok) {
    throw new ApiError(res)
  }
  return await res.json().catch(() => {})
}

export class ApiError extends Error {
  response: Response

  constructor(response: Response) {
    super(`API Error: ${response.status} ${response.statusText}`)
    this.response = response
  }
}

export function fetchApiPost(url: string, body = {}, opts = {}) {
  return fetchApiRequest(url, { ...opts, method: 'POST', body: JSON.stringify(body) })
}

export function fetchApiGet(url: string, opts = {}) {
  return fetchApiRequest(url, { ...opts, method: 'GET' })
}