/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module comps/Table
 */

/* eslint no-unused-vars: ["error", { "args": "none" }] */
/**
    *
    * Data Lifecycle = handled outside the component.
    *
    * Manages
    *  + SortedBy
    *    + manage the sort indicator
    *  + Labels
    *    + order, alias, and *
    *  + Filters
    *    + driven by something else
    *
    * What about?
    *  1. subcomponents?
    *  1. multi-column sort?
    *  1. pivots - aggregation?
    *  1. Footer?
    *  1. Editable Contents?
    *  1. fixed header + vert scroll
    *  1. selectable rows?
    *  1. multi-selectable rows?
    *  1. add sort actions to actions?
    *
    *  Defaults:
    *  1. Give an array of [{Objs},{Objs}]
    *  1. Sets the header labels as the top level keys of elem:0
    *  1. Prints all the elems in the array
    *  1. If the header is configured with a column list
    */

/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
/* eslint-enable no-unused-vars */

import get from 'lodash.get'
// import deepSet from '../actions/index'

const TableHeader = () => (state, actions) => {
  const labels = Object.entries(state.tables.main.header.ilt).map(([, { label }]) => label)

  return (<thead><tr>
    {labels.map(L => <th> {L.toString()} </th>)}
  </tr></thead>)
}

// const objComb = (obj, combArr = ['id', 'name', 'username', 'email'], getr = get) => {
//   if (!Array.isArray(combArr)) {
//     throw Error('combArr is not an array. It needs to be!')
//   } else {
//     return combArr.map(idx => getr(obj, idx))
//   }
// }

// const rowTransform = (inputArr, fArr) => inputArr.map((inputElem, i) => fArr[i](inputElem))

const combAndTransform = (obj, arrIdxnTransforms) => {
  return arrIdxnTransforms.map(([idx, trans]) => trans(get(obj, idx), obj))
}

const TableRow = ({ row }) => (state) => {
  // look at the alias list
  // pluck out the data elements
  // @ref: https://css-tricks.com/snippets/html/mailto-links/

  const idTrans = Object.entries(state.tables['main'].header.ilt)
    .map(([ _id, { trans } ]) => [_id, trans])
    .map(([_id, t]) => {
      if (_id === '!actions') {
        return [_id,
          (_, o) => {
            return (<div>
              <a
                onclick={() => alert('clicked')}
                href={`mailto:${get(o, 'email')}?cc:becca+1234567890@beccamail.org&bcc:becca+1234567890@beccamail.org`}>
                <i style="margin:0 2px;" class="far fa-envelope"></i>
              </a>
              <a
                onclick={() => alert('clicked')}
                href={`tel:${get(o, 'phone')}`}>
                <i style="margin:0 2px;" class="fas fa-phone"></i>
              </a>
              <a
                onclick={() => alert('clicked')}
                href={`sms:${get(o, 'phone')}`}>
                <i style="margin:0 2px;" class="fas fa-comment-dots"></i>
              </a>
              <a
                onclick={() => alert('clicked')}
                href={`sms:${get(o, 'phone')}`}>
                <i style="margin:0 2px;" class="fas fa-clipboard-check"></i>
              </a>
            </div>)
          }
        ]
      } if (_id === '!avatar') {
        return [_id, (_, o) => {
          return (
            <figure class="avatar avatar-sm"
              style="background-color: #5755d9;"
              data-initial={get(o, 'name').slice(0, 2)}>
              <img src={ get(o, 'male') ? '/icons/male.svg' : '/icons/female.svg' } alt="..."/>
            </figure>)
        }]
      } else return [_id, t]
    })

  return (
    <tr>
      {combAndTransform(row, idTrans).map(elem => <td>{elem}</td>)}
    </tr>
  )
}
const TableBody = ({ data }) => (state) => {
  // console.log(data)
  // data.map(arr => console.log({ arr }))

  const dataWithFilter = (state.filter === ''
    ? data
    : data.map(arr => arr.filter(elem => get(elem, 'name').includes(state.filter))))

  return (
    <tbody>
      {dataWithFilter.map(arr => arr.map(elem => <TableRow row={elem}></TableRow>)) }
    </tbody>)
}

const TableMenuBar = ({ title, filter }) => (state, actions) => {
  return (
    <div class="d-flex" style="justify-content:space-between">
      <h2>{title}</h2>
      <div class="input-group input-inline">
        <input
          type="text"
          class="form-input"
          placeholder="filter"
          value={filter}
          oninput={e => actions.setFilter(e.target.value)}
        />
        <button class="btn btn-primary input-group-btn">Filter</button>
      </div>
    </div>
  )
}

// const TableExperiment = () => () => {
//   return (
//     <div class="form-autocomplete">
//       <div class="form-autocomplete-input form-input">
//         <div class="chip">
//           <img
//             src="img/avatar-1.png" class="avatar avatar-sm"
//             alt="Thor Odinson"/>Thor Odinson
//           <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
//         </div>
//         <input class="form-input" type="text" placeholder="typing here"/>
//       </div>

//       <ul class="menu">
//         <li class="menu-item">
//           <a href="#">
//             <div class="tile tile-centered">
//               <div class="tile-icon">...</div>
//               <div class="tile-content">...</div>
//             </div>
//           </a>
//         </li>
//       </ul>
//     </div>
//   )
// }

export const Table = ({ id = 'main', header = null, body = null }) => (state, actions) => {
  // console.log(`YAY a table component`)
  // console.log({ id, header, body })
  return (
    <div>
      <TableMenuBar title="Class Members" filter={state.filter}/>
      <table class="table table-striped table-hover">
        <TableHeader config={header}></TableHeader>
        <TableBody data={state.classLists[state.tables[id].body.dataSrc]}></TableBody>
      </table>
    </div>
  )
}
/* eslint-enable no-unused-vars */
