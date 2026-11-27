---
title: 昇腾开发环境与DeepSeek部署
chapter: 第2章
type: PPT附录
up: "[[PPT-总索引]]"
---

# 昇腾开发环境与DeepSeek部署

> 第2章 · 共 35 页

返回 [[PPT-总索引]]

---


## 第 1 页

- 昇腾开发环境与DeepSeek部署

![[昇腾开发环境与DeepSeek部署/幻灯片1.PNG]]

## 第 2 页

- 学完本课程后，您将可以：
- 掌握昇腾开发环境的搭建与配置
- 熟悉CANN Toolkit安装和环境验证方法
- 理解模型量化原理与轻量化部署策略
- 掌握DeepSeek模型的容器化部署流程

![[昇腾开发环境与DeepSeek部署/幻灯片2.PNG]]

## 第 3 页

- 昇腾开发环境
- DeepSeek轻量化部署

![[昇腾开发环境与DeepSeek部署/幻灯片3.PNG]]

## 第 4 页

- 昇腾开发环境
- DeepSeek轻量化部署

![[昇腾开发环境与DeepSeek部署/幻灯片4.PNG]]

## 第 5 页

- 一、昇腾单卡开发套件组成
- 硬件部分
- Atlas加速卡（如Atlas 300I推理卡或Atlas 300T训练卡），插在标准服务器的PCIe插槽中。服务器通常采用鲲鹏ARM处理器或x86处理器。
- 操作系统
- 推荐使用openEuler（针对昇腾做过深度优化）或Ubuntu 18.04/20.04。openEuler是华为开源的操作系统，在国产软硬件协同优化方面有明显优势。
- 驱动和固件
- NPU驱动（Ascend-hdk-npu）和固件，是硬件与操作系统之间的桥梁。版本需要与CANN Toolkit严格匹配。
- CANN Toolkit
- 核心开发工具包，包含编译器、运行时、算子库、调试工具等。
- AI框架
- PyTorch + torch_npu（最主流的组合），或MindSpore。
- 一套完整的昇腾单卡开发环境由硬件和软件两部分组成。可以把它想象成一台特殊的电脑——硬件是它的'身体'，软件是它的'灵魂'。

![[昇腾开发环境与DeepSeek部署/幻灯片5.PNG]]

## 第 6 页

- 二、CANN Toolkit安装
- CANN Toolkit的安装是搭建昇腾开发环境的核心步骤。安装过程包括驱动安装和工具包安装两个阶段。
- 驱动安装步骤：首先检查服务器是否识别到NPU设备（通过lspci命令查看Huawei设备），然后安装NPU驱动包。驱动安装完成后需要重启服务器，之后通过npu-smi info命令验证驱动是否正常加载。
- CANN Toolkit安装步骤：下载与驱动版本匹配的CANN Toolkit安装包（.run格式），使用root权限运行安装脚本。安装完成后，关键路径会被部署到/usr/local/Ascend/ascend-toolkit/目录下。
- 昇腾 AI 计算核心精度类型说明

![[昇腾开发环境与DeepSeek部署/幻灯片6.PNG]]

## 第 7 页

- 二、CANN Toolkit安装
- 在昇腾的软件栈中，CANN Toolkit是核心组件，它提供了驱动、运行时和开发工具。
- 安装完成后，需要在用户的环境变量文件（如.bashrc）中添加以下配置：
- 环境变量配置是CANN安装的关键步骤，需要在.bashrc或.bash_profile中添加：
- source /usr/local/Ascend/ascend-toolkit/set_env.sh
- 这个脚本会自动设置以下关键环境变量：
- LD_LIBRARY_PATH：添加CANN运行时库路径，让系统能找到NPU相关的动态链接库。
- PYTHONPATH：添加Python接口路径，让Python能导入CANN相关的模块。
- PATH：添加工具路径，让命令行能找到npu-smi等管理工具。
- 配置完成后，运行source ~/.bashrc使环境变量生效。
- 整个安装过程可以总结为：安装驱动→重启→安装Toolkit→配置环境变量→验证。

![[昇腾开发环境与DeepSeek部署/幻灯片7.PNG]]

## 第 8 页

- 三、PyTorch + torch_npu适配
- torch_npu是华为开发的PyTorch NPU适配插件，它让PyTorch能够在昇腾NPU上运行。
- 安装方式和普通Python包一样，使用pip即可：
- pip install torch==2.1.0 torch_npu==2.1.0
- 需要注意torch和torch_npu的版本必须严格匹配。
- 昇腾 PyTorch 环境隔离：Conda 多版本管理示意。

