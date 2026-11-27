---
title: DeepSeek技术理论
chapter: 第3章
type: PPT附录
up: "[[PPT-总索引]]"
---

# DeepSeek技术理论

> 第3章 · 共 31 页

返回 [[PPT-总索引]]

---


## 第 1 页

_（本页为纯图片）_

![[DeepSeek技术理论/幻灯片1.PNG]]

## 第 2 页

- DeepSeek技术理论

![[DeepSeek技术理论/幻灯片2.PNG]]

## 第 3 页

- 学完本课程后，您将可以：
- 熟悉大模型的概念与特点
- 掌握大模型的类型
- 熟悉DeepSeek 的模型架构
- 掌握DeepSeek 的技术原理

![[DeepSeek技术理论/幻灯片3.PNG]]

## 第 4 页

- 大模型概述
- DeepSeek技术

![[DeepSeek技术理论/幻灯片4.PNG]]

## 第 5 页

- 大模型概述
- DeepSeek技术

![[DeepSeek技术理论/幻灯片5.PNG]]

## 第 6 页

- 一、大模型的概念
- 近年来，ChatGPT、DeepSeek等模型引领AI浪潮，公众关注度持续攀升。大模型凭借其复杂结构与强大功能，正逐步改变人们工作与生活方式。
- 大模型的定义
- 处理海量数据，通过深度神经网络学习语言规律，生成流畅自然内容，应用于智能客服、机器翻译等多领域。
- 核心能力
- 具备强大语言学习与推理能力，可自主构建知识图谱，支持跨领域复杂任务处理，实现高精度语义理解。

![[DeepSeek技术理论/幻灯片6.PNG]]

## 第 7 页

- 一、大模型的概念
- 参数量巨大
- 大模型通常包含数十亿甚至数千亿个参数，这使得它们能够捕捉和表示复杂的数据模式和关系。
- 结构复杂
- 大模型的结构往往非常复杂，由多层神经网络组成，能够处理高维度、复杂的数据。
- 学习能力强
- 大模型学习力强，训练后能掌握丰富知识，表现优异。

![[DeepSeek技术理论/幻灯片7.PNG]]

## 第 8 页

- 二、大模型的特点
- 泛化能力强
- 大模型训练有素，泛化能力强，能处理新未标记数据。
- 多任务处理能力
- 大模型通常具有多任务处理能力，能够同时处理多种类型的数据和任务。
- 可扩展性和适应性
- 大模型具有很强的可扩展性和适应性，可以通过微调或迁移学习等方法，快速适应新的任务和数据集。
- 高计算资源需求
- 由于大模型参数量巨大和结构复杂，其训练和推理通常需要大量的计算资源。

![[DeepSeek技术理论/幻灯片8.PNG]]

## 第 9 页

- 三、大模型的类型
- GPT系列
- GPT系列由OpenAI开发，是最具代表性和影响力的大语言模型之一。GPT-3拥有1750亿个参数，能够处理各种复杂的自然语言任务。GPT-4拥有更大的参数量，不仅适用于传统的文本生成、语言理解等任务，还能在图像描述、视频字幕生成等跨模态任务中表现出色。
- BERT系列
- BERT系列由谷歌开发，是一种基于Transformer架构的预训练语言表示模型，它通过学习大量文本数据，生成了丰富的语言表示。这些表示可以被用于各种下游自然语言处理任务。BERT的双向编码器结构使其能够同时理解文本的上下文信息，从而在多个自然语言处理任务中取得了显著的性能提升。

![[DeepSeek技术理论/幻灯片9.PNG]]

## 第 10 页

- 三、大模型的类型
- T5系列
- T5系列是由谷歌研究团队开发的一系列基于Transformer架构的文本到文本迁移模型。它将多种自然语言处理任务统一为文本到文本的格式，通过统一的框架来处理不同类型的自然语言处理任务。这种设计使得T5模型能够更灵活地适应不同的任务需求，并提升跨任务迁移学习的效果。
- 其他模型
- 如BART（由Facebook AI团队开发）、XLNet（由CMU和MIT的研究人员开发）、DeepSeek、豆包、Kimi、文心一言、通义千问、盘古大模型等。其中，DeepSeek大模型是由杭州的AI创业公司DeepSeek（深度求索）开发的先进人工智能模型，性能与GPT-4.0不相上下，在数学推理、知识理解与代码生成等复杂任务方面表现出色。

![[DeepSeek技术理论/幻灯片10.PNG]]

## 第 11 页

