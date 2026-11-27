---
title: 项目三 后端 API
stage: 3
tags:
  - Node.js
  - Express
  - API
  - 事务
up: "[[00-总览-MOC]]"
prev: "[[03-前端Uni-app]]"
next: "[[05-联调部署与交付]]"
---

# 项目三 · 后端：Express API 开发

> **一句话**：Node.js 的非阻塞 I/O 让它在**I/O 密集型**后端上很能打。
> 这一讲把事件循环、中间件、事务、防注入这几个后端基本功讲透了。

⬅️ [[03-前端Uni-app]] ｜ [[00-总览-MOC]] ｜ [[05-联调部署与交付]] ➡️

> 📎 完整课件：[[03-核心业务模块开发—电商后端 API 开发与 Node.js 工程理论]]

---

## 🎬 一、Node.js 为什么适合做后端

![[1008-Node与事务.mp4]]

### 同步阻塞 vs 非阻塞 I/O

| | 同步阻塞模型 | Node.js 非阻塞 |
|---|---|---|
| 处理方式 | **串行**：等数据库返回时 CPU 空闲 | **并行**：等待期间处理其他请求 |
| 并发能力 | 受线程/进程数限制 | **单进程可处理大量并发** |
| 代码写法 | 同步顺序执行 | 回调 / Promise / async-await |

```text
同步模型：请求A → [等数据库 100ms，CPU 空闲] → 响应A → 请求B
Node.js：请求A → [发起查询，不等] → 请求B → 请求C
              ← [数据库回来了，事件循环通知] → 响应A
```

> 🎯 **关键认知**：Node.js 强在 **I/O 密集型**（大量数据库查询、网络请求），
> 不强在 CPU 密集型（视频转码、大量计算）。
> **电商后端恰恰是典型的 I/O 密集型。**

### async/await 解决了什么

**回调金字塔**：
```js
查用户(u => {
  查商品(g => {
    插订单(o => {
      // ...越嵌越深
    })
  })
})
```

**async/await**：
```js
const user = await queryUser()
const goods = await queryGoods()
const order = await insertOrder()
```

> 同样的非阻塞，但**代码是线性的、可读的**。

---

## 🎬 二、Express 工程骨架

### 四个固定步骤

| 步骤 | 代码 | 作用 |
|---|---|---|
| 1. 创建实例 | `const app = express()` | 生成应用对象 |
| 2. **挂载中间件** | `app.use(express.json())` | 为所有请求加预处理 |
| 3. 定义路由 | `app.get('/api/products', ...)` | 处理业务请求 |
| 4. 启动服务 | `app.listen(PORT)` | 监听端口 |

### 中间件：app.use() 是一条管道 ⭐

> 每个请求按**注册顺序**依次经过中间件，最后才到匹配的路由。

```text
请求 → [express.json()] → [cors()] → [路由] → 响应
        解析 req.body      加跨域头
```

> ⚠️ **顺序极其重要**：
> 如果把 `express.json()` 注册在路由**之后**或漏注册，
> 路由里读 `req.body` 会得到 **undefined**。

### 三个核心依赖

| 依赖 | 作用 |
|---|---|
| **express** | Web 框架：路由、中间件、请求响应 |
| **mysql2** | MySQL 驱动，支持 Promise 与连接池 |
| **dotenv** | 环境变量，把密码从代码里分离 |
| cors（可选） | 跨域，**仅开发期用**；生产用 Nginx 同源 |

> 💡 **为什么 mysql2 而不是 mysql**：支持 Promise（能 await）和连接池，性能更好。

### dependencies vs devDependencies

| | 内容 | 安装 | 生产运行 |
|---|---|---|---|
| **dependencies** | express、mysql2、dotenv | `npm install x` | ✅ 需要 |
| **devDependencies** | nodemon | `npm install --save-dev x` | ❌ 不需要 |

> 💡 **分开的价值**：生产环境只装必需依赖，**减少部署体积和安全风险**。

### start vs dev

| 脚本 | 命令 | 用途 |
|---|---|---|
| start | `node app.js` | 生产 |
| dev | `nodemon app.js` | 开发，改代码**自动重启** |

### 启动报错速查表 ⭐

| 现象 | 排查方向 |
|---|---|
| 服务无法启动 | 语法错误：少逗号、括号不匹配 |
| `EADDRINUSE :::3000` | **端口被占用**，换端口或杀掉旧进程 |
| 数据库连接失败 | `.env` 密码、MySQL 是否启动 |
| 跨域错误 | 检查 `app.use(cors())` 是否漏加 |

---

## 🎬 三、三个安全与工程要点

### ① 环境变量 .env（安全底线）

**问题**：数据库密码写进 `db.js`，一旦提交到 Git，**密码就公开了**。

```bash
# .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=xxxxx
DB_NAME=ecommerce_db
```

