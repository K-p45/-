---
title: Transformer技术理论
chapter: 第2章
type: PPT附录
up: "[[PPT-总索引]]"
---

# Transformer技术理论

> 第2章 · 共 48 页

返回 [[PPT-总索引]]

---


## 第 1 页

- Transformer技术理论

![[Transformer技术理论/幻灯片1.PNG]]

## 第 2 页

- 学完本课程后，您将可以：
- 熟悉Transformer的起源与结构
- 掌握Transformer的输入
- 熟悉self-attention及mulit-head知识
- 掌握Encoder结构及Decoder结构原理

![[Transformer技术理论/幻灯片2.PNG]]

## 第 3 页

- Transformer结构
- Transformer输入
- self-attention及mulit-head
- Encoder结构及Decoder结构

![[Transformer技术理论/幻灯片3.PNG]]

## 第 4 页

- Transformer结构
- Transformer输入
- self-attention及mulit-head
- Encoder结构及Decoder结构

![[Transformer技术理论/幻灯片4.PNG]]

## 第 5 页

- 一、Transformer的起源
- 2017年，Google发表论文《Attention is All You Need》，提出经典网络结构Transformer，全部采用Attention结构的方式，代替了传统的Encoder-Decoder框架必须结合CNN或RNN的固有模式。并在两项机器翻译任务中取得了显著效果。该论文一经发出，便引起了业界的广泛关注，同时，Google于2018年发布的划时代模型BERT也是在Transformer架构上发展而来。

![[Transformer技术理论/幻灯片5.PNG]]

## 第 6 页

- 一、Transformer的起源
- Transformer应用于机器翻译领域，并取得了很好的效果
- Transformer早期时应用于机器翻译，并在两项任务上取得了非常好的效果，或许这正是该模型
- 命名为Transformer的原因。此后，Transformer引入了所有NLP任务中，都取得了不错的效果。
- Transformer基于Encoder-Decoder框架
- Transformer基于Encoder-Decoder（编解码）框架，结构由编码器和解码器两部分组成，各有
- 特点。
- Transformer引入Attention机制
- Transformer引入Attention机制，具体来说是self-attention，是其最大的特点。self-attention能够支持并行处理序列输入，并且具有较强的表征能力，是Transformer效果好的主要原因。

![[Transformer技术理论/幻灯片6.PNG]]

## 第 7 页

- 二、Transformer的结构
- 右图是 Transformer 用于中英文翻译的整体结构：
- 可以看到 Transformer 由
- Encoder 和 Decoder 两个部分组成，
- Encoder 和 Decoder 都包含 6 个 block。
- 其中，Encoder 负责对输入进行编码，生成编码信息；
- Decoder负责利用编码信息进解码

![[Transformer技术理论/幻灯片7.PNG]]

## 第 8 页

- 二、Transformer的结构
- Transformer 的工作流程大体如下：
- 第一步：获取输入句子的每一个词的
- 表示向量 X，X由单词的 Embedding
- 和单词位置的 Embedding 相加得到。

![[Transformer技术理论/幻灯片8.PNG]]

## 第 9 页

- 二、Transformer的结构
- 第二步：将得到的单词表示向量矩阵 (如上图所示，
- 每一行是一个单词的表示 x) 传入 Encoder 中，
- 经过 6 个 Encoder block 后可以得到句子所有单词的
- 编码信息矩阵 C，如右图。
- 单词向量矩阵用 X(n×d)表示， n 是句子中单词个数，
- d 是表示向量的维度 ( d=512)。
- 每一个 Encoder block 输出的矩阵维度与输入完全一致。

![[Transformer技术理论/幻灯片9.PNG]]

## 第 10 页

- 二、Transformer的结构
- 第三步：将 Encoder 输出的编码信息矩阵 C传递到Decoder 中，Decoder 依次会根据当前翻译过的单词 1~ i 翻译下一个单词 i+1，如右图所示。
- 在使用的过程中，翻译到单词 i+1的时候需要通过Mask (掩码) 操作遮盖住 i+1之后的单词，以防止信息泄露。

