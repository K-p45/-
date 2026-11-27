---
title: 大模型API调用方式与基础实践
chapter: 第3章
type: PPT附录
up: "[[PPT-总索引]]"
---

# 大模型API调用方式与基础实践

> 第3章 · 共 31 页

返回 [[PPT-总索引]]

---


## 第 1 页

- 大模型API的调用方式

![[大模型API调用方式与基础实践/幻灯片1.PNG]]

## 第 2 页

- 学完本课程后，您将可以：
- 理解RESTful API的基本概念和HTTP协议
- 掌握大模型API的请求与响应结构
- 熟练使用Python SDK进行大模型API调用
- 掌握流式调用、异步调用等进阶技术

![[大模型API调用方式与基础实践/幻灯片2.PNG]]

## 第 3 页

- API基础
- SDK的应用实践
- 进阶调用

![[大模型API调用方式与基础实践/幻灯片3.PNG]]

## 第 4 页

- API基础
- SDK的应用实践
- 进阶调用

![[大模型API调用方式与基础实践/幻灯片4.PNG]]

## 第 5 页

- 一、RESTful API概念
- API（Application Programming Interface，应用程序编程接口）是软件之间通信的桥梁。可以把API想象成餐厅的服务员——你不需要自己走进厨房做菜，只需要告诉服务员（API）你要什么，它会帮你传达给厨房（服务端），然后把做好的菜（结果）送到你面前。

![[大模型API调用方式与基础实践/幻灯片5.PNG]]

## 第 6 页

- 二、HTTP方法与请求结构
- HTTP协议定义了几种请求方法，大模型API主要使用POST方法（因为需要发送较长的对话内容）。
- 一个完整的HTTP请求包含以下几个部分：
- 请求行：包含HTTP方法（POST）和请求路径（如/v1/chat/completions）。
- 请求头（Headers）：包含认证信息（Authorization: Bearer sk-xxx）和内容类型（Content-Type: application/json）。
- 请求体（Body）：JSON格式的数据，包含模型名称、对话消息、生成参数等。
- 服务端处理后会返回HTTP响应，包含状态码（200表示成功、401表示认证失败、429表示请求过多等）和JSON格式的响应体。

![[大模型API调用方式与基础实践/幻灯片6.PNG]]

## 第 7 页

- 三、API Key管理与安全
- API Key是访问大模型服务的身份凭证，类似于你家的钥匙。
- API Key的安全管理至关重要：

![[大模型API调用方式与基础实践/幻灯片7.PNG]]

## 第 8 页

- 四、OpenAI兼容接口标准
- OpenAI的Chat Completions API已经成为大模型行业的事实标准接口。
- 国内外主要大模型厂商（DeepSeek、通义千问、百度文心等）都提供了兼容OpenAI接口格式的服务。
- 因此学会了OpenAI的接口调用方式，基本就能调用所有主流大模型。
- 切换不同的模型提供商，只需要修改两个参数：base_url（服务地址）和api_key（认证密钥），代码的其他部分完全不用改。
- OpenAI兼容接口的核心端点是 /v1/chat/completions，它采用多轮对话的消息格式：每条消息包含一个角色（role）和内容（content）。
- 角色包括：system（系统提示）、user（用户输入）和assistant（模型回复）。

![[大模型API调用方式与基础实践/幻灯片8.PNG]]

## 第 9 页

- 五、请求/响应JSON结构详解
- 请求JSON结构的核心字段：
- 响应JSON中最关键的字段是choices[0].message.content，即模型生成的回复文本。同时usage字段会返回本次请求消耗的Token数量。
- 核心字段 |
- model | 指定要使用的模型名称，如'deepseek-chat'或'deepseek-reasoner'。
- messages | 对话消息数组，每条消息包含role和content两个字段。system消息设定模型行为，user消息是用户输入，assistant消息是模型历史回复。
- temperature | 控制生成的随机性，范围0-2。值越低输出越确定，值越高输出越多样。一般对话用0.7，代码生成用0.1。
- max_tokens | 限制单次回复的最大Token数。需要根据业务需要设置，避免过长回复浪费资源。

