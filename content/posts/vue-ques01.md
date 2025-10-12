+++
date = '2025-10-12T14:50:55+08:00'
draft = false
categories = ['Vue']
tags = ['Vue']
title = 'Vue3 + Ant Design Vue 实现动态菜单高亮的解决方案'
+++

### **问题背景**

在一个用户中心项目中，使用 Ant Design Vue 的 `<a-menu>` 组件来实现顶部导航菜单。菜单的高亮状态通过 `v-model:selectedKeys` 绑定到一个 `current` 值上。初始代码如下：

```html
<a-menu
  v-model:selectedKeys="current"
  mode="horizontal"
  :items="items"
  @click="doMenuClick"
/>
```

`current` 的值是通过 Vue Router 的 `route.path` 动态设置的。然而，页面刷新时，`current` 的初始值会短暂停留在默认值（如 `["/"]`），然后才更新为正确的路径。这种短暂的错误会导致菜单高亮状态不正确。

### **解决方案**

为了解决这个问题，我们需要确保 `current` 的值在组件加载时立即同步到当前路径，并避免初始值的短暂错误。以下是完整的解决方案。

```typescript
import { h, ref, watch, onMounted } from "vue";
import { HomeOutlined, CrownOutlined } from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 初始化 current
const current = ref<string[]>([]);

// 在组件挂载时同步 current 的值
onMounted(() => {
  current.value = [route.path]; // 确保初始值与当前路径同步
});

// 监听路由变化，动态更新 current
watch(
  () => route.path,
  (newPath) => {
    current.value = [newPath];
  }
);

// 菜单点击事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push(`${key}`);
};

// 菜单项配置
const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/user/login",
    label: "用户登录",
    title: "用户登录",
  },
]);
```

### 注意事项

使用 `onBeforeMount`还是会短暂停留在"主页", 而使用 `onMounted`反而不会, 涉及到Vue生命周期

Vue 的生命周期钩子函数在组件的不同阶段执行，主要包括以下两个阶段：

1. **`onBeforeMount`**
   * **执行时机** ：在组件即将挂载到 DOM 之前执行。
   * **特点** ：
   * 此时模板尚未渲染到页面上，但组件的响应式数据已经初始化。
   * 如果在 `onBeforeMount` 中设置响应式数据，Vue 会在模板渲染时使用这些数据。
   * **问题** ：
   * 如果依赖的外部数据（如 `route.path`）尚未完全同步，`onBeforeMount` 中设置的值可能是默认值（如 `["/"]`）。
   * 这会导致模板渲染时，菜单短暂高亮默认项（如“主页”），然后再更新为正确的路径。
2. **`onMounted`**
   * **执行时机** ：在组件挂载到 DOM 之后执行。
   * **特点** ：
   * 此时模板已经渲染到页面上，Vue Router 的 `route.path` 通常已经同步完成。
   * 在 `onMounted` 中设置响应式数据，Vue 会立即触发 DOM 更新。
   * **优势** ：
   * 因为 `route.path` 的值已经是正确的，菜单会直接高亮正确的项，而不会短暂停留在默认值。

---

#### **为什么 `onBeforeMount` 会短暂停留在“主页”？**

在 `onBeforeMount` 中，模板尚未渲染，但响应式数据已经初始化。如果此时 `route.path` 的值还未同步（例如，Vue Router 还在初始化），`current.value` 会短暂使用默认值（如 `["/"]`）。当模板渲染时，菜单会短暂高亮默认值对应的项（如“主页”），然后在 `watch` 中更新为正确的路径。

---

#### **为什么 `onMounted` 不会停留在“主页”？**

在 `onMounted` 中，Vue Router 的 `route.path` 通常已经完成初始化。此时设置 `current.value`，菜单会直接高亮正确的项。因为模板已经渲染，Vue 的响应式机制会立即更新 DOM，避免了短暂的高亮错误。

### 更简洁的实现方案

```typescript
router.afterEach((to, from, failure) => {
  current.value = [to.path];
});
```

#### 方案解析

1. **`router.afterEach` 的作用**
   * `afterEach` 是 Vue Router 提供的全局导航守卫，每次改变路由或刷新页面时都会自动更新current的值
   * 添加一个导航钩子，它会在每次导航之后被执行。返回一个用来移除该钩子的函数。

     ```
     afterEach(guard): () => void
     ```
2. **动态更新 `current`**
   * `current` 是绑定到 `<a-menu>` 的 `v-model:selectedKeys` 的值，用于控制菜单的高亮状态。
   * 在 `afterEach` 中，将 `to.path` 的值赋给 `current`，确保菜单的选中项始终与当前路由保持一致。
3. **简化逻辑**
   * 不需要在组件内部手动监听路由变化，也不需要额外的生命周期钩子（如 `onMounted`）。
   * 高亮逻辑集中在一个地方，代码更加简洁明了。