![[Transformer技术理论/幻灯片10.PNG]]

## 第 11 页

- 一、Transformer的起源
- 右图 Decoder 接收了 Encoder 的编码矩阵 C，然后首先输入一个翻译开始符 "<Begin>"，预测第一个单词 "I"；然后输入翻译开始符 "<Begin>"和单词 "I"，预测单词 "have"，以此类推。
- 这是 Transformer 使用时候的大致流程，
- 接下来是内部各个部分的细节。

![[Transformer技术理论/幻灯片11.PNG]]

## 第 12 页

- Transformer结构
- Transformer输入
- self-attention及mulit-head
- Encoder结构及Decoder结构

![[Transformer技术理论/幻灯片12.PNG]]

## 第 13 页

- 一、Transformer的输入
- Transformer 中单词的输入表示 x由单词 Embedding 和位置 Embedding 相加得到。

![[Transformer技术理论/幻灯片13.PNG]]

## 第 14 页

- 一、Transformer的输入
- 1.单词 Embedding
- 单词的 Embedding 有很多种方式可以获取，例如可以采用 Word2Vec、Glove 等算法预训练得到，也可以在 Transformer 中训练得到。
- 2.位置 Embedding
- Transformer 中除了单词的 Embedding，还需要使用位置 Embedding 表示单词出现在句子中的位置。因为 Transformer 不采用 RNN 的结构，而是使用全局信息，不能利用单词的顺序信息，而这部分信息对于 NLP 来说非常重要。所以 Transformer 中使用位置 Embedding 保存单词在序列中的相对或绝对位置。

![[Transformer技术理论/幻灯片14.PNG]]

## 第 15 页

- Transformer结构
- Transformer输入
- self-attention及mulit-head
- Encoder结构及Decoder结构

![[Transformer技术理论/幻灯片15.PNG]]

## 第 16 页

- 一、Self-Attention
- 右图是 Transformer 的内部结构图，左侧为Encoder block，右侧为Decoder block。红色圈中的部分为 Multi-Head Attention，是由多个 Self-Attention组成的，可以看到 Encoder block 包含一个 Multi-Head Attention，而 Decoder block 包含两个 Multi-Head Attention (其中有一个用到 Masked)。Multi-Head Attention 上方还包括一个 Add & Norm 层，Add 表示残差连接 (Residual Connection) 用于防止网络退化，Norm 表示 Layer Normalization，用于对每一层的激活值进行归一化。

![[Transformer技术理论/幻灯片16.PNG]]

## 第 17 页

- 二、Self-Attention的结构
- 右图是 Self-Attention 的结构，
- 在计算的时候需要用到矩阵 Q(查询), K(键值), V(值)。
- 在实际中，Self-Attention 接收的是输入(单词的表示向量 x组成的矩阵 X) 或者上一个Encoder block 的输出。
- 而 Q, K, V 正是通过 Self-Attention 的输入进行线性变换得到的。

![[Transformer技术理论/幻灯片17.PNG]]

## 第 18 页

- 二、Self-Attention的输入
- Self-Attention 的输入用矩阵 X进行表示，
- 则可以使用线性变阵矩阵 WQ, WK, WV
- 计算得到 Q, K, V，计算如右图所示。
- 注意 X, Q, K, V 的每一行都表示一个单词。

![[Transformer技术理论/幻灯片18.PNG]]

## 第 19 页

- 三、Self-Attention的计算过程
- 得到矩阵 Q, K, V之后就可以计算出 Self-Attention 的输出了，计算的公式如下：
- 其中      为Q和K中的列数，即向量的维度
- 公式中计算矩阵Q和K每一行向量的内积，为了防止内积过大，因此除以       的平方根。
- Q乘以K的转置后，得到的矩阵行列数都为n，n为句子单词数，这个矩阵可以表示单词
- 之间的 attention 强度。