![[大模型API调用方式与基础实践/幻灯片9.PNG]]

## 第 10 页

- API基础
- SDK的应用实践
- 进阶调用

![[大模型API调用方式与基础实践/幻灯片10.PNG]]

## 第 11 页

- 一、常见HTTP状态码
- HTTP状态码是服务端告诉客户端请求处理结果的'信号灯'。
- 大模型API常见的状态码：
- 200 OK：请求成功，响应体中包含模型生成的内容。这是正常情况。
- 400 Bad Request：请求格式有误。常见原因：JSON格式错误、缺少必要字段、参数值超出范围（如temperature > 2）。
- 401 Unauthorized：认证失败。API Key无效、已过期或未传递。检查Authorization请求头。
- 429 Too Many Requests：请求频率超限。需要降低请求频率或升级套餐。响应头中通常会包含Retry-After字段，告诉你多久后可以重试。
- 500 Internal Server Error：服务端内部错误。通常是服务商的问题，可以稍后重试。如果持续出现，需要联系服务商排查。
- 503 Service Unavailable：服务暂时不可用。可能是服务商在维护或过载。

![[大模型API调用方式与基础实践/幻灯片11.PNG]]

## 第 12 页

- 二、Token计算与成本估算
- Token是大模型API计费和限制的基本单位。
- Token的基本概念：Token不等于字符也不等于词。对于中文，1个汉字大约对应1.5-2个Token；对于英文，1个常见单词大约对应1-2个Token。可以使用tiktoken库来精确计算Token数量。
- 成本计算公式：
- 成本 = (输入Token数 × 输入单价 + 输出Token数 × 输出单价)
- 以DeepSeek API为例：
- deepseek-chat输入：1元/100万Token；输出：2元/100万Token。
- deepseek-reasoner输入：4元/100万Token；输出：16元/100万Token。
- 一次典型的对话（输入200 Token + 输出500 Token）在deepseek-chat上的成本约为0.0012元。相比GPT-4的费用（约为DeepSeek的30倍），成本优势非常明显。

![[大模型API调用方式与基础实践/幻灯片12.PNG]]

## 第 13 页

- 三、Python openai库安装与配置
- Python的openai库是调用大模型API最方便的工具，由OpenAI官方维护，也完全兼容DeepSeek等其他大模型服务。
- 安装方式：
- pip install openai
- 基本配置只需要两行代码：
- 这个client对象就是与大模型交互的'遥控器'。base_url指向DeepSeek的服务地址，api_key是你的身份认证。如果要切换到本地部署的模型，只需要把base_url改为http://localhost:8000/v1即可。
- from openai import OpenAI
- client = OpenAI(
- base_url='https://api.deepseek.com',
- api_key='sk-your-api-key'
- )

![[大模型API调用方式与基础实践/幻灯片13.PNG]]

## 第 14 页

- 四、基本调用代码
- 最基本的API调用只需要几行代码即可完成：
- 这段代码的执行过程：Python SDK将messages和参数序列化为JSON，通过HTTP POST发送到大模型服务端，服务端生成回复后返回JSON响应，SDK将其解析为Python对象供我们使用。
- 整个过程对开发者来说是透明的，不需要手动处理HTTP请求和JSON解析，SDK帮我们完成了这些繁琐的工作。
- response = client.chat.completions.create(
- model='deepseek-chat',
- messages=[
- {'role': 'system', 'content': '你是一个有帮助的助手'},
- {'role': 'user', 'content': '请介绍一下Python语言'}
- ]
- )
- print(response.choices[0].message.content)

![[大模型API调用方式与基础实践/幻灯片14.PNG]]

## 第 15 页

- 五、核心参数详解
- chat.completions.create()方法的核心参数决定了模型的行为特征：
- 核心字段 |
- temperature（温度） | 控制输出随机性。temperature=0时模型总是选择概率最高的下一个Token，输出高度确定；temperature=1时按概率分布采样，输出更多样。实际应用中，客服场景用0.3-0.5，创意写作用0.8-1.0。
- max_tokens（最大Token数） | 限制输出长度。Token并非等于字数，中文大约1个字=1.5-2个Token。设置太小会导致回复截断，太大会浪费资源和增加延迟。
- top_p
- （核采样） | 另一种控制随机性的方式。top_p=0.9表示从累积概率前90%的Token中采样。通常和temperature二选一使用，不建议同时调整。
- stop
- （停止序列） | 指定遇到哪些文本序列后停止生成。例如stop=['\n\n']可以让模型在输出两个空行后停止。

