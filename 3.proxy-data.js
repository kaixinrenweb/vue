// vue3 proxy 数据劫持

function render(){
    console.log("模拟视图的更新...");
}

let obj = {
    name: "tales",
    age: 28,
    location: {name:"bj"},
    arr: []
};

//handler
let handler = {
    get(target, key){
        if(typeof target[key]=='object' && target[key]!=null){
            return new Proxy(target[key], handler);
        }
        return Reflect.get(target, key);
    },
    set(target, key, val){
        if(key=='length') return true;
        render();
        return Reflect.set(target, key, val);
    }
};

let proxy = new Proxy(obj, handler);

// proxy.location = "beijing";
// proxy.location.name = 'sh';
proxy.arr.push(123);
proxy.arr[0] = 200;
console.log(proxy.arr);