![[昇腾开发环境与DeepSeek部署/幻灯片8.PNG]]

## 第 9 页

- 三、PyTorch + torch_npu适配
- 由于不同项目可能需要不同版本的 PyTorch/torch_npu，直接在系统 Python 环境安装易引发版本冲突，借助 Conda 可创建独立虚拟环境（如上一页示意图所示），为不同版本的 torch_npu 配置专属运行环境，避免依赖冲突。

![[昇腾开发环境与DeepSeek部署/幻灯片9.PNG]]

## 第 10 页

- 四、开发环境验证
- 环境环境安装完成后，我们需要通过一系列命令来验证各个组件是否正常工作。验证步骤如下：

![[昇腾开发环境与DeepSeek部署/幻灯片10.PNG]]

## 第 11 页

- 五、NPU状态监控与资源管理
- 在模型训练或推理过程中，实时监控NPU状态是必备技能。
- npu-smi提供了丰富的监控信息：
- AI Core利用率：反映NPU计算单元的繁忙程度。推理时通常在30%-80%之间，如果持续低于10%，可能说明存在数据加载瓶颈。
- HBM内存使用：昇腾NPU使用HBM（High Bandwidth Memory）高带宽显存。模型加载后占用量基本固定，推理时会额外增加KV Cache等动态内存。
- 温度和功耗：正常工作温度在40-80°C之间，超过85°C会触发降频保护。功耗是评估运行成本的重要指标。
- 实际使用中，推荐使用watch -n 1 npu-smi info命令进行实时监控，每秒刷新一次。当发现HBM内存使用率接近100%时，需要考虑减小batch size或使用更低精度的量化模型。

![[昇腾开发环境与DeepSeek部署/幻灯片11.PNG]]

## 第 12 页

- 六、常见环境问题与排查
- 在搭建昇腾开发环境时，以下是最常遇到的问题及解决方法：
- 问题 | 解决方法
- npu-smi命令找不到：原因通常是驱动未安装或环境变量未配置 | 检查/usr/local/Ascend/目录是否存在，重新source环境变量。
- import torch_npu报错：常见原因是torch和torch_npu版本不匹配。 | 确认两者版本号一致（如都是2.1.0），使用pip list检查。
- 模型加载时OOM（内存溢出）：原因是模型参数量超过NPU的HBM容量。 | 使用FP16或INT8量化减少显存占用，或选择更小的模型。
- 推理速度异常慢：可能原因包括数据未放到NPU上（仍在CPU内存中导致频繁数据搬运）、算子不支持NPU导致fallback到CPU执行。 | 检查设备放置和警告日志。

![[昇腾开发环境与DeepSeek部署/幻灯片12.PNG]]

## 第 13 页

- 七、Conda虚拟环境配置
- 使用Conda管理Python虚拟环境是昇腾开发的推荐做法。虚拟环境可以隔离不同项目的依赖，避免版本冲突。
- Conda/Miniconda/Anaconda 选型参考

![[昇腾开发环境与DeepSeek部署/幻灯片13.PNG]]

## 第 14 页

- 七、Conda虚拟环境配置
- 创建专用环境的步骤：
- conda create -n deepseek_npu python=3.9 -y
- conda activate deepseek_npu
- 之后在虚拟环境中安装必要的依赖：
- pip install torch==2.1.0 torch_npu==2.1.0
- pip install transformers modelscope accelerate
- 使用ModelScope（模型仓库，类似国内的HuggingFace）下载模型权重：
- from modelscope import snapshot_download
- model_dir = snapshot_download('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B')
- ModelScope是国内访问速度最快的模型仓库，推荐优先使用。下载完成后，模型文件会保存在~/.cache/modelscope/目录下。

![[昇腾开发环境与DeepSeek部署/幻灯片14.PNG]]

## 第 15 页

- 八、第一个NPU推理示例
- import torch
- import torch_npu
- from transformers import AutoTokenizer, AutoModelForCausalLM
- model_path = 'deepseek-ai/DeepSeek-Coder-1.3B-Instruct'
- tokenizer = AutoTokenizer.from_pretrained(model_path)
- model = AutoModelForCausalLM.from_pretrained(
- model_path,
- torch_dtype=torch.float16  # FP16精度
- ).npu()  # 加载到NPU
- prompt = '请用Python写一个快速排序算法'
- inputs = tokenizer(prompt, return_tensors='pt').to('npu:0')
- outputs = model.generate(**inputs, max_new_tokens=256)
- print(tokenizer.decode(outputs[0]))
- 环境搭建完成后，可以通过一个简单的代码示例来验证整个工作流程：
- 这段代码的关键点：torch.float16指定使用半精度以节省显存，.npu()将模型加载到NPU设备，.to('npu:0')将输入数据也放到NPU上。

