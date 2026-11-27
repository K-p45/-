---
title: Docker基础理论
chapter: 第2章
type: PPT附录
up: "[[PPT-总索引]]"
---

# Docker基础理论

> 第2章 · 共 30 页

返回 [[PPT-总索引]]

---


## 第 1 页

- Docker基础理论

![[Docker基础理论/幻灯片1.PNG]]

## 第 2 页

- 学完本课程后，您将可以：
- 熟悉Docker的基本概念与优点
- 掌握Docker的基本命令
- 熟悉Docker Desktop的基本概念
- 掌握Docker 镜像的概念
- 熟悉Docker 容器的概念

![[Docker基础理论/幻灯片2.PNG]]

## 第 3 页

- Docker概述
- Docker Desktop介绍

![[Docker基础理论/幻灯片3.PNG]]

## 第 4 页

- Docker概述
- Docker Desktop介绍

![[Docker基础理论/幻灯片4.PNG]]

## 第 5 页

- 一、Docker的基本概念
- Docker 是一个开源的平台，它可以使软件开发和部署变得更加简便和高效。通过使用 Docker，开发者可以将应用程序及其所有依赖项打包到一个被称为“容器”的轻量级、可移植的、自给自足的单元中。这样，无论在哪种操作系统或环境下，这个容器都能保证以相同的方式运行。

![[Docker基础理论/幻灯片5.PNG]]

## 第 6 页

- 一、Docker的基本概念

![[Docker基础理论/幻灯片6.PNG]]

## 第 7 页

- 二、Docker的优点

![[Docker基础理论/幻灯片7.PNG]]

## 第 8 页

- 三、基本命令
- 1. 安装 Docker
- a.  官方教程
- ▪  参考Docker 官方安装指南。
- •  windows：Windows | Docker Docs
- •  macOS：Mac | Docker Docs
- •  Linux：Linux | Docker Docs
- b. 命令行方式安装
- ▪  docker安装手册
- ▪  docker-compose安装手册

![[Docker基础理论/幻灯片8.PNG]]

## 第 9 页

- 三、基本命令
- c.  下载Docker桌面程序（桌面程序一般自带docker-compose）✅
- ▪  下载Docker desktop
- ▪  然后下一步下一步就安装好了 ，如果拉取镜像比较慢 ，可以更改为国内镜像地址检查是否安装成功 ，安装正常会打印日志。
- 1   docker -v
- 2  docker-compose -v

![[Docker基础理论/幻灯片9.PNG]]

## 第 10 页

- 三、基本命令
- 修改镜像源
- 在docker设置->docker引擎->配置文件中增加镜像源

![[Docker基础理论/幻灯片10.PNG]]

## 第 11 页

- 三、基本命令
- 1  {
- 2     "builder": {
- 3      "gc": {
- 4         "defaultKeepStorage": "20GB",
- 5         "enabled": true
- 6      }
- 7    },
- 8     "experimental": false,
- 9     "registry-mirrors": [
- 10         "https://hub.rat.dev",
- 11         "https://dockerpull.org/",
- 12         "https://mirror.azure.cn/"
- 13    ]
- 14  }
- 配置完成后点击左下角的重启

![[Docker基础理论/幻灯片11.PNG]]

## 第 12 页

- 三、基本命令
- 2. 运行第一个容器
- 1  docker run hello-world
- 这条命令会下载一个hello-world 镜像并运行它。

![[Docker基础理论/幻灯片12.PNG]]

## 第 13 页

- 三、基本命令
- 3. 查看运行的容器
- 这条命令会列出所有正在运行的容器。
- 4. 停止容器
- 替换  [容器ID] 为  docker ps 命令中显⽰的实际容器 ID。
- 1   docker ps
- 1  docker stop [容器ID]

![[Docker基础理论/幻灯片13.PNG]]

## 第 14 页

- 三、基本命令
- 5. 删除容器
- 删除指定的容器。
- 6.构建镜像
- 创建一个名为  Docker file 的文件 ，然后运行：
- 这条命令会根据  Docker file 构建一个名为  myimage 的镜像。
- 1   docker rm [容器ID]
- 1  docker build -t myimage .

![[Docker基础理论/幻灯片14.PNG]]

## 第 15 页

- Docker概述
- Docker Desktop介绍

![[Docker基础理论/幻灯片15.PNG]]

## 第 16 页

- 一、什么是Docker Desktop
- Docker Desktop 是 Docker 官方提供的桌面版应用程序 ，它允许用户在 Windows 和 Mac 上轻松地使用 Docker。 以下是 Docker Desktop 的一些主要特点和功能：
- 1. 简单易用：Docker Desktop 提供了一个图形用户界面 ，使得管理容器变得非常简单。用户可以通过点击几个按钮来创建、启动和停止容器。
- 2. 集成开发环境：Docker Desktop 可以与 IDE（如 Visual Studio Code）集成 ，可以直接在 IDE 中构建和运行容器。
- 3. 支持多种操作系统：Docker Desktop 支持 Mac 和 Windows 两种操作系统。

![[Docker基础理论/幻灯片16.PNG]]

## 第 17 页

