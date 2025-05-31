+++
date = '2025-05-31T22:56:17+08:00'
draft = false
categories = ['MacOS']
tags = ['MacOS', 'Homebrew']
title = '如何在macOS上解压文件'
+++

## 引言

---

macOS 自带的 `unzip` 只能处理 `.zip` 文件，不支持 `.rar`

### Step 1. 安装 `7zip`

```bash
brew install p7zip
```

#### 📦 解压文件

```bash
7z x file.rar
```

* `x`（e**x**tract with full paths）：按照原始的路径结构解压
* 支持 `.7z`、`.zip`、`.rar`、`.tar`、`.gz` 等等

#### 📂 解压到指定目录

```bash
7z x file.rar -o./目标目录
```

#### 📁 查看压缩包内容（不解压）

```bash
7z l file.rar
```

#### 🧵 压缩文件

```bash
7z a archive.7z file1.txt folder2
```

解释：

* `a`：add，表示添加文件到压缩包中
* `archive.7z`：输出的压缩文件名
* `file1.txt folder2`：要压缩的文件和文件夹

在使用7zip解压之后, 出现如下提示:

```bash
➜  Downloads 7z x 离子注入学习资料.rar   

7-Zip [64] 17.05 : Copyright (c) 1999-2021 Igor Pavlov : 2017-08-28
p7zip Version 17.05 (locale=utf8,Utf16=on,HugeFiles=on,64 bits,10 CPUs LE)

Scanning the drive for archives:
1 file, 4223785 bytes (4125 KiB)

Extracting archive: 离子注入学习资料.rar
--
Path = 离子注入学习资料.rar
Type = Rar5
Physical Size = 4223785
Solid = -
Blocks = 3
Encrypted = -
Multivolume = -
Volumes = 1

ERROR: Unsupported Method : 离子注入操作步骤.docx
ERROR: Unsupported Method : 5 离子注入操作手册.pdf
ERROR: Unsupported Method : 6 半导体器件制造工艺-杂质掺杂.pdf

Sub items Errors: 3

Archives with Errors: 1

Sub items Errors: 3
```

意思是试图解压的 .rar 文件使用了 p7zip 不支持的压缩算法，通常出现在 .rar5 或使用了较新 WinRAR 压缩格式的文件上。

### Step 2. 使用 `unar`解压

---

macOS 下可以安装一个支持新版 `.rar5` 的轻量命令行工具 `unar`：

```bash
brew install unar
```

使用方式

```bash
unar 文件名.rar
```
