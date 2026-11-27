---
title: Dify平台简介
chapter: 第8章
type: PPT附录
up: "[[PPT-总索引]]"
---

# Dify平台简介

> 第8章 · 共 37 页

返回 [[PPT-总索引]]

---


## 第 1 页

_（本页为纯图片）_

![[Dify平台简介/幻灯片1.PNG]]

## 第 2 页

- DeepSeek技术理论

![[Dify平台简介/幻灯片2.PNG]]

## 第 3 页

- 学完本课程后，您将可以：
- 熟悉Dify平台的概念
- 掌握Dify的优势
- 熟悉Dify私有化部署的方法
- 掌握Dify私有化部署的过程

![[Dify平台简介/幻灯片3.PNG]]

## 第 4 页

- Dify平台简介
- Dify平台私有化部署

![[Dify平台简介/幻灯片4.PNG]]

## 第 5 页

- Dify平台简介
- Dify平台私有化部署

![[Dify平台简介/幻灯片5.PNG]]

## 第 6 页

- 一、Dify平台介绍

![[Dify平台简介/幻灯片6.PNG]]

## 第 7 页

- 一、Dify平台介绍

![[Dify平台简介/幻灯片7.PNG]]

## 第 8 页

- 二、Dify的优势
- 在使⽤ LLMOps 平台如 Dify 之前，基于 LLM 开发应⽤的过程可能会⾮常繁琐和耗时。开发者需要⾃⾏处理各个阶段的任务，这可能导致效率低下、难以扩展和安全性问题 。
- 1. 数据准备：⼿动收集和预处理数据，可能涉及到复杂的数据清洗和标注⼯作，需要编写较多代码。
- 2. Prompt Engineering：缺乏实时反馈和可视化调试。
- 3. 嵌⼊和上下⽂管理：⼿动处理⻓上下⽂的嵌⼊和存储，难以优化和扩展，需要不少编程⼯作，熟悉模型嵌⼊和向量数据库等技术。
- 4. 应⽤监控与维护：需要⼿动收集和分析性能数据，可能⽆法实时发现和处理问题。
- 5. 模型微调：⾃⾏处理微调数据准备和训练过程，可能导致效率低下，需要编写更多代码。
- 6. 系统和运营：需要技术⼈员参与或花费成本开发管理后台，增加开发和维护成本，缺乏多⼈协同和对⾮技术⼈员的友好⽀持。

![[Dify平台简介/幻灯片8.PNG]]

## 第 9 页

- 二、Dify的优势
- 引⼊ Dify 这样LLMOps 平台后，基于 LLM 开发应⽤的过程将变得更加安全、⾼效，使⽤ 像 Dify 这样的 LLMOps 进⾏应⽤开发的优势体现在以下⼏个⽅⾯：
- 数据准备
- 平台提供数据收集和预处理⼯具，简化了数据清洗和标注的⼯作，最⼩化甚⾄消除了编码⼯作。
- Prompt Engineering
- 所⻅即所得的 Prompt 编辑和调试，可根据⽤户输⼊的数据进⾏实时优化和调整。
- 嵌⼊和上下⽂管理
- ⾃动处理⻓上下⽂的嵌⼊、存储和管理，提⾼效率和扩展性，⽆需编写⼤量代码。

![[Dify平台简介/幻灯片9.PNG]]

## 第 10 页

- 二、Dify的优势
- 应⽤监控与维护
- 实时监控性能数据，快速发现和处理问题，确保应⽤程序的稳定运 ⾏，提供完整的⽇志记录。
- 微调数据准备
- 提供⼈⼯标注数据集的批量导出，在应⽤运营过程中收集线上反馈数据 持续改善模型效果。
- 系统和运营
- 易⽤的界⾯，⾮技术⼈员也可参与，⽀持多⼈协同，降低开发和维护成本。
- 与传统开发⽅式相⽐，Dify 提供了更加透明和易于监控的应⽤管理，让团队成员更好地了解应⽤的运⾏情况。

![[Dify平台简介/幻灯片10.PNG]]

## 第 11 页

- 二、Dify的优势
- 使用Dify和不使用Dify的开发差别