```js
require('dotenv').config()
```

> ⚠️ **`.env` 必须写进 `.gitignore`**。

### ② 数据库连接池

**问题**：每个请求都新建一次数据库连接 → 建连开销巨大（TCP 握手 + 认证）。

**解法**：启动时建好一批连接，请求来了**复用**。

> 💡 连接是稀缺资源，数据库能同时接受的连接数有限。**连接池是后端的标配。**

### ③ 事务：订单创建的原子性 ⭐

**为什么需要**：下单要同时做三件事 ——

```text
1. orders 表 ──────── 插入订单
2. order_items 表 ─── 插入商品明细
3. products 表 ────── 扣减库存
```

> **如果插入订单成功、扣库存失败** → 数据库里出现"有订单但库存没减"的脏数据。

**事务三件套**：

| 操作 | 作用 |
|---|---|
| `beginTransaction()` | 开启事务 |
| `commit()` | **全部成功**才提交 |
| `rollback()` | **任何一步失败**就全部撤销 |

```js
const conn = await pool.getConnection()
try {
  await conn.beginTransaction()
  await conn.query('INSERT INTO orders ...')
  await conn.query('INSERT INTO order_items ...')
  await conn.query('UPDATE products SET stock = stock - ? WHERE ...')
  await conn.commit()
} catch (e) {
  await conn.rollback()      // ← 关键
  throw e
} finally {
  conn.release()
}
```

> 🎯 **原子性的含义**：**要么全成功，要么全失败，没有中间状态。**
> 这是电商系统最关键的一个保障 —— 订单和库存绝不能不一致。

### ④ 防 SQL 注入：参数化查询

**错误写法**（字符串拼接）：
```js
`SELECT * FROM users WHERE phone = '${phone}'`
// 用户输入 ' OR '1'='1 就能绕过验证
```

**正确写法**（参数化）：
```js
conn.query('SELECT * FROM users WHERE phone = ?', [phone])
```

> 🎯 **原理**：参数化查询把 SQL 语句和参数**分开传输**，
> 数据库先把语句编译好，参数永远被当作**数据**而不是**代码**。

### 两道防线：应用层 + 数据库层

| 层 | 做什么 |
|---|---|
| **应用层** | 参数校验（非空、格式、长度）、参数化查询 |
| **数据库层** | NOT NULL、UNIQUE、ENUM、外键约束 |

> 🎯 **两层都要有，不能只靠一层**：
> 应用层能给出友好提示，数据库层是**最后兜底** —— 即使代码有 bug，脏数据也进不去。

---

## 📌 本章速记

| 要点 | 记忆锚点 |
|---|---|
| Node.js 定位 | 非阻塞 I/O，适合 I/O 密集型 |
| 中间件 | app.use 是管道，**顺序决定行为** |
| req.body 为 undefined | express.json() 没挂或挂晚了 |
| devDependencies | 生产不装，减小体积 |
| 连接池 | 复用连接，避免每请求新建 |
| 事务 | begin / commit / rollback |
| 防注入 | 参数化查询，别拼字符串 |
| 两道防线 | 应用层校验 + 数据库层约束 |

---

## 🔗 相关

- 上一阶段：[[03-前端Uni-app]]
- 下一阶段：[[05-联调部署与交付]] —— 联调与部署
- 表结构设计：[[02-数据库设计]]
- 完整课件：[[03-核心业务模块开发—电商后端 API 开发与 Node.js 工程理论]]

---

## ❓ 自测

1. Node.js 为什么适合做电商后端？
2. 为什么 `express.json()` 必须注册在路由之前？
3. 数据库连接池解决什么问题？
4. 订单创建为什么必须用事务？
5. 参数化查询为什么能防 SQL 注入？
6. 什么是"两道防线"？

<details>
<summary>参考答案</summary>

1. 电商后端是典型的 I/O 密集型（大量数据库查询），Node.js 的非阻塞 I/O 能在等待期间处理其他请求，单进程支撑高并发。
2. 因为它的作用是把 JSON 请求体解析后挂到 req.body 上，如果注册在路由之后或漏注册，路由里读 req.body 就是 undefined。
3. 避免每个请求都新建数据库连接（建连有 TCP 握手和认证开销），复用已有连接提升性能。
4. 因为下单要同时插入订单、插入明细、扣减库存三步，任何一步失败都会造成数据不一致，事务保证要么全成功要么全回滚。
5. 参数化查询把 SQL 语句和参数分开传输，数据库先把语句编译好，参数永远被当作数据而非可执行的代码。
6. 应用层做参数校验和参数化查询给出友好提示，数据库层用 NOT NULL/UNIQUE/ENUM/外键做最后兜底。
</details>

---
*课件：`PPT/03-核心业务模块开发—电商后端 API 开发与 Node.js 工程理论.md`*
