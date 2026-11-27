---
title: Function Calling基础理论
chapter: 第6章
type: PPT附录
up: "[[PPT-总索引]]"
---

# Function Calling基础理论

> 第6章 · 共 21 页

返回 [[PPT-总索引]]

---


## 第 1 页

- Function Calling基础理论

![[Function Calling基础理论/幻灯片1.PNG]]

## 第 2 页

- 学完本课程后，您将可以：
- 熟悉Function Calling 的概念
- 掌握Function Calling 的流程结构
- 熟悉Function Calling 调用本地函数的方法

![[Function Calling基础理论/幻灯片2.PNG]]

## 第 3 页

- Function Calling 介绍
- DeepSeek技术

![[Function Calling基础理论/幻灯片3.PNG]]

## 第 4 页

- Function Calling 概述
- Function Calling 调用本地函数

![[Function Calling基础理论/幻灯片4.PNG]]

## 第 5 页

- 一、Function Calling 介绍
- 大语言模型，例如 DeepSeek，拥有强大的知识储备和语言理解能力，能够进行流畅的对话、创作精彩的故事，甚至编写代码。然而，它们也面临着—些难以克服的困境，就像—个空有知识却无法行动的巨人。

![[Function Calling基础理论/幻灯片5.PNG]]

## 第 6 页

- 一、Function Calling 介绍
- 大模型的三大缺陷：

![[Function Calling基础理论/幻灯片6.PNG]]

## 第 7 页

- 一、Function Calling 介绍

![[Function Calling基础理论/幻灯片7.PNG]]

## 第 8 页

- 二、Function Calling 完整的流程结构

![[Function Calling基础理论/幻灯片8.PNG]]

## 第 9 页

- 二、Function Calling 完整的流程结构

![[Function Calling基础理论/幻灯片9.PNG]]

## 第 10 页

- 二、Function Calling 完整的流程结构
- Function Calling 可以被应用于各种场景，例如：

![[Function Calling基础理论/幻灯片10.PNG]]

## 第 11 页

- Function Calling 概述
- Function Calling 调用本地函数

![[Function Calling基础理论/幻灯片11.PNG]]

## 第 12 页

- 一、JSON Schema
- 定义一个自定义的本地函数，也可以是现有的库中的函数以Python内置的sum函数为例，假设我们想让大模型使用这个函数。接下来看看这个Function Calling怎么来实现。

![[Function Calling基础理论/幻灯片12.PNG]]

## 第 13 页

- 二、Function Calling调用本地函数
- from openai import OpenAI import os
- import json
- from dotenv import load_dotenv load_dotenv()
- client = OpenAI()
- # 告诉大模型这个函数的存在
- def get_completion(messages, model="gpt-4"):
- response = client.chat.completions.create(
- model=model,
- messages=messages,
- temperature=0,
- max_tokens=1024,
- tools=[

![[Function Calling基础理论/幻灯片13.PNG]]

## 第 14 页

- 二、Function Calling调用本地函数
- {  # 用 JSON 描述函数。可以定义多个。由大模型决定调用谁"type": "function",
- "function": {
- "name": "sum_number",
- "description": "计算一组数的和",
- "parameters": {
- "type": "object",
- "properties": { "numbers": {
- "type": "array",
- "items": {
- "type": "number" }
- }
- }
- }
- }
- },
- ]
- )
- return response.choices[0].message

![[Function Calling基础理论/幻灯片14.PNG]]

## 第 15 页

- 二、Function Calling调用本地函数
- # 给一个需要使用该函数的Prompt
- prompt = "我今年18岁，我的舅舅今年38岁，我的爷爷今年72岁，我和舅舅一共多少岁了？"
- #prompt = "30*8等多少？"
- messages = [
- {"role": "system", "content": "你是一个数学家，你可以计算任何算式。"},
- {"role": "user", "content": prompt} ]
- response = get_completion(messages)
- messages.append(response)  # 注意这一句，必须加入到上下文中，否则报错print("=====GPT回复=====")
- print(response)

![[Function Calling基础理论/幻灯片15.PNG]]

## 第 16 页

- 二、Function Calling调用本地函数
- # 解析函数名称和参数
- # 当大模型返回了需要调用的名称和参数之后，我们可以通过本地代码解析出来，然后再去调用相应函数。
- if (response.tool_calls is not None):
- # 是否要调用 sum
- tool_call = response.tool_calls[0]
- if (tool_call.function.name == "sum_number"):
- # 调用 sum
- args = json.loads(tool_call.function.arguments)
- # sum([18, 38])
- result = sum(args["numbers"])
- print("=====函数返回=====")
- print(result)

![[Function Calling基础理论/幻灯片16.PNG]]

## 第 17 页

- 二、Function Calling调用本地函数
- # 再次调用大模型获取最终结果
- # 本地函数执行完得到结果后，再将这个结果给大模型，让大模型用自然语言组织起最终答案。
- # 这里需要怎么给大模型呢？需要将函数调用结果，tool_call_id，role， name等一起加入到prompt中
- messages.append(
- {
- "tool_call_id": tool_call.id,  # 用于标识函数调用的
- ID
- "role": "tool",
- "name": "sum_number",
- "content": str(result)  # 数值result 必须转成字符串

![[Function Calling基础理论/幻灯片17.PNG]]

## 第 18 页

- 二、Function Calling调用本地函数
- }
- )
- # 经测试，tool_call_id和role是必须参数，name可以不要，但最好也加上。
- print("=====messages=====")
- print(messages)
- # 再次调用大模型
- print("=====最终回复=====")
- print(get_completion(messages).content)

![[Function Calling基础理论/幻灯片18.PNG]]

## 第 19 页

- 总结
- 本小节详细介绍Function Calling的概念、流程结构及本地函数调用方法。
- 首先分析大模型的三大缺陷（时效性、覆盖性、幻觉），引出Function Calling作为弥补手段，让模型能够调用外部工具获取实时信息或执行特定操作。接着给出Function Calling的完整流程：用户请求→模型识别需要调用函数→返回函数名和参数→本地执行函数→将结果返回模型→模型整合生成最终回答。然后以Python内置的sum函数为例，展示如何通过JSON Schema描述函数，并在代码中实现Function Calling。代码步骤包括：构造tools参数描述函数、发起带工具的请求、解析tool_calls、执行本地函数、将结果以tool消息追加到对话中再次调用模型。
- 最后指出Function Calling适用于各种场景，如查询天气、数据库检索等。

![[Function Calling基础理论/幻灯片19.PNG]]

## 第 20 页

- 互动练习
- 【选择题】
- 在Function Calling流程中，模型返回的函数调用信息包含在哪个字段中？（ ）
- A. choices[0].message.content
- B. choices[0].message.tool_calls
- C. usage
- D. model
- 【判断题】
- Function Calling允许大模型在本地执行任意代码，无需开发者介入。（ ）

![[Function Calling基础理论/幻灯片20.PNG]]

## 第 21 页

_（本页为纯图片）_

![[Function Calling基础理论/幻灯片21.PNG]]