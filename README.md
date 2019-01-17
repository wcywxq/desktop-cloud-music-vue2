# **vue相关**
### **1. 父组件和子组件相互传值**
#### **（传值）: 父组件 -> 子组件**
+ ```props``` 与 ```v-bind``` 组合使用  
```
introduction: 
1、父组件定义v-bind绑定想要传递值的名称和值；
2、子组件设置props属性，对应父组件传递过来的值的名称
```
---
#### **（传方法）: 父组件 -> 子组件**
+ ```v-on```与```this.$emit()```组合使用
```
introduction: 
1、父组件定义v-on设置想要传递的方法的名称和值；
2、子组件使用 this.$emit(传递过来的方法的名称) 调用
```
---
#### **（传值）: 子组件 -> 父组件**
+ ```this.$emit(方法名称，参数)```
```
introduction: 
1、父组件使用v-on自定义一个事件，同时设置事件名称；
2、子组件使用this.$emit(设置的事件名称， 想要向父组件传递的值)来进行传递
3、父组件自定义的事件所对应的方法的第一个参数 == 子组件向父组件传递的值
```
### **2. 获取dom节点**
+ 使用```this.$refs```获取dom
```
example: 
1、<div ref="mydiv">123</div>
2、vm实例对象引用 => this.$refs.mydiv
```
---
+ 组件使用```this.$refs```， 可以获取组件的引用，同时可以获取组件的data，methods等
```
for example: 
<div id="app">
    <input type="button" value="按钮" @click="btn">
</div>
<com1 ref="com1"></com1>

<script>
/** 组件com1 */
    var com1 = {
        template: '<div>这是com1组件</div>',
        data() {
           return { msg: "这是一个数据" }
        },
        methods: {
           change() {
             console.log("这是一个方法")
           }
        },
    }
/** vm实例对象 */
    var vm = new Vue({        
        components: { com1 }
        methods: {
            btn() {
                console.log(this.$refs.com1.msg) // 输出：这是一个数据
                this.$refs.com1.change() // 输出：这是一个方法
            }
        }
    })
</script>
```
### **3. 路由**
+ 1.```后端路由```：**对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上的资源。**
+ 2.```前端路由```：**对于单页面应用程序（SPA），主要通过URL的hash(#)来实现不同页面之间的切换；同时，hash有一个特点，http请求中不会包含hash相关的内容；因此，单页面应用程序页面之间的跳转主要用hash来实现。**
+ 3.使用命名视图（即：放置对应名称的组件，一个页面放置多个路由组件），实现经典布局  <==> ```<router-view></router-view>```
```
for example:
1、导入vue.js
2、导入vue-router
<div id="app">
    <router-view></router-view>
    <router-view name="left"></router-view>
    <router-view name="main"></router-view>
</div>

<script>
var header = {
    template: "<div>header</div>"
}
var leftBox= {
    template: "<div>left</div>"
}
var mainBox= {
    template: "<div>main</div>"
}

var router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: header,
                'left': leftBox,
                'main': mainBox,
            }
        }
    ]
})

var vm = new Vue({
    el: '#app',
    router
})
</script>
```
### **4. vue组件中data必须要写成函数形式的原因**
```
vue实例中的data是对象的写法，但是在组件中data是函数的写法，
原因是：写成函数形式，会有函数作用域的概念，属于私有函数，只会作用到当前组件中，并不会影响到其他各个不同的组件。
```
### **5. watch监听属性（可以监听路由的变化）**
```
<input type="text" v-model="msg">
<script>
data: {
   msg: ''
},
watch: {
  msg(newVal, oldVal) {
    console.log(newVal) // 新的值
    console.log(oldVal) // 旧的值
  },
  "$route.path": function(newVal, oldVal) {
    console.log(newVal) // 新的路由地址
    console.log(oldVal) // 旧的路由地址
  }
}
</script>
```
### **6. computed计算属性**
```
introduce: 
    在computed中，可以定义一些属性（计算属性）；计算属性的本质就是一个方法。只不过在我们这些计算属性的时候，是直接把他们的名称当作属性来使用的，并不会把计算属性当作方法来调用。
注意：
    1. `计算属性` 在引用的时候，一定不要加()去调用，直接把它当做普通的属性去使用就好。
    2. 只要 `计算属性` 这个function内部所用到的任何`data中的数据`发生了变化，就会立即重新计算这个 `计算属性` 的值
    3. 计算属性的求值结果，会被`缓存`起来，方便下次直接使用; 如果 `计算属性` 方法中，所依赖的所有数据，都没有发生变化，则不会重新对 `计算属性` 进行求值;
    
for example:
    <input type="text" v-model="firstname">
    <input type="text" v-model="lastname">
    <input type="text" v-model="fullname">
    <script>
        data: {
          firstname: '',
          lastname: ''
        },
        computed: {
          fullname() {
            return this.firstname + '-' + this.lastname;
          } 
        }
    </script>
```
### **7. watch、computed、methods之间的对比**
```
1.  `computed`: 属性会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用。
2.  `watch`: 是一个对象，键是一个需要观察的表达式，值是对应的回调函数，主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作。可以看作是methods和computed的结合体。
3.  `methods`: 表示一个具体的操作，主要用来书写业务逻辑
```
### **8. render函数**
```
for example:
<script>
var login = {
    template: '<h1>这是登陆组件</h1>'
}

var vm = new Vue({
    el: "#app",
    data: {
    },
    render: function(createElements) {
    // createElements是一个方法，调用它，能够把指定的组件模板，渲染为html结构
        return createElements(login)
        /** 
            注意：这里 `return`的结果，会替换页面中`el`所指定的那个容器,
            例如： <div id="app"></div> 会被替换成 => <login></login>这个组件内部的内容 
        */
    }
})
</script>

render函数缩写：
render: c => c(login)
```
### **9. 模块的导入和导出**
+   *Node 中 `导入 和 导出` 模块*
```
node 导入模块：
    var 名称 = require('模块标识符')
node 向外暴露成员：`[ module.exports 和 exports ]`
    module.exports = {}
```
+   *在 es6 中也通过规范的形式，规定了 es6 中如何 `导入 和 导出` 模块*
```
es6 中导入模块：
    方式一： inport 模块名称 from '模块标识符' 
    方式二： inport '标识路径' 
es6 中使用 `export default` 和 `export` 向外暴露成员：
[export default]
（1）注意：
    1. `export default` 向外暴露的成员，可以使用任意的变量来接收，不一定非要和暴露出去的变量的名称相同；
    2.在一个模块中，`export default` 只允许向外暴露一次
    3.在一个模块中，可以同时使用 `export` 和 `export default` 向外暴露成员

（2）for example：
    > 导出："test.js"
        var info = {
            name: 'zs',
            age: 20
        }
        export default info
    > 接收： 
        import m222 from './test.js'
    
[export]
（1）注意：
    4.使用 `export` 向外暴露的成员只能使用 `{ }` 的形式来接收，这种形式叫做 `按需导出`
    5.`export` 可以向外暴露多个成员；同时，如果某些成员，我们在`import`的时候，不需要，则可以不在 `{}` 中定义
    6.使用 `export` 导出的成员必须严格按照导出时的名称，来使用 `{}` 按需接收
    7.使用 `export` 导出的成员如果就像换个名称来接收，可以使用 `as` 来起别名。 
    例如：import { title as title123 } from './test.js'
    
（2）for example：
    > 导出： "test.js"
        export const title = "小星星"
    > 接收：
        import { title } from './test.js'
```
### **10. 问题：通过路由匹配的组件为什么不直接引入到el所渲染的组件中，而是要通过router-view来进行渲染**
```
注意：
    1. App这个组件，是通过vm实例的render函数渲染出来的，render函数如果要渲染组件，那么渲染出来的组件只能放到  el: "#app"  所制定的元素中.
    2. `Account` 和 `GoodsList` 组件，是通过路由匹配监听到的。所以这两个组件，只能展示到路由的 `router-view` 中
```