![[Transformer技术理论/幻灯片19.PNG]]

## 第 20 页

- 三、Self-Attention的计算过程
- 如图为 Q 乘以 K 的转置，1234 表示的是句子中的单词。

![[Transformer技术理论/幻灯片20.PNG]]

## 第 21 页

- 三、Self-Attention的计算过程
- 得到 QKT之后，使用 Softmax计算每一个单词对于其他单词的attention系数，公式中的Softmax是对矩阵的每一行进行Softmax，即每一行的和都变为 1。

![[Transformer技术理论/幻灯片21.PNG]]

## 第 22 页

- 三、Self-Attention的计算过程
- 得到Softmax矩阵之后可以和V相乘，得到最终的输出Z。

![[Transformer技术理论/幻灯片22.PNG]]

## 第 23 页

- 三、Self-Attention的计算过程
- 上图中 Softmax 矩阵的第 1 行表示单词 1 与其他所有单词的 attention 系数，最终单词 1 的输出 Z1 等于所有单词 i 的值 Vi 根据 attention 系数的比例加在一起得到，如下图所示：

![[Transformer技术理论/幻灯片23.PNG]]

## 第 24 页

- 四、Multi-Head Attention
- 在上一步，我们已经知道怎么通过Self-Attention计算得到输出矩阵Z，而Multi-Head Attention是由多个Self-Attention组合形成的，
- 右图是 Multi-Head Attention 的结构图。

![[Transformer技术理论/幻灯片24.PNG]]

## 第 25 页

- 四、Multi-Head Attention
- 从右图可以看到Multi-Head Attention 包含多个 Self-Attention 层，首先将输入X分别传递到h个不同的 Self-Attention 中，计算得到h个输出矩阵 Z。

![[Transformer技术理论/幻灯片25.PNG]]

## 第 26 页

- 四、Multi-Head Attention
- 右图是h=8时候的情况，
- 此时会得到8个输出矩阵Z

![[Transformer技术理论/幻灯片26.PNG]]

## 第 27 页

- 四、Multi-Head Attention
- 得到8个输出矩阵 Z1 到 Z8 之后，Multi-Head Attention 将它们拼接在一起 (Concat)，
- 然后传入一个Linear层，得到Multi-Head Attention最终的输出Z。
- 可以看到Multi-Head Attention输出的矩阵Z与其输入的矩阵X的维度是一样的。

![[Transformer技术理论/幻灯片27.PNG]]

## 第 28 页

- Transformer结构
- Transformer输入
- self-attention及mulit-head
- Encoder结构及Decoder结构

![[Transformer技术理论/幻灯片28.PNG]]

## 第 29 页

- 一、Encoder结构
- 右图红色部分是Transformer的 Encoder block 结构，可以看到是由 Multi-Head Attention,Add & Norm, Feed Forward, Add & Norm 组成的。

![[Transformer技术理论/幻灯片29.PNG]]

## 第 30 页

- 二、Add & Norm
- Add & Norm 层由 Add 和 Norm 两部分组成，其计算公式如下：
- 其中X表示Multi-Head Attention或者Feed Forward的输入，MultiHeadAttention(X)和 FeedForward(X)表示输出 (输出与输入X维度是一样的，所以可以相加)。

![[Transformer技术理论/幻灯片30.PNG]]

## 第 31 页

- 二、Add & Norm
- Add指X+MultiHeadAttention(X)，是一种残差连接，通常用于解决多层网络训练的问题，可以让网络只关注当前差异的部分，在 ResNet 中经常用到。
- Norm指Layer Normalization，通常用于 RNN结构，Layer Normalization会将每一层神经元的输入都转成均值方差都一样的，这样可以加快收敛。

![[Transformer技术理论/幻灯片31.PNG]]

## 第 32 页

- 三、Feed Forward
- Feed Forward 层比较简单，是一个两层的全连接层，第一层的激活函数为 Relu，第二层不使用激活函数，对应的公式如下：
- X是输入，Feed Forward最终得到的输出矩阵的维度与X一致。

