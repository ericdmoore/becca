const classMembers = require('../libs/classMembers.js');

const testGen = ({name, input, expected})=>{
    let actual = classMembers.get(),
    return {
            name,
            asert = (a, e)=>a===e,
            actual,
            expected
          }
}

exports.default = {
    "classMembers.get":[
        testGen({
            name:"some test",
            input: "somedeal",
            expected: "somethinelse"
        }),
        testGen({
            name:"some test",
            input: "somedeal",
            expected: "somethinelse"
        })
    ]
}
