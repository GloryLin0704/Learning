---
title: Vue路由
date: 2018-01-20 16:59:32
tags:
---
## Vue路由

> Vue的路由对于单页面的应用非常有效的，传统的页面应用，是用一些超链接来实现页面的切换和跳转，但是在VueRouter的单页面应用中，则是通过路由之间的切换，既组件之间的切换来实现，方便、简洁、速度快

## 路由的定义及实现
VueRouter的定义分为四步：

* 当然最开始要把 `Vue` 和 `Vue-router` 引进来

1、定义组件
```js
    let Home = {
        template: `
        <div>
            <p>我是主页</p>
        </div>
        `
    }

        let News = {
        template: `
        <div>
            <p>我是新闻</p>
        </div>
        `
    } 
```
<!-- more -->

2、配置路由
```js
const routes = [
    {path:'/home', component: Home},
    {path:'/news', component: News},
    {path:'*', redirect:'/home'}    //路由匹配失败或无匹配状态，全部重定向到主页 
]
```

3、生成路由实例
```js
const router = new VueRouter({
    routes            // 相当于 routes: routes 
})
```
4、挂在Vue实例上
```js
    window.onload = function(){
        new Vue({
            router, //将路由挂在当前的Vue实例中
            el: ''
        });
    }
```

---

> 至此，基本的路由已经定义完了，接下来是路由的实现

`router-link` 用来绑定跳转， `router-view` 用来展示路由

1、跳转

```html
    <div>
        <router-link to="/home">主页</router-link>
        <router-link to="/news">新闻</router-link>
    </div> 
```
2、显示
```html
    <div>
        <router-view></router-view>
    </div>
```
定义跳转的路由，和超链接的意思有点像，例如点击了 `主页` 就切换到了 `/home` 路由，而该路由是由组件 `Home` 去实现，知道了该路由和哪个组件相关，然后就将该组件映射到 `router-view` 中

---

> 至此，基本的路由已经完成

## 在路由中定义路由
如果想在某个路由里再定义路由，在上面定义的基本路由上进行修改

1、定义组件（同上）

2、配置子路由
```js
const routes = [
    {path:'/home', component: Home},
    {
        path:'/news', 
        component: News,
        children: [
            {path:'/one', component: One}.
            {path:'/two', component: Two}.
        ]
    }
]
```
* 注意，是在需要设置子路由的路由里加 `children` 属性，其实相当于是给这个路由再添加了一个 `routes` ，写法和 `routes` 的一样

3、配置路由（同上）

4、生成路由实例（同上）

5、组件
```html
    <template id="_news">
        <div>
            <h3>我是新闻页面</h3>
            <router-link to="/one">1</router-link>
            <router-link to="/two">2</router-link>
            <router-view></router-view>
        </div>
    </template>
```
> 这时候，子路由就已经配置完成，将显示在路由的 `router-view` 里

## 常用的两个方法

```js
    router.push({path:'home'});
    //跳转到主页，一次新的操作，相当于入栈一个新页面，并跳转
```

```js
    router.replace({path:'news'});
    //直接替换当前页面，相当于当前的页面出栈，替换的页面入栈并显示
```