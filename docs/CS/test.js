
let myPromiseAll = (promises) => {
    if(!Array.isArray(promises)){
        return new Error("请输入promise数组")
    }
    let promiseArr = [];
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            if(!promise || typeof promise != 'object' || typeof promise != 'function'){
                reject('请输入正确的的promise')
            }
            promise.then(res => {
                promiseArr.push(res)
            }).catch(err=> {
                reject(err)
            })
        }
        resolve(promiseArr)
    })
}



const myFibWithRec = (n) => {
    if(n < 2){
        return 1;
    } 
    return myFib(n - 1) + myFib(n -2);
}

const myFibNoRec = (n) => {
    if(n < 2){
        return 1;
    }
    let n1=0, n2=1, temp = 0;
    for(let i=1; i<n; i++){
        temp=n1+n2;
        n1=n2;
        n2=temp;
    }
    return n2;
}
