+++
date = '2025-10-14T13:51:34+08:00'
draft = false
categories = ['Vue']
tags = ['Vue']
title = 'Vue 3 中使用 getCurrentInstance 获取全局属性动态设置样式'
+++


在 Vue 3 的开发中，我们有时需要通过全局属性来动态设置组件的样式，例如页面的最大宽度和最小宽度。本文将结合一个实际案例，详细讲解如何使用 `getCurrentInstance` 获取全局属性，并通过动态绑定样式实现需求。

---

#### 1. 背景介绍

在 Vue 3 中，`app.config.globalProperties` 提供了一种方式，可以定义全局属性供所有组件访问。这些全局属性可以在组件中通过 `getCurrentInstance` 获取，并用于动态设置样式或其他逻辑。

以下是一个示例场景：

* 我们需要设置页面的最大宽度和最小宽度。
* 这些宽度值是全局定义的，方便在不同组件中复用。

---

#### 2. 实现步骤

##### **（1）在 `main.js` 中定义全局属性**

首先，在 `main.js` 中通过 `app.config.globalProperties` 定义全局属性 `bodyMaxWidth` 和 `bodyMinWidth`：

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 定义全局属性
app.config.globalProperties.bodyMaxWidth = 2000
app.config.globalProperties.bodyMinWidth = 1250

app.mount('#app')
```


这里的 `bodyMaxWidth` 和 `bodyMinWidth` 分别表示页面的最大宽度和最小宽度。

---

##### **（2）在组件中获取全局属性**

在需要使用这些全局属性的组件中，我们可以通过 `getCurrentInstance` 获取组件实例的 `proxy`，从而访问全局属性。

以下是一个示例组件：

```javascript
<template>
  <div
    class="main-container"
    :style="{
      'maxWidth': proxy.bodyMaxWidth + 'px',
      'minWidth': proxy.bodyMinWidth + 'px',
    }"
  >
    构建成功
  </div>
  <div><el-button type="primary">Primary Button</el-button></div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

// 获取当前组件实例的 proxy
const { proxy } = getCurrentInstance();
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #fff;
  margin: 0 auto;
  min-height: calc(100vh);
}
</style>
```


**关键点解析：**

1. **`getCurrentInstance`** ：

* 这是 Vue 3 提供的一个 API，用于获取当前组件的实例。
* 通过 `getCurrentInstance().proxy` 可以访问全局属性。

1. **动态绑定样式** ：

* 使用 `:style` 动态绑定样式，将全局属性 `bodyMaxWidth` 和 `bodyMinWidth` 的值拼接为带单位的字符串（如 `2000px` 和 `1250px`）。

---

##### **（3）检查样式是否生效**

为了确保样式生效，可以使用浏览器的开发者工具检查 `.main-container` 的内联样式是否正确设置。例如：

```html
<div
  class="main-container"
  style="max-width: 2000px; min-width: 1250px;"
>
  构建成功
</div>
```


#### 3. 常见问题及解决方案

##### **问题 1：`proxy` 是 `undefined`**

* **原因** ：`getCurrentInstance` 必须在组件的 `setup` 函数中调用，且组件必须被挂载。
* **解决方法** ：确保在正确的生命周期内调用 `getCurrentInstance`。

##### **问题 2：全局属性未定义**

* **原因** ：`bodyMaxWidth` 和 `bodyMinWidth` 未在 `main.js` 中定义。
* **解决方法** ：检查 `main.js` 中是否正确设置了全局属性。