![[昇腾开发环境与DeepSeek部署/幻灯片15.PNG]]

## 第 16 页

- 八、第一个NPU推理示例
- 运行上述代码时，可以同时在另一个终端执行watch -n 0.5 npu-smi info来观察NPU状态变化：
- NPU状态变化 |
- 模型加载前 | HBM使用约0MB，AI Core利用率0%。
- 模型加载中 | 可以看到HBM使用量逐步增加。1.3B FP16模型约占用2.6GB HBM。
- 推理过程中 | AI Core利用率会跳动（30%-80%），HBM使用量在模型权重基础上略有增加（KV Cache）。
- 推理完成后 | AI Core利用率降回0%，但HBM仍被模型权重占用（因为模型还在显存中）。
- 如果需要释放显存，需要显式删除模型对象并清理缓存：del model; torch.npu.empty_cache()。这在显存紧张时或需要加载另一个模型前是必要的操作。

![[昇腾开发环境与DeepSeek部署/幻灯片16.PNG]]

## 第 17 页

- 九、开发环境最佳实践
- 基于实际开发经验，以下最佳实践可以帮助避免常见问题：
- 使用虚拟环境
- 推荐使用conda创建独立的Python环境。
- （如conda create -n deepseek_npu python=3.9），避免不同项目的依赖冲突。
- 版本锁定
- 将CANN版本、驱动版本、torch版本、torch_npu版本记录在文档中，团队成员使用相同配置。版本不匹配是昇腾开发最常见的问题来源。
- 使用Docker容器
- 推荐使用华为提供的CANN Docker镜像作为基础，避免手动安装驱动和Toolkit。容器化方式可以保证环境的一致性和可移植性。
- 资源监控习惯
- 在跑模型之前先用npu-smi info检查NPU状态，确保设备空闲。跑长时间任务时开一个终端持续监控。

![[昇腾开发环境与DeepSeek部署/幻灯片17.PNG]]

## 第 18 页

- 昇腾开发环境
- DeepSeek轻量化部署

![[昇腾开发环境与DeepSeek部署/幻灯片18.PNG]]

## 第 19 页

- 一、轻量化部署的必要性
- 大模型的参数量通常在数十亿到数千亿级别，直接部署面临巨大的资源挑战。以DeepSeek-V3为例，其671B参数在FP16精度下需要约1.3TB显存，这远超单卡甚至单机的显存容量。

![[昇腾开发环境与DeepSeek部署/幻灯片19.PNG]]

## 第 20 页

- 二、模型量化原理
- 模型量化的基本思想是用更低精度的数据类型来表示模型的权重参数，从而减少存储空间和计算量。
- 神经网络中的权重是模型可学习的核心参数，其在网络中的位置与信号传递逻辑，决定了对其进行精度压缩的技术可行性，具体结构如下图所示：
- 人工神经网络的基础结构与信号传递

![[昇腾开发环境与DeepSeek部署/幻灯片20.PNG]]

## 第 21 页

- 二、模型量化原理
- 不同精度的数据类型在存储空间占用、模型精度损失上差异显著，以下是主流量化精度的核心参数对比：
- FP32（全精度）：每个参数占4字节，精度最高但显存占用最大。7B模型需要约28GB。
- FP16/BF16（半精度）：每个参数占2字节，显存占用减半。7B模型约14GB。是训练和推理的常用精度。
- INT8（8位量化）：每个参数占1字节，显存占用为FP32的1/4。7B模型约7GB。精度损失通常在1-2%以内。
- INT4（4位量化）：每个参数占0.5字节，显存占用为FP32的1/8。7B模型约3.5GB。精度损失稍大但对大多数场景可接受。
- 选择哪种量化精度需要在显存占用和模型质量之间做权衡。一般推荐在显存充足时使用FP16，资源紧张时使用INT8，极端资源受限时使用INT4。

![[昇腾开发环境与DeepSeek部署/幻灯片21.PNG]]

## 第 22 页

- 三、主流量化方法
- 目前主流的模型量化方法包括以下几种：
- 在昇腾NPU上，通常使用GPTQ或AWQ格式的量化模型，配合vLLM推理框架来实现高效推理。

![[昇腾开发环境与DeepSeek部署/幻灯片22.PNG]]

## 第 23 页

