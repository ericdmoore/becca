
const testAPIroot = ({name, input, expected})=>{
    const someFunc = async ({inputs})=>{return true};

    /**
     * http://localhost:3000/v1/tokens.json?user=yourUserName&password=SomePassword
     */

    return {
        name,
        assert: (a, e)=>{a===e},
        actual: someFunc(input),
        expected
    }
}

exports.default = {
    "root":[
        {
            name:"testName",
            assert:(a, e)=>{a===e},
            actual: ()=>{return true},
            expected: 42
        },
    ]
}