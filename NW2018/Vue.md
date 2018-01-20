---
title: LearningVue
date: 2018-01-19 21:06:46
tags:
---
> 不知从何说起，那就随性所始

## 组件的定义

1.
```js
    let com = {
        data(){
            return{

            }
        },
        methods:{},
        template:`
        <div>
            <h1>xxx</h1>
            <h2>xxx</h2>
        </div>
        `
    }, //直接定义完整的组件
```
<!-- more -->

2.
```js
    let com = {
        template:'#aaa',
        data(){
            return{}
        },
        methods:{}
    }//先定义组件
```
```html
<!-- 然后在body中 -->
    <template id="aaa">
        <div>
            <h1>xxx</h1>
            <h2>xxx</h2>
        </div>
    </template>

```
* 两种写法都可以定义组件，但第二种写法有代码高亮和缩进，个人比较喜欢。


> 定义完组件后记得要加入到父组件的 `components` 中，不然无法使用 

## Vue的生命周期(钩子函数)

`beforeCreate`	组件实例刚刚被创建,属性都没有

`created`	实例已经创建完成，属性已经绑定

`beforeMount`	模板编译之前

`mounted`	模板编译之后，代替之前ready  （常用！）

`beforeUpdate`	组件更新之前

`updated`	组件更新完毕	（有用！）

`beforeDestroy`	组件销毁前

`destroyed`	组件销毁后

* 用 `mouted` 函数可以在页面加载完的时候完成一些事件的声明和绑定

## 组件通信

### 单一事件管理组件通信

```js
    let Event = new Vue()
    Event.$emit(事件名称，数据)
    Event.$on(事件名称，(data) => {
        //data
    })
```

### 子组件想更改父组件的数据

子组件想要拿到父组件数据:通过  props

a). 父组件每次传一个对象给子组件, 对象之间引用(此时父子组件的值都改了)
```js
window.onload=function(){
    new Vue({
        el:'#box',
        data:{
            giveData:{
                a:'我是父组件数据'
            }
        },
        components:{
            'child-com':{
                props:['msg'],
                template:'#child',
                methods:{
                    change(){
                        this.msg.a='被改了';
                    }
                }
            }
        }
    });
};
```

```html
<template id="child">
    <div>
        <span>我是子组件</span>
        <input type="button" value="按钮" @click="change">
        <strong>{{msg.a}}</strong>
    </div>
</template>

<div id="box">
    父级: ->{{giveData.a}}
    <br>
    <child-com :msg="giveData"></child-com>
</div>
```
b). mounted中转（只有子组件的值改了）
```js
window.onload=function(){
    new Vue({
        el:'#box',
        data:{
            a:'我是父组件数据'
        },
        components:{
            'child-com':{
                data(){
                    return {
                        b:''
                    }
                },
                props:['msg'],
                template:'#child',
                mounted(){
                    this.b=this.msg;
                },
                methods:{
                    change(){
                        this.b='被改了';
                    }
                }
            }
        }
    });
};
```

```html
<template id="child">
    <div>
        <span>我是子组件</span>
        <input type="button" value="按钮" @click="change">
        <strong>{{b}}</strong>
    </div>
</template>

<div id="box">
    父级: ->{{a}}
    <br>
    <child-com :msg="a"></child-com>
</div>
```

## this

>当你要确定“函数中的this是什么”的时候，永远不要到函数定义的地方去找答案！而是要到函数被调用的地方找答案！

>具体说：函数里面的this的含义，是由它被调用的方式决定的


单纯的一个function(){}里，this是指向`window`的

用 `call` 和 `bind` 可以给当前调用的 `this` 指定对象

但是在ES6的箭头函数中，是没有 `this` 的，默认向作用域链上找 `this`
