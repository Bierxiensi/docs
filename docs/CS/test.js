
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


var promiseArr = [], i;
function myPromiseAll(promises) {
    if(!Array.isArray(promises)){
        return console.log("请输入promise数组")
    }
    return new Promise((resolve, reject) => {
        for (i = 0; i< promises.length; i++) {
            if(!promises[i] || typeof promises[i] != 'object' || typeof promises[i] != 'function'){
                reject('请输入正确的的promise')
            }
            promises[i].then(res => {
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


var index = 0;
const promises = [new Promise(), new Promise()];
const promiseIterator =  {
    next: function() {
        if(index < promises.length){
            return { done: false, value: promises[index++] }
        } else {
            return { done: true, value: undefined }
        }
    }
}


const myPromiseAllWithiterator = () => {
    return new Promise((resolve, reject) => {

    })
}