![[大模型API调用方式与基础实践/幻灯片15.PNG]]

## 第 16 页

- 六、模型选择与切换
- 不同的大模型适合不同的任务场景。通过修改model参数即可切换模型：
- deepseek-chat：通用对话模型，适合日常问答、文本生成、摘要等任务。响应速度快，成本最低。
- deepseek-reasoner：推理增强模型（基于R1），适合数学推理、逻辑分析、复杂编程等需要深度思考的任务。会输出思维链过程。
- 切换模型提供商同样简单：
- 切换到通义千问：base_url改为'https://dashscope.aliyuncs.com/compatible-mode/v1'，model改为'qwen-plus'。
- 切换到本地vLLM服务：base_url改为'http://localhost:8000/v1'，model改为实际部署的模型名称。
- 这种统一接口的好处是：应用代码和模型选择解耦，可以根据需要灵活切换底层模型，而不影响上层业务逻辑。

![[大模型API调用方式与基础实践/幻灯片16.PNG]]

## 第 17 页

- 七、多轮对话实现
- 大模型本身是无状态的——它不记得之前的对话。多轮对话需要在每次请求时将完整的对话历史发送给模型。
- 实现思路：用一个列表维护对话历史，每次用户输入后将user消息追加到列表，收到模型回复后将assistant消息也追加到列表。
- 注意：随着对话轮次增加，messages列表会越来越长，导致Token消耗增加。实际应用中需要设计历史裁剪策略。
- messages = [{'role': 'system', 'content': '你是助手'}]
- # 第一轮对话
- messages.append({'role': 'user', 'content': '你好'})
- resp = client.chat.completions.create(
- model='deepseek-chat', messages=messages)
- assistant_msg = resp.choices[0].message.content
- messages.append({'role': 'assistant', 'content': assistant_msg})
- # 第二轮对话（自动包含了第一轮的历史）
- messages.append({'role': 'user', 'content': '你记得我说了什么吗'})
- resp = client.chat.completions.create(
- model='deepseek-chat', messages=messages)

![[大模型API调用方式与基础实践/幻灯片17.PNG]]

## 第 18 页

- 八、对话历史管理策略
- 随着对话轮次增加，messages列表不断膨胀会带来两个问题：Token消耗增加（更多的成本），以及可能超过模型的上下文窗口限制。
- 常见的历史管理策略：
- 固定窗口策略：只保留最近N轮对话历史。例如保留最近10轮，更早的对话被丢弃。实现简单但可能丢失重要的上下文信息。
- Token计数策略：统计messages的总Token数，当接近上下文窗口限制时，从最早的对话开始删除。比固定窗口更精确。
- 摘要策略：当对话过长时，使用大模型对早期对话生成摘要，用摘要替换原始对话。保留了关键信息但增加了API调用。
- System Prompt始终保留：无论使用哪种裁剪策略，第一条system消息（角色设定）都应该始终保留，不参与裁剪。

![[大模型API调用方式与基础实践/幻灯片18.PNG]]

## 第 19 页

- 九、System Prompt设计技巧
- System Prompt（系统提示词）是大模型调用中最重要的'隐形参数'。好的System Prompt可以显著提升模型的输出质量。
- 设计System Prompt的几个关键原则：
- 角色定义：明确模型应该扮演的角色。如'你是一位经验丰富的Python程序员，擅长用简单的语言解释复杂的技术概念'。
- 输出格式：明确期望的输出格式。如'请以Markdown格式输出'、'请以JSON格式返回，包含result和reason两个字段'。
- 约束条件：明确模型不应该做什么。如'不要编造不存在的API'、'如果不确定答案，请直接说不确定'。
- 示例：提供1-2个输入输出示例（Few-shot），帮助模型理解期望的行为模式。
- 一个好的System Prompt通常在100-500 Token之间。太短则信息不足，太长则浪费Token且可能稀释重点。

