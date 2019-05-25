// vue数据劫持
function render(){
    console.log("视图更新了");
}

// let obj = {
//     name: "tales",
//     age: 28,
//     location: { address:"shanghai" }
// };

let obj = [1,2,3];
//AOP
let methods = ['push','pop','shift','unshift','splice'];
let arrproto = Array.prototype;
let myproto  = Object.create(arrproto);
methods.forEach(method=>{
    myproto[method] = function(){
        render();
        arrproto[method].call(this, ...arguments);
    };
})

//observer
function observer(obj){
    if(Array.isArray(obj)){
        obj.__proto__ = myproto;
        return;
    }
    if(typeof obj === 'object'){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                //set get
                defineReactive(obj, key, obj[key]);
            }
        }
    }
};

//响应视图的方法
function defineReactive(obj, key, value){  //object.defineProperty 只是针对对象
    observer(value);
    Object.defineProperty(obj, key, {
        get(){
            return value;
        },
        set(newVal){
            if(newVal!==value){
                observer(newVal);
                render();
                value = newVal;
            }
        }
    });
}

function $set(obj, key, value){
    defineReactive(obj, key, value)
}

observer(obj);
// obj.name = "tiantiankuaile";
// console.log(obj.name);
// obj.location.address = 'anhui';
// obj.location = {
//     address: "beijing"
// };
// obj.location.address = "dongbei";
// $set(obj, 'hobbits', "sleep");
// obj.hobbits = "drinking";

obj.push(123);
console.log(obj);
// arr length  -> arr replace arr[1]  splice