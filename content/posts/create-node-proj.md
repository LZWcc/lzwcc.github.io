+++
date = '2025-11-07T18:14:26+08:00'
draft = false
title = 'Node + Typescript项目初始化'
+++

```bash
pnpm init
pnpm add -D typescript ts-node @types/node
pnpm exec tsc --init
```

`package.json`

```json
"type": "module",
```

生成 `tsconfig.json` 文件

```json
{
  "compilerOptions": {
    // 启用以下选项以允许导入带有扩展名的 TypeScript 文件
    "noEmit": true,
    "allowImportingTsExtensions": true,
  }
}

```

运行程序 `index.ts`

```bash
pnpm exec ts-node src/index.ts
```
