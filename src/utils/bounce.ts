export function bounce<T extends unknown[]>(callback: (...args: T) => void, timeout: number) {
  let timerId: ReturnType<typeof setTimeout>
  return (...args: T) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => callback(...args), timeout)
  }
}