![[Dify平台简介/幻灯片11.PNG]]

## 第 12 页

- Dify平台简介
- Dify平台私有化部署

![[Dify平台简介/幻灯片12.PNG]]

## 第 13 页

- 一、Dify私有化部署方案设计

![[Dify平台简介/幻灯片13.PNG]]

## 第 14 页

- 二、租赁云平台
- 1. 选择服务器

![[Dify平台简介/幻灯片14.PNG]]

## 第 15 页

- 二、租赁云平台
- 2. 选择环境

![[Dify平台简介/幻灯片15.PNG]]

## 第 16 页

- 二、租赁云平台
- 3. 创建服务器

![[Dify平台简介/幻灯片16.PNG]]

## 第 17 页

- 二、租赁云平台
- 4. 进入服务器

![[Dify平台简介/幻灯片17.PNG]]

## 第 18 页

- 二、租赁云平台
- 4. 进入服务器

![[Dify平台简介/幻灯片18.PNG]]

## 第 19 页

- 二、租赁云平台
- 5. 开启资源加速

![[Dify平台简介/幻灯片19.PNG]]

## 第 20 页

- 三、部署Docker
- sudo apt-get update
- #这个步骤可以不做
- sudo apt-get install ca-certificates curl
- sudo install -m 0755 -d /etc/apt/keyrings
- #如果网络不好，这个文件用手动的方式下载，然后把文件改名叫docker.asc即可
- sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
- sudo chmod a+r /etc/apt/keyrings/docker.asc
- #将Docker的APT仓库添加到Ubuntu系统的APT源列表中，
- #以便后续可以通过APT包管理器安装Docker相关的软件包
- # Add the repository to Apt sources:
- echo \

![[Dify平台简介/幻灯片20.PNG]]

## 第 21 页

- 三、部署Docker
- "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
- $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
- sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
- sudo apt-get update
- # 安装Docker 建议开启学术资源加载
- sudo apt-get install docker-ce docker-ce-cli containerd.io
- # 启动Docker服务
- sudo systemctl start docker
- sudo systemctl status docker

![[Dify平台简介/幻灯片21.PNG]]

## 第 22 页

- 三、部署Docker
- 看到running状态说明docker已经正常启动

![[Dify平台简介/幻灯片22.PNG]]

## 第 23 页

- 四、部署Dify
- git clone https://github.com/langgenius/dify.git
- cd dify
- cd docker
- cp .env.example .env
- vi .env
- docker compose up -d

![[Dify平台简介/幻灯片23.PNG]]

## 第 24 页

- 四、部署Dify
- 1. 下载源码
- (py38) root@vmInstances2of4har:/data/dify# git clone https://github.com/langgenius/dify.git
- Cloning into 'dify'...
- remote: Enumerating objects: 108028, done.
- remote: Counting objects: 100% (11847/11847), done.
- remote: Compressing objects: 100% (386/386), done.
- remote: Total 108028 (delta 11630), reused 11474 (delta 11461), pack-reused 96181 (from 1)
- Receiving objects: 100% (108028/108028), 55.72 MiB | 16.76 MiB/s, done.
- Resolving deltas: 100% (78103/78103), done.
- (py38) root@vmInstances2of4har:/data/dify#

![[Dify平台简介/幻灯片24.PNG]]

## 第 25 页

- 四、部署Dify
- 1. 下载源码

![[Dify平台简介/幻灯片25.PNG]]

## 第 26 页

- 四、部署Dify
- 2. 修改Dify端口号
- cd dify
- cd docker
- cp .env.example .env
- vi .env
- ## 把端口号修改8890

![[Dify平台简介/幻灯片26.PNG]]

## 第 27 页

- 四、部署Dify

![[Dify平台简介/幻灯片27.PNG]]

## 第 28 页

- 四、部署Dify
- 3. 使用docker启动Dify
- docker compose up -d
- 发现执行错误

![[Dify平台简介/幻灯片28.PNG]]

## 第 29 页

