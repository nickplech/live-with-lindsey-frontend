export function persist(type, key, value) {
  if (typeof window !== 'undefined') {
    if (type === 'get') {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key)) 
      }
    }
    if (type === 'set') {
      localStorage.setItem(key, JSON.stringify(value)) 
    }
  }
  return
  }