![[大模型API调用方式与基础实践/幻灯片19.PNG]]

## 第 20 页

- API基础
- SDK的应用实践
- 进阶调用

![[大模型API调用方式与基础实践/幻灯片20.PNG]]

## 第 21 页

- 一、流式调用
- 默认的API调用需要等模型生成完所有内容后才返回结果——如果回复很长，用户会等待很久看不到任何内容。流式调用（Streaming）可以让模型一边生成一边返回，用户可以实时看到文字逐字出现。
- 流式调用的效果类似于ChatGPT的打字机效果。实现方式很简单，只需在调用时添加stream=True参数：
- 流式调用在用户体验上有巨大优势：第一个Token通常在几百毫秒内就能返回，用户感知到的响应速度大幅提升。
- response = client.chat.completions.create(
- model='deepseek-chat',
- messages=messages,
- stream=True  # 开启流式
- )
- for chunk in response:
- if chunk.choices[0].delta.content:
- print(chunk.choices[0].delta.content, end='')

![[大模型API调用方式与基础实践/幻灯片21.PNG]]

## 第 22 页

- 一、流式调用
- 流式调用的技术原理是HTTP的Server-Sent Events（SSE）协议。服务端不是一次性返回完整响应，而是持续向客户端推送事件流。
- 每个事件（chunk）包含模型新生成的一小段文本，通常是1个Token。chunk的结构与完整响应类似，但内容在delta字段中，而非message字段。

![[大模型API调用方式与基础实践/幻灯片22.PNG]]

## 第 23 页

- 二、异步调用
- 在需要同时处理多个API请求的场景下（如批量处理、Web服务器），同步调用会导致线程阻塞。Python的异步编程模型可以解决这个问题。
- openai库提供了异步版本的客户端AsyncOpenAI：
- from openai import AsyncOpenAI
- import asyncio
- client = AsyncOpenAI(
- base_url='https://api.deepseek.com',
- api_key='sk-xxx'
- )
- async def ask(question):
- resp = await client.chat.completions.create(
- model='deepseek-chat',
- messages=[{'role': 'user', 'content': question}]
- )
- return resp.choices[0].message.content
- # 并发调用
- results = asyncio.run(asyncio.gather(
- ask('什么是AI'), ask('什么是大模型')
- ))
- 异步调用适合Web框架（如FastAPI）和批量处理场景，可以显著提升吞吐量。

![[大模型API调用方式与基础实践/幻灯片23.PNG]]

## 第 24 页

- 三、错误处理与重试机制
- 在调用API时，可能会遇到各种异常情况。良好的错误处理可以确保应用的稳定性：
- 401 Unauthorized：API Key无效或已过期。检查API Key是否正确，必要时重新生成。
- 429 Too Many Requests：请求频率超限。需要降低请求频率，或实现指数退避重试（第一次等1秒，第二次等2秒，第三次等4秒...）。
- 500 Internal Server Error：服务端内部错误。通常是临时性问题，简单重试即可。
- 超时错误：网络不稳定或模型推理时间过长。设置合理的timeout，并在超时后重试。
- openai库内置了自动重试机制（默认重试2次），也可以通过max_retries参数自定义。对于生产环境，建议配合tenacity等重试库实现更精细的重试策略。

![[大模型API调用方式与基础实践/幻灯片24.PNG]]

## 第 25 页

- 四、使用FastAPI封装中间层
- 在实际项目中，通常不会让前端直接调用大模型API，而是通过一个中间层进行转发。中间层的作用包括：统一管理API Key、添加业务逻辑、记录日志、流量控制等。
- 使用FastAPI可以快速搭建一个中间层服务：
- from fastapi import FastAPI
- from openai import OpenAI
- app = FastAPI()
- client = OpenAI(base_url='...', api_key='...')
- @app.post('/api/chat')
- async def chat(request: ChatRequest):
- response = client.chat.completions.create(
- model='deepseek-chat',
- messages=request.messages
- )
- return response.choices[0].message.content
- 通过中间层，前端只需要访问我们自己的服务地址，无需关心底层使用的是哪个模型。当需要切换模型时，只需修改中间层代码，前端完全无感。