- 四、部署Dify
- 修改方式：
- 进入/etc/docker/daemon.json文件
- 然后在里面加入下面的配置
- #文件有缩进识别,格式要排列准确
- {
- "registry-mirrors": [
- "https://docker.registry.cyou",
- "https://docker-cf.registry.cyou",
- "https://dockercf.jsdelivr.fyi",
- "https://docker.jsdelivr.fyi",
- "https://dockertest.jsdelivr.fyi",
- "https://mirror.aliyuncs.com",
- "https://dockerproxy.com",
- "https://mirror.baidubce.com",
- "https://docker.m.daocloud.io",
- "https://docker.nju.edu.cn",

![[Dify平台简介/幻灯片29.PNG]]

## 第 30 页

- 四、部署Dify
- 修改方式：
- 进入/etc/docker/daemon.json文件
- 然后在里面加入下面的配置
- "https://docker.mirrors.sjtug.sjtu.edu.cn",
- "https://docker.mirrors.ustc.edu.cn",
- "https://mirror.iscas.ac.cn",
- "https://docker.rainbond.cc",
- ]
- }
- #然后在终端重新启动一下docker
- systemctl daemon-reload
- systemctl restart docker

![[Dify平台简介/幻灯片30.PNG]]

## 第 31 页

- 四、部署Dify
- 如果上面的源不行了，重新再换一个源，大家也可以自己找哈。
- "https://docker.unsee.tech",
- "https://dockerpull.org",
- "https://docker.1panel.live",
- "https://dockerhub.icu",
- "https://docker.m.daocloud.io",
- "https://docker.nju.edu.cn",
- "https://registry.docker-cn.com",
- "https://docker.mirrors.ustc.edu.cn",
- "https://hub-mirror.c.163.com",
- "https://mirror.baidubce.com",
- "https://5tqw56kt.mirror.aliyuncs.com",
- "https://docker.hpcloud.cloud",
- "http://mirrors.ustc.edu.cn",
- "https://docker.chenby.cn",
- "https://docker.ckyl.me",
- "http://mirror.azure.cn",
- "https://hub.rat.dev"

![[Dify平台简介/幻灯片31.PNG]]

## 第 32 页

- 四、部署Dify
- 修改完了以后重新执行命令：docker compose up -d
- 经过漫长的二十分钟，终于启动好了

![[Dify平台简介/幻灯片32.PNG]]

## 第 33 页

- 四、部署Dify
- 4. 在本地访问Dify
- 因为我们用的是云平台，所以我们需要根据映射的端口来访问Dify的服务

![[Dify平台简介/幻灯片33.PNG]]

## 第 34 页

- 四、部署Dify
- 故，我们可以通过：http://140.210.92.252:33366 访问Dify

![[Dify平台简介/幻灯片34.PNG]]

## 第 35 页

- 总结
- 本小节全面介绍Dify平台的概念、优势及私有化部署方法。
- 首先定义Dify是一个开源的LLM应用开发平台，支持可视化工作流构建、多模型兼容、全流程RAG等能力。对比传统LLM应用开发的痛点（数据准备繁琐、Prompt工程调试困难、上下文管理复杂、监控缺失等），突出Dify的优势：所见即所得的Prompt编辑、自动处理嵌入和上下文管理、实时监控、微调数据准备、多用户协同等。通过使用Dify和不使用Dify的对比，说明平台带来的效率提升。然后详细讲解Dify私有化部署方案：租赁云服务器（选择配置）、部署Docker环境、配置镜像源、使用docker compose启动Dify服务。
- 最后给出了本地访问示例，并演示如何修改端口号、解决镜像拉取错误等常见问题。Dify的私有化部署保证了数据安全，适合企业内使用。

![[Dify平台简介/幻灯片35.PNG]]

## 第 36 页

- 互动练习
- 【选择题】
- Dify平台的核心功能不包括以下哪项？（ ）
- A. 可视化工作流编排
- B. 模型微调训练
- C. RAG知识库集成
- D. 多模型兼容
- 【判断题】
- Dify平台只能通过云端SaaS方式使用，不支持私有化部署。（ ）

![[Dify平台简介/幻灯片36.PNG]]

## 第 37 页

_（本页为纯图片）_

![[Dify平台简介/幻灯片37.PNG]]