- 一、什么是Docker Desktop
- 4.  支持多种应用 ： Docker Desktop 支持运行各种应用 ，包括 Web 应用 、数据库、后台服务等。
- 5.  自动更新： Docker Desktop 会自动检查并安装更新。
- 6.  Docker Engine： Docker Desktop 包括 Docker Engine ，这是 Docker 的核心组件 ，负责容器的创建、运行和网络管理。
- 7.  Docker Compose： Docker Desktop 提供了 Docker Compose ，这是一个用于定义和运行多容器Docker 应用程序的工具。通过一个 YAML 文件 ，可以配置应用程序的服务 ，然后使用一个命令来启动和停止它们。

![[Docker基础理论/幻灯片17.PNG]]

## 第 18 页

- 一、什么是Docker Desktop
- 8.  Docker Build： Docker Desktop 提供了一个简化的容器构建工具 ，允许将代码打包并构建成可以在任何地方运行的容器镜像。
- 9.  Docker Debug：提供了高级的故障排除工具 ，用于诊断和解决容器和镜像中的问题。
- 10.  Docker Private Extensions Marketplace：提供了一个定制扩展的市场 ，允许你根据特定需求定制和增强你的 Docker 环境。

![[Docker基础理论/幻灯片18.PNG]]

## 第 19 页

- 一、什么是Docker Desktop
- Docker Desktop 是一个强大的工具 ，它通过提供用户友好的界面和集成开发工具 ，简化了容器的管理和运行 ，从而提高了开发人员的生产力和效率。

![[Docker基础理论/幻灯片19.PNG]]

## 第 20 页

- 二、Docker 镜像
- Docker 镜像是一个轻量级、可执行的软件包 ，包含了运行一个容器所需的所有内容：代码、运行时、库、环境变量和配置文件。
- 镜像具有以下特点：

![[Docker基础理论/幻灯片20.PNG]]

## 第 21 页

- 二、Docker 镜像

![[Docker基础理论/幻灯片21.PNG]]

## 第 22 页

- 二、Docker 镜像
- 创建 Docker 镜像的常见步骤包括：
- •  使用  docker build 命令根据 Dockerfile 创建镜像。
- •  使用  docker pull 从 Docker Hub 或其他仓库拉取现成的镜像。
- •  使用   docker tag 给镜像打上标签 ，以便识别和分发。
- •  使用  docker push 将镜像推送到远程仓库。
- Docker 镜像是 Docker 容器化平台的基石 ，它们使得应用程序的部署、分发和运行变得更加容易和可靠。

![[Docker基础理论/幻灯片22.PNG]]

## 第 23 页

- 三、Docker 容器

![[Docker基础理论/幻灯片23.PNG]]

## 第 24 页

- 三、Docker 容器
- Docker 容器是 Docker 镜像的运行实例。 当启动一个 Docker 镜像时 ，Docker 创建一个容器 ，并在隔离的环境中运行应用程序或服务。
- 以下是 Docker 容器的一些基本特点：

![[Docker基础理论/幻灯片24.PNG]]

## 第 25 页

- 三、Docker 容器

![[Docker基础理论/幻灯片25.PNG]]

## 第 26 页

- 三、Docker 容器

![[Docker基础理论/幻灯片26.PNG]]

## 第 27 页

- 三、Docker 容器
- 创建和运行 Docker 容器的基本命令包括：
- Docker 容器是 Docker 核心功能的一部分 ，它们使得应用程序的部署和扩展变得简单、灵活和可靠。
- •  使用 | docker run 命令从镜像创建并启动一个新容器。
- •  使用 | docker start 命令启动一个已经停止的容器。
- •  使用 | docker stop 命令停止一个运行中的容器。
- •  使用 | docker restart 命令重启一个容器。
- •  使用 | docker rm 命令删除一个容器。
- •  使用 | docker ps 命令列出当前运行的容器。
- •  使用 | docker logs 命令查看容器的输出日志。

![[Docker基础理论/幻灯片27.PNG]]

## 第 28 页

- 总结
- 本小节系统讲解Docker的基本概念、优点、核心命令以及Docker Desktop的使用。
- 首先介绍Docker是一个开源容器化平台，可将应用及其依赖打包成轻量级、可移植的容器，实现“一次构建，随处运行”。相比虚拟机，Docker容器共享主机内核，启动快、资源占用小。接着通过命令演示安装Docker、配置国内镜像源、运行第一个hello-world容器、查看/停止/删除容器以及构建镜像。然后重点介绍Docker Desktop的特点，包括图形化管理、集成开发环境、支持多操作系统、自动更新、内置Docker Engine和Compose等。
- 最后讲解了Docker镜像的概念，镜像由多层只读层组成，通过Dockerfile构建；容器是镜像的运行实例，具有隔离性、可移植性。通过基本命令创建和管理容器，理解容器的生命周期等。

![[Docker基础理论/幻灯片28.PNG]]

## 第 29 页

- 互动练习
- 【选择题】
- 以下关于Docker容器与虚拟机的区别，描述正确的是（ ）
- A. 容器与虚拟机一样，每个都拥有独立的内核
- B. 容器共享宿主机的内核，虚拟机则各自包含完整的操作系统
- C. 容器比虚拟机占用更多内存
- D. 容器无法实现环境隔离
- 【判断题】
- Docker镜像是一个只读模板，容器是镜像的运行实例，可以启动、停止、删除。（ ）

![[Docker基础理论/幻灯片29.PNG]]

## 第 30 页

_（本页为纯图片）_

![[Docker基础理论/幻灯片30.PNG]]