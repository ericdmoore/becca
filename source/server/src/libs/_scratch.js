
const log = console.log;

function* genNums(n){
    let x =1;
    let lorem100 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam, dolor a gravida posuere.`
    while(x<=n){
        let num = ":" + x.toString();
        yield lorem100.slice(0, -num.length) + num;
        x++
    }
}

// [...genNums(12)].map(v=>console.log(v));

// ChurchDB truncates at 20*100 ~= 2k chars
console.log([...genNums(10)].reduce((acc, elem)=>acc + elem,""))


const beccaKey = ({userToken})=> userToken + '.json'
let userToken = "YourName"
log(beccaKey({userToken}))