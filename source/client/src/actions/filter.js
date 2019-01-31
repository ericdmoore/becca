/**
 * Actions for filtering the table state
 * @author: Eric Moore <eric@beccamail.org>
 * @module actions/filter
 */

export const getClassList = ({ credentials }) => (state) => {
  if (state && credentials) {
    return true
  }
  return false
}

export const clearFilter = (listName) => (state) => {
  if (listName in state.filteredList) {
    let filteredList = { ...state.filteredList }
    filteredList[listName] = { filter: '', data: [] }
    return { filteredList }
  } else {
    return { errorMsg: 'Looks like you gave a wrong list name' }
  }
}

export const filterData = (filter) => {
  if (filter) {
    return [true, true]
  }
  return [true, true]
}
