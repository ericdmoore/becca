
const selectedBreaks = (breaks, spacing = 8) => {
  const distanceMatrix = (_breaks) => {
    const idx = Array.from(new Set(_breaks)).sort((a, b) => a - b)
    return {
      mat:
        idx.map((v1, rowI, a1) => {
          return a1.map((v2, colJ) => rowI < colJ ? v2 - v1 : null)
        }),
      idx
    }
  }

  const makeChain = (current, { mat, idx, spacing }, partialChain = []) => {
    // where is start in the idx?
    // index into that row of the mat
    // start at col = row and seek till returns the first elem over `spacing`
    // return that elem and make chain starting from there.

    const nxtIdx = mat[idx.indexOf(current)].findIndex(v => !!v && v >= spacing)

    return nxtIdx !== -1
      ? makeChain(idx[nxtIdx], { mat, idx, spacing }, [...partialChain, current])
      : [...partialChain, current]
  }

  const { mat, idx } = distanceMatrix(breaks)
  const chains = breaks.map(v => makeChain(v, { mat, idx, spacing }))
  return chains.reduce((p, c) => c.length > p.length ? c : p, [])
}
// modules.export = { selectedBreaks }
export { selectedBreaks }