- 四、大模型的选择
- 在选择大模型，需综合考虑以下因素：
- 任务需求
- 明确任务需求，选择合适大模型，关键在场景与能力匹配。
- 隐私要求
- 本地化部署模型，保障敏感数据隐私安全。

![[DeepSeek技术理论/幻灯片11.PNG]]

## 第 12 页

- 四、大模型的选择
- 在选择大模型，需综合考虑以下因素：
- 硬件资源
- 选模型，需匹配硬件资源，确保运行流畅。
- 成本预算
- 本地化部署长期成本低，云端服务前期投入少，选大模型需综合成本预算。

![[DeepSeek技术理论/幻灯片12.PNG]]

## 第 13 页

- 大模型概述
- DeepSeek技术

![[DeepSeek技术理论/幻灯片13.PNG]]

## 第 14 页

- 一、什么是 DeepSeek

![[DeepSeek技术理论/幻灯片14.PNG]]

## 第 15 页

- 一、什么是 DeepSeek
- 中国团队研发的DeepSeek-R1大型语言模型因其突出的性价比和开源特性受到学术界的广泛关注。该模型在逻辑推理能力方面达到了与OpenAI的o1模型相当的水平。其创新之处在于采用类似人类思维的渐进式推理机制，显著提升了处理科学问题的有效性。
- DeepSeek受到如此关注的原因有三点。
- 首先，该模型只使用强化学习进行训练，无需人工标注数据，能自主学习推理能力，且其性能与OpenAI o1模型相近。
- 最后，Deepseek秉持开源理念，开源了R1模型及其蒸馏出的子模型。
- 其次，它在训练和推理速度上显著优于OpenAI o1类模型，这极大节约了硬件成本。

![[DeepSeek技术理论/幻灯片15.PNG]]

## 第 16 页

- 二、DeepSeek 的发展历程
- 如图所示，Deepseek模型历经了多个版本的迭代，包括DeepSeek V1、DeepSeek V2、DeepSeek V3、DeepSeek R1-Zero和DeepSeek R1。其中，R1-Zero模型首次引入了GPRO强化学习方法，但存在格式性差、语言混杂、训练不稳定等问题。为解决这些问题，R1模型引入了少量冷启动数据进行预训练。

![[DeepSeek技术理论/幻灯片16.PNG]]

## 第 17 页

- 三、DeepSeek 的模型架构
- 在技术层面，DeepSeek验证了推理技术的可行性，并引发了自然语言处理领域的范式转变。推理是指根据已知信息、事实、规则或前提，通过特定的思维过程和方法，推导出新的结论、判断或知识的认知活动。它是人类思维和智能的核心组成部分，也是人工智能、科学研究和日常决策中的关键能力。

![[DeepSeek技术理论/幻灯片17.PNG]]

## 第 18 页

- 三、DeepSeek 的模型架构
- DeepSeek的技术架构以“大规模预训练模型”为核心，结合混合专家系统（MoE）、多模态学习、强化学习等技术，构建了一套覆盖感知、认知与决策的全栈式AI能力。

![[DeepSeek技术理论/幻灯片18.PNG]]

## 第 19 页

- 三、DeepSeek 的模型架构

![[DeepSeek技术理论/幻灯片19.PNG]]

## 第 20 页

- 四、DeepSeek 的技术创新
- 1.高质量数据处理流水线
- DeepSeek团队构建了复杂的数据处理流水线，实现了高效的数据清洗、去重和质量评估。以下是其数据处理流程的一个简化示例：
- # DeepSeek数据处理流水线示例
- import torch
- import numpy as np
- from transformers import AutoTokenizer
- class DataQualityFilter:
- def __init__(self, model_name="deepseek-ai/deepseek-llm-7b-base"):
- self.tokenizer = AutoTokenizer.from_pretrained(model_name)
- self.perplexity_threshold = 50.0  # 困惑度阈值，越低质量越高
- self.repetition_threshold = 0.3   # 重复内容比例阈值

![[DeepSeek技术理论/幻灯片20.PNG]]

## 第 21 页

