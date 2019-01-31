export const cacheWithLocalStorage = (window, opts, value) => {
  // set opts, then pluck
  opts = { lsKey: 'becca:guid', clearFirst: false, ...opts }
  const { lsKey, clearFirst } = opts
  clearFirst && window.localStorage.removeItem(lsKey)
  window.localStorage.setItem(lsKey, window.localStorage.getItem(lsKey) || value)
  return { [lsKey]: window.localStorage.getItem(lsKey) }
}

export const cwls = cacheWithLocalStorage.bind(null, window)