![[Transformer技术理论/幻灯片32.PNG]]

## 第 33 页

- 四、组成 Encoder
- 通过上面描述的Multi-Head Attention, Feed Forward, Add & Norm 就可以构造出一个 Encoder block，Encoder block 接收输入矩阵 X(n×d)，并输出一个矩阵 O(n×d)。通过多个Encoder block叠加就可以组成 Encoder。

![[Transformer技术理论/幻灯片33.PNG]]

## 第 34 页

- 四、组成 Encoder
- 第一个Encoder block的输入为句子单词的表示向量矩阵，后续 Encoder block 的输入是前一个 Encoder block 的输出，最后一个 Encoder block 输出的矩阵就是编码信息矩阵C，这一矩阵后续会用到Decoder 中。

![[Transformer技术理论/幻灯片34.PNG]]

## 第 35 页

- 五、Decoder结构
- 右图红色部分为 Transformer 的 Decoder block 结构，
- 与 Encoder block 相似，但是存在一些区别：
- 包含两个Multi-Head Attention层。
- 第一个Multi-Head Attention层采用了Masked操作。
- 第二个Multi-Head Attention层的K, V矩阵使用Encoder的编码信息矩阵 C 进行计算，而 Q 使用的是block内上一层（Add&Norm)的输出计算。
- 最后有一个Softmax 层计算下一个翻译单词的概率。

![[Transformer技术理论/幻灯片35.PNG]]

## 第 36 页

- 五、Decoder结构
- 第一个 Multi-Head Attention
- Decoder block的第一个Multi-Head Attention采用了Masked操作，因为在翻译的过程中是顺序翻译的，即翻译完第i个单词，才可以翻译第i+1个单词。通过 Masked 操作可以防止第i个单词知道i+1个单词之后的信息。
- 下面以 "我有一只猫" 翻译成 "I have a cat" 为例，了解一下Masked操作。

![[Transformer技术理论/幻灯片36.PNG]]

## 第 37 页

- 五、Decoder结构
- 在 Decoder 的时候，是需要根据之前的翻译，求解当前最有可能的翻译，如下图所示。首先根据输入 "<Begin>" 预测出第一个单词为 "I"，然后根据输入 "<Begin> I" 预测下一个单词 "have"。

![[Transformer技术理论/幻灯片37.PNG]]

## 第 38 页

- 五、Decoder结构
- Decoder可以在训练的过程中使用Teacher Forcing 并且并行化训练，即将正确的单词序列 (<Begin> I have a cat) 和对应输出 (I have a cat <end>) 传递到Decoder。
- 那么在预测第 i 个输出时，就要将第i+1 之后的单词掩盖住，注意 Mask 操作是在 Self-Attention 的 Softmax 之前使用的，下面用 0 1 2 3 4 5 分别表示 "<Begin> I have a cat <end>"。

![[Transformer技术理论/幻灯片38.PNG]]

## 第 39 页

- 五、Decoder结构
- 第一步：是 Decoder 的输入矩阵和Mask矩阵，输入矩阵包含 "<Begin> I have a cat" (0, 1, 2, 3, 4) 五个单词的表示向量，Mask 是一个5×5的矩阵。在Mask可以发现单词0只能使用单词0的信息，而单词1可以使用单词0, 1的信息，即只能使用之前的信息。

![[Transformer技术理论/幻灯片39.PNG]]

## 第 40 页

- 五、Decoder结构
- 第二步：接下来的操作和之前的 Self-Attention 一样，通过输入矩阵 X计算得到 Q, K, V 矩阵。然后计算 Q 和 KT 的乘积 QKT。

![[Transformer技术理论/幻灯片40.PNG]]

## 第 41 页