- 四、vLLM推理框架
- vLLM是目前最流行的大模型推理框架之一，由UC Berkeley的研究团队开发。它的核心创新是PagedAttention技术。
- 传统的大模型推理框架在处理多个请求时，需要为每个请求预分配大量的KV Cache显存。但实际运行中，不同请求的KV Cache大小差异很大，导致严重的显存碎片化问题——就像停车场虽然有空位但都太小停不进去。
- vLLM的PagedAttention借鉴了操作系统中虚拟内存和分页的思想：将KV Cache分成固定大小的'页'，按需动态分配。这就像把停车场改成了自助仓储，按实际需要分配空间，利用率大幅提高。
- vLLM的关键优势包括：显存利用率提升2-4倍；支持连续批处理（continuous batching），吞吐量显著提高；兼容OpenAI API接口格式，方便集成。
- 操作系统中分页内存

![[昇腾开发环境与DeepSeek部署/幻灯片23.PNG]]

## 第 24 页

- 四、vLLM推理框架
- vLLM提供了简洁的服务启动方式，支持多种模型格式：
- 离线推理：直接在Python代码中使用LLM类加载模型并推理，适合批量处理任务。
- 在线服务：使用vllm serve命令启动OpenAI兼容的HTTP服务，支持/v1/chat/completions等标准接口。
- 基本的服务启动命令如下：
- 主要参数说明：--dtype指定计算精度，--max-model-len限制最大序列长度（影响显存占用），--port指定服务端口。在昇腾NPU上使用时，还需要配合torch_npu环境。
- vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-7B --dtype float16 --max-model-len 4096 --port 8000

![[昇腾开发环境与DeepSeek部署/幻灯片24.PNG]]

## 第 25 页

- 五、Docker容器化部署
- 在生产环境中，使用Docker容器化部署是最佳实践。容器化可以保证环境一致性、简化部署流程、方便弹性扩缩容。
- Client（客户端）：通过docker run/docker build/docker pull等命令向 Docker 守护进程发送操作指令；
- Docker Host（主机）：核心是 Docker daemon（守护进程），负责管理 Images（镜像，如 Python、Redis）和 Containers（容器），是容器运行的核心环境；
- Registry（仓库）：存储各类镜像（如 NGINX、Ubuntu）和插件，供 Docker Host 拉取使用。
- Docker 的核心架构与组件交互逻辑

![[昇腾开发环境与DeepSeek部署/幻灯片25.PNG]]

## 第 26 页

- 五、Docker容器化部署
- 部署DeepSeek模型的Docker化流程如下：
- 第一步
- 选择基础镜像。使用华为官方的CANN Docker镜像，已包含驱动、CANN Toolkit和PyTorch NPU环境。
- 第二步
- 安装推理框架。在容器中安装vLLM及其依赖。
- 第三步
- 挂载模型文件。将预先下载好的模型权重通过-v参数挂载到容器中，避免每次启动都重新下载。
- 第四步
- 启动推理服务。在容器中运行vLLM serve命令，通过-p参数将服务端口映射到宿主机。

![[昇腾开发环境与DeepSeek部署/幻灯片26.PNG]]

## 第 27 页

- 五、Docker容器化部署
- 一个典型的Docker Compose配置示例：
- services:
- deepseek:
- image: ascendhub/cann-pytorch:latest
- devices:
- - /dev/davinci0
- volumes:
- - ./models:/models
- ports:
- - '8000:8000'
- command: vllm serve /models/DeepSeek-7B --dtype float16
- 关键配置说明：devices挂载NPU设备（/dev/davinci0对应第0号NPU），volumes挂载模型目录，ports映射服务端口。使用docker-compose up -d即可一键启动服务。

![[昇腾开发环境与DeepSeek部署/幻灯片27.PNG]]

## 第 28 页

- 六、推理服务配置与测试
- 推理服务启动后，可以使用curl命令或Python代码进行测试。由于vLLM兼容OpenAI接口格式，测试方法和调用OpenAI API完全一样。
- 使用curl测试：
- 使用Python测试：
- 测试时需要关注几个关键指标：首Token延迟（TTFT）、每Token生成速度（TPS）、总响应时间。
- curl http://localhost:8000/v1/chat/completions -H "Content-Type: application/json" -d '{"model": "DeepSeek-7B", "messages": [{"role": "user", "content": "你好"}]}'
- from openai import OpenAI
- client = OpenAI(base_url='http://localhost:8000/v1', api_key='none')
- response = client.chat.completions.create(
- model='DeepSeek-7B',
- messages=[{'role': 'user', 'content': '你好'}]
- )

![[昇腾开发环境与DeepSeek部署/幻灯片28.PNG]]

## 第 29 页