![[大模型API调用方式与基础实践/幻灯片25.PNG]]

## 第 26 页

- 四、使用FastAPI封装中间层
- 中间层还可以实现许多增值功能，提升应用的健壮性和可维护性：
- 中间层模式是企业级大模型应用的标准架构，它在灵活性、安全性、可观测性方面都比直接调用API有显著优势。

![[大模型API调用方式与基础实践/幻灯片26.PNG]]

## 第 27 页

- 五、ngrok公网暴露
- 在开发和测试阶段，经常需要让外部服务（如Dify平台）访问本地运行的API服务。
- ngrok是一个流行的内网穿透工具，可以将本地服务暴露到公网。
- 注意事项：ngrok的免费版有带宽和连接数限制，适合开发测试；生产环境应该使用固定IP或域名，不要依赖ngrok。每次重启ngrok，公网URL会变化。
- 使用步骤：
- 安装ngrok：pip install pyngrok 或从官网下载二进制文件。
- 启动隧道：ngrok http 8000，将本地8000端口映射到一个公网URL（如https://abc123.ngrok.io）。
- 在Dify中配置：将ngrok生成的公网URL填入Dify的模型提供商配置中，作为API Base URL。

![[大模型API调用方式与基础实践/幻灯片27.PNG]]

## 第 28 页

- 六、API调用最佳实践总结
- 基于实际开发经验，API调用的最佳实践总结如下：
- 环境变量管理API Key
- 使用.env文件和python-dotenv库管理敏感配置。永远不要在代码中硬编码API Key。
- 设置合理的超时时间
- 根据业务需求设置请求超时。普通对话建议30秒，长文本生成建议60-120秒。
- 实现优雅降级
- 当API不可用时，提供友好的错误提示，而不是直接崩溃。可以切换到备用模型或返回预设回复。
- 记录API日志
- 记录每次调用的输入长度、输出长度、延迟、Token消耗和错误信息。这些数据是优化和调试的基础。
- 控制并发数量
- 避免同时发起过多API请求导致429错误。使用信号量（asyncio.Semaphore）或连接池来控制并发。

![[大模型API调用方式与基础实践/幻灯片28.PNG]]

## 第 29 页

- 总结
- 本小节系统讲解大模型API的调用方式，包括RESTful API概念、HTTP方法、API Key管理、OpenAI兼容接口标准，以及Python SDK的实践应用。
- 首先通过餐厅服务员类比介绍API的概念，说明HTTP请求结构和响应状态码含义。强调API Key安全管理的要点（环境变量、定期轮换、访问控制）。接着介绍OpenAI兼容接口已成为行业标准，核心端点是/v1/chat/completions，消息格式包含system、user、assistant角色。详细解析请求/响应JSON结构，包括model、messages、temperature、max_tokens等参数以及choices、usage等返回字段。然后讲解常见HTTP状态码和Token计算与成本估算方法，以DeepSeek为例给出费用计算。之后实践Python openai库的安装与配置，演示基本调用代码、核心参数详解、模型选择与切换、多轮对话实现、对话历史管理策略、System Prompt设计技巧。最后介绍了进阶调用：流式调用、异步调用、错误处理与重试机制、使用FastAPI封装中间层、ngrok公网暴露，并总结API调用的最佳实践。

![[大模型API调用方式与基础实践/幻灯片29.PNG]]

## 第 30 页

- 互动练习
- 【选择题】
- 在使用OpenAI兼容API时，以下哪个参数用于控制模型输出的随机性和创造性？（ ）
- A. max_tokens
- B. temperature
- C. model
- D. top_p
- 【判断题】
- 在流式调用中，服务器一次性返回完整响应，客户端需等待所有内容生成完毕才能看到结果。（ ）

![[大模型API调用方式与基础实践/幻灯片30.PNG]]

## 第 31 页

_（本页为纯图片）_

![[大模型API调用方式与基础实践/幻灯片31.PNG]]