- 五、Decoder结构
- 第三步：在得到 QKT 之后需要进行 Softmax，计算 attention score，我们在 Softmax 之前需要使用 Mask矩阵遮挡住每一个单词之后的信息，遮挡操作如下：
- 得到 Mask QKT 之后在 Mask QKT 上进行 Softmax，每一行的和都为 1。但是单词 0 在单词 1, 2, 3, 4 上的 attention score 都为 0。

![[Transformer技术理论/幻灯片41.PNG]]

## 第 42 页

- 五、Decoder结构
- 第四步：使用 Mask QKT 与矩阵 V相乘，得到输出 Z，则单词 1 的输出向量 Z1 是只包含单词 1 信息的。
- 第五步：通过上述步骤就可以得到一个 Mask Self-Attention 的输出矩阵 Zi，然后和 Encoder 类似，通过 Multi-Head Attention 拼接多个输出 Zi 然后计算得到第一个 Multi-Head Attention 的输出Z，Z与输入 X 维度一样。

![[Transformer技术理论/幻灯片42.PNG]]

## 第 43 页

- 五、Decoder结构
- 第二个 Multi-Head Attention
- Decoder block第二个Multi-Head Attention变化不大， 主要的区别在于其中 Self-Attention 的K, V矩阵不是使用上一个Decoder block的输出计算的，而是使用Encoder的编码信息矩阵C计算的。
- 根据Encoder的输出C计算得到K, V，根据上一个 Decoder block的输出Z计算Q (如果是第一个 Decoder block则使用输入矩阵 X 进行计算)，后续的计算方法与之前描述的一致。
- 这样做的好处是在 Decoder 的时候，每一位单词都可以利用到 Encoder 所有单词的信息 (这些信息无需 Mask)。

![[Transformer技术理论/幻灯片43.PNG]]

## 第 44 页

- 五、Decoder结构
- Softmax 预测输出单词
- Decoder block 最后的部分是利用 Softmax 预测下一个单词，在之前的网络层我们可以得到一个最终的输出 Z，因为 Mask的存在，使得单词 0 的输出 Z0 只包含单词 0 的信息，如下所示：

![[Transformer技术理论/幻灯片44.PNG]]

## 第 45 页

- 五、Decoder结构
- Softmax 根据输出矩阵的每一行预测下一个单词：这就是 Decoder block 的定义，与 Encoder 一样，Decoder 是由多个 Decoder block 组合而成。

![[Transformer技术理论/幻灯片45.PNG]]

## 第 46 页

- 总结
- 本小节深入剖析Transformer模型的起源、结构、输入表示、自注意力机制、多头注意力以及Encoder-Decoder结构。
- 首先介绍Transformer的提出，完全基于注意力机制，替代传统CNN/RNN，在机器翻译中取得突破，并成为BERT等模型的基石。整体结构包含Encoder和Decoder两部分，各由多个block堆叠而成。工作流程：输入词嵌入+位置编码→Encoder生成编码矩阵C→Decoder根据C逐步解码生成输出。详细讲解单词Embedding和位置Embedding（用三角函数表示位置信息）。自注意力（Self-Attention）通过Q、K、V矩阵计算注意力权重。多头注意力将输入投影到多个头并行计算，拼接后线性变换，增强模型关注不同子空间的能力。Encoder结构包括Multi-Head Attention、Add&Norm（残差连接+层归一化）、Feed Forward。Decoder结构类似，最后通过掩码操作实现自回归生成。

![[Transformer技术理论/幻灯片46.PNG]]

## 第 47 页

- 互动练习
- 【选择题】
- Transformer模型中，用于防止Decoder在预测当前词时看到未来信息的技术是（ ）
- A. 残差连接
- B. 层归一化
- C. 掩码（Mask）
- D. 位置编码
- 【判断题】
- 多头注意力机制将输入分别投影到多个头，并行计算注意力，最后拼接融合，可以捕捉不同子空间的语义信息。（ ）

![[Transformer技术理论/幻灯片47.PNG]]

## 第 48 页

_（本页为纯图片）_

![[Transformer技术理论/幻灯片48.PNG]]