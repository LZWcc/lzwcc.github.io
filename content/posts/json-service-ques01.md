+++
date = '2025-10-12T18:37:52+08:00'
draft = false
categories = ['frontend']
tags = ['json-server']
title = 'json-server 常用自定义路由和简单配置'
+++

## 前言

在前端开发中，我们经常需要模拟后端接口进行开发和测试。`json-server` 是一个非常流行的工具，可以快速搭建 RESTful API。然而，在实际使用过程中，我们可能会遇到各种配置问题。本文将记录使用 `json-server` 过程中的试错经历，以及最终的解决方案。

---

## 问题背景

在项目中，前端的接口路径通常遵循特定的命名规范，例如：

* `/api/user/register`
* `/api/user/search`
* `/api/user/delete`

然而，`json-server` 默认只会为 `db.json` 的顶层键生成路由。如果我们希望模拟这些带有 `/api/user/` 前缀的接口，就需要进行自定义路由配置。

---

## 试错过程

### 第一次尝试：在 `db.json` 中使用嵌套对象

最初，我尝试在 `db.json` 中使用嵌套对象来模拟路径结构：

```json
{
  "api": {
    "user": {
      "register": [...],
      "login": [...],
      "current": [...]
    }
  }
}
```

### 第二次尝试：在 `db.json` 的键名中使用斜杠

接下来，我尝试直接在顶层键名中使用斜杠：

```json
{
  "api/user/register": [...],
  "api/user/login": [...],
  "api/user/current": [...]
}
```

**结果** ：部分失败。启动 `json-server` 后，终端显示了正确的 Endpoints：

```powershell
Endpoints:
http://localhost:8081/api/user/register
http://localhost:8081/api/user/login
http://localhost:8081/api/user/current
```

但浏览器访问 `http://localhost:8081/api/user/current` 仍然返回 `404 Not Found`。

 **验证** ：使用 `curl` 测试 URL 编码的路径：

```powershell
curl -i 'http://localhost:8081/api%2Fuser%2Fcurrent'
```

返回 `200 OK`，说明 `json-server` 将斜杠视为特殊字符，需要进行 URL 编码才能访问。

 **原因** ：`json-server` 在处理包含斜杠的键名时，会将其视为需要 URL 编码的特殊字符，导致前端的正常请求无法匹配。

### 第三次尝试：使用 `--routes` 参数（失败）

我尝试通过 `--routes` 参数加载自定义路由配置文件 `routes.json`：

```powershell
json-server --watch db.json --routes routes.json --port 8081
```

**结果** ：失败。终端提示错误：

```powershell
Unknown option '--routes'
```

**原因** ：较新版本的 `json-server`（1.x+）已经移除了 `--routes` 参数的支持。

### 最终解决方案：降级 `json-server` 版本

在查阅资料后，我发现旧版本的 `json-server`（0.x）支持 `--routes` 参数，并且对路由配置的兼容性更好。于是我尝试降级到 `json-server@0.17.4`：

```powershell
npm uninstall -g json-server
npm install -g json-server@0.17.4
```

然后创建 `route.json` 文件

```json
{
  "/api/user/*": "/$1"
}
```

这里的 `"/$1"` 表示将 `/api/user/` 后面的路径部分映射到顶层资源。例如：

* `/api/user/register` → `/register`
* `/api/user/current` → `/current`

同时，`db.json` 的结构简化为顶层键名：

```json
{
  "register": [
    { "id": 1, "username": "user1", "password": "password1" },
    { "id": 2, "username": "user2", "password": "password2" }
  ],
  "login": [
    { "id": 1, "username": "user1", "password": "password1" }
  ],
  "current": [
    { "id": 1, "username": "user1", "email": "user1@example.com" }
  ],
  "search": [
    { "id": 2, "username": "user2", "email": "user2@example.com" },
    { "id": 3, "username": "user3", "email": "user3@example.com" }
  ],
  "delete": [
    { "id": 1, "username": "delete1", "password": "password1" }
  ]
}
```

启动命令：

```powershell
json-server --watch db.json --routes route.json --port 8081
```

或者创建 `json-server.json`文件

```json
{
  "port": 8081,
  "routes": "route.json"
}
```

```powershell
json-server -config json-server.json db.json
```