- 四、DeepSeek 的技术创新
- def calculate_perplexity(self, text):
- # 计算文本困惑度的简化实现
- tokens = self.tokenizer.encode(text)
- if len(tokens) < 10:  # 忽略过短文本
- return float('inf')
- token_tensor = torch.tensor(tokens)
- sliding_window = 128  # 滑动窗口大小
- # 简化的困惑度计算逻辑
- perplexity_scores = []
- for i in range(0, len(tokens) - sliding_window, sliding_window // 2):
- window = token_tensor[i:i+sliding_window]
- # 实际计算应该通过模型推理获得困惑度
- # 此处仅为示例，使用随机值
- window_perplexity = np.random.gamma(shape=2.0, scale=10.0)
- perplexity_scores.append(window_perplexity)

![[DeepSeek技术理论/幻灯片21.PNG]]

## 第 22 页

- 四、DeepSeek 的技术创新
- return np.mean(perplexity_scores)
- def check_repetition(self, text):
- # 检测文本中的重复内容
- words = text.split()
- if len(words) < 20:
- return 0.0
- # 检测n-gram重复
- ngram_counts = {}
- for n in [3, 4, 5]:  # 检查3-gram, 4-gram, 5-gram
- for i in range(len(words) - n + 1):
- ngram = ' '.join(words[i:i+n])
- ngram_counts[ngram] = ngram_counts.get(ngram, 0) + 1

![[DeepSeek技术理论/幻灯片22.PNG]]

## 第 23 页

- 四、DeepSeek 的技术创新
- # 计算重复率
- repeated_ngrams = sum(1 for count in ngram_counts.values() if count > 1)
- total_ngrams = len(ngram_counts)
- return repeated_ngrams / total_ngrams if total_ngrams > 0 else 0.0
- def filter_text(self, text):
- """判断文本是否为高质量样本"""
- perplexity = self.calculate_perplexity(text)
- repetition_rate = self.check_repetition(text)
- is_high_quality = (perplexity < self.perplexity_threshold and
- repetition_rate < self.repetition_threshold)
- return is_high_quality, {
- "perplexity": perplexity,
- "repetition_rate": repetition_rate
- }

![[DeepSeek技术理论/幻灯片23.PNG]]

## 第 24 页

- 四、DeepSeek 的技术创新
- 2.多源指令数据增强
- DeepSeek模型在指令调优阶段使用了多源指令数据增强技术，通过合成高质量的指令-回答对，提升模型对复杂指令的理解能力。这一技术帮助模型掌握了更丰富的指令格式和任务类型。
- 3 针对中文的优化
- 作为中国本土模型，DeepSeek针对中文进行了特殊优化，包括中文分词改进、中文语料权重提升、以及中文语言习惯适配。这些优化使得模型在处理中文任务时表现出色。

![[DeepSeek技术理论/幻灯片24.PNG]]

## 第 25 页

- 四、DeepSeek 的技术创新
- 性能评估与对比

![[DeepSeek技术理论/幻灯片25.PNG]]

## 第 26 页

- 五、DeepSeek 的应用场景

![[DeepSeek技术理论/幻灯片26.PNG]]

## 第 27 页

- 五、DeepSeek 的应用场景

![[DeepSeek技术理论/幻灯片27.PNG]]

## 第 28 页

- 五、DeepSeek 的应用场景

![[DeepSeek技术理论/幻灯片28.PNG]]

## 第 29 页

- 总结
- 本小节系统介绍DeepSeek系列大模型的概念、发展历程、模型架构及技术创新。
- 首先概述大模型的概念和特点（参数量巨大、结构复杂、学习能力强、泛化能力强等），以及常见模型类型（GPT、BERT、T5、DeepSeek等）。然后重点讲解DeepSeek的发展历程：从V1到V3再到R1，其中R1引入GRPO强化学习方法，实现与OpenAI o1相当的推理能力。DeepSeek的技术架构以大规模预训练模型为核心，结合MoE、多模态学习、强化学习等技术。在技术创新方面，详细介绍了高质量数据处理流水线（数据清洗、去重、质量评估）、多源指令数据增强以及针对中文的优化（中文分词改进、语料权重提升）。
- 最后给出DeepSeek在多个行业（如金融、教育、医疗、代码开发）的应用场景。通过代码示例展示了数据处理流水线的实现。

![[DeepSeek技术理论/幻灯片29.PNG]]

## 第 30 页

- 互动练习
- 【选择题】
- DeepSeek-R1模型在训练中引入了哪种强化学习算法，以实现强大的推理能力？（ ）
- A. PPO
- B. GRPO
- C. DPO
- D. Q-learning
- 【判断题】
- DeepSeek系列模型对中文进行了特殊优化，包括中文分词改进和中文语料权重提升。（ ）

![[DeepSeek技术理论/幻灯片30.PNG]]

## 第 31 页

_（本页为纯图片）_

![[DeepSeek技术理论/幻灯片31.PNG]]