- 七、性能优化策略
- 部署完成后，可以通过以下策略进一步优化推理性能：
- 批处理优化：vLLM的连续批处理机制会自动将多个请求打包在一起处理，提高GPU/NPU利用率。可以通过--max-num-seqs参数控制最大并发数。
- KV Cache优化：合理设置--max-model-len，不要设置过大。如果业务中对话长度通常不超过2048 Token，就无需将max-model-len设为8192。更短的最大长度意味着更多的KV Cache空间可用于并发请求。
- 量化优化：在精度可接受的前提下，使用INT8或INT4量化模型可以大幅减少显存占用，从而提高并发能力。
- 前缀缓存：如果多个请求共享相同的System Prompt，可以开启vLLM的前缀缓存功能，避免重复计算。

![[昇腾开发环境与DeepSeek部署/幻灯片29.PNG]]

## 第 30 页

- 八、推理服务架构设计
- 除了单实例的性能优化，生产环境还需要考虑服务的高可用和弹性扩展。
- 下面是一个典型的推理服务架构：

![[昇腾开发环境与DeepSeek部署/幻灯片30.PNG]]

## 第 31 页

- 九、模型下载与转换
- 部署DeepSeek模型的第一步是获取模型权重文件。常用的下载渠道和方法：
- ModelScope下载（推荐国内使用）：
- HuggingFace下载：
- 模型下载后通常是FP16/BF16格式。如果需要量化，可以使用AutoGPTQ或AutoAWQ工具进行离线量化转换。量化过程需要少量校准数据和一张GPU/NPU卡，耗时约10-30分钟（7B模型）。
- from modelscope import snapshot_download
- model_dir = snapshot_download(
- 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
- cache_dir='/data/models'
- )
- huggingface-cli download deepseek-ai/DeepSeek-R1-Distill-Qwen-7B --local-dir /data/models/deepseek-7b

![[昇腾开发环境与DeepSeek部署/幻灯片31.PNG]]

## 第 32 页

- 十、性能优化策略
- 显存估算是部署规划的关键。一个简化的显存估算公式：
- 模型权重显存 = 参数量 × 每参数字节数
- 例如：7B模型在FP16下需要：7×10^9 × 2 = 14GB显存。
- KV Cache显存 = 2 × 层数 × 注意力头数 × 头维度 × 序列长度 × 并发数 × 每参数字节数
- 实际部署时，总显存需求 = 模型权重 + KV Cache + 运行时开销。通常建议预留20%的显存余量用于运行时开销。
- 对于昇腾Atlas 300I（16GB HBM）来说，FP16的7B模型（14GB权重）几乎用满了显存，建议使用INT8量化（约7GB）以留出足够的KV Cache空间。

![[昇腾开发环境与DeepSeek部署/幻灯片32.PNG]]

## 第 33 页

- 总结
- 本小节详细介绍昇腾开发环境的搭建、配置及DeepSeek模型的轻量化部署流程。
- 首先介绍昇腾单卡开发套件组成，包括硬件、操作系统、驱动和固件、CANN Toolkit、AI框架。接着详细讲解CANN Toolkit的安装步骤（驱动安装、Toolkit安装、环境变量配置）以及PyTorch+torch_npu的适配方法，强调版本匹配。然后通过一系列命令验证开发环境（npu-smi info、import torch_npu等），并演示NPU状态监控与资源管理。针对环境常见问题（如npu-smi找不到、import torch_npu报错、OOM等）给出排查方法。之后介绍Conda虚拟环境配置和ModelScope模型下载，并给出第一个NPU推理示例。最后深入讲解DeepSeek轻量化部署：模型量化原理、主流量化方法、vLLM推理框架、Docker容器化部署（基于CANN镜像的Compose配置）、推理服务配置与测试、性能优化策略（批处理、KV Cache优化、量化、前缀缓存）以及推理服务架构设计等。

![[昇腾开发环境与DeepSeek部署/幻灯片33.PNG]]

## 第 34 页

- 互动练习
- 【选择题】
- 在昇腾NPU上部署DeepSeek模型时，用于实时监控NPU状态（如AI Core利用率、HBM内存使用）的命令是（ ）
- A. nvidia-smi
- B. npu-smi info
- C. top
- D. df -h
- 【判断题】
- vLLM的PagedAttention技术通过将KV Cache分页管理，大幅提高了显存利用率和推理吞吐量。（ ）

![[昇腾开发环境与DeepSeek部署/幻灯片34.PNG]]

## 第 35 页

_（本页为纯图片）_

![[昇腾开发环境与DeepSeek部署/幻灯片35.PNG]]