// const get = require('lodash.get')


// let arr = [
//     {a:'first',  b:2, c:3,d:{e:{f:'d1a', g:'d1a'}}},
//     {a:'second', b:2, c:3,d:{e:{f:'d2a', g:'d2b'}}},
//     {a:'third',  b:2, c:3,d:{e:{f:'d3a', g:'d3c'}}},
// ]

// gettrs = ['a','d.e.f','d.e.g']
// console.log( arr.map(e=> gettrs.map(g=> get(e,g))) )



// let me = {a:'first',  b:2, c:3, d:{e:{f:'d1a', g:'d1a'}}}

// console.log(me)
// let me_ = me
// me_['d']['e']['g'] = 'ogstatus'
// console.log(me_)


const state = {
    tables: {
        main: {
        header: {
            ilt: {
            '!actions': { label: ' ', trans: (i) => i },
            '!avatar': { label: ' ', trans: (i) => i },
            'username': { label: 'Name', trans: (i) => i },
            'address.zipcode': { label: 'Zip', trans: (i) => i },
            'website': { label: 'Site', trans: (url) => `//${url}`},
            'dob': { label: 'Age', trans: () => '33yr' },
            'activityStamp': { placeholder: true, label: 'Recent', trans: () => '12d ago' }
            },
            filter: null,
            sort: {
            by: '', // list the property id
            desc: true
            }
        },
        body: {
            dataSrc: 'fellowshipClass'
        },
        footer: {}
        }
    },    
    classLists: {
        class1:[{a:'1a', b:'2'},{a:'1b', b:'2'}],
        class2:[{a:'111', b:'12'},{a:'22', b:'22'}]
    }
}

// const setDeepFilter = _filter => (state) => ({ tables: { main: { header: {...state.tables.main.header, filter: _filter }}}})
const setDeepFilter = _filter => (state) => ({ tables: { main: { header: Object.assign( state.tables.main.header, {filter: _filter}) }}})

console.log(JSON.stringify(setDeepFilter({'a':1})(state),null, 2))