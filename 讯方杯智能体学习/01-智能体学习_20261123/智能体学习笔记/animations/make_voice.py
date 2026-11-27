# -*- coding: utf-8 -*-
"""
为 19 段动画生成中文旁白（晓伊音色）。

原理：每段动画有 3 个分镜（立论 / 展开 / 落地），各 8 秒。
脚本把每个分镜要念的话单独合成，再用 ffmpeg 精确对齐到 8 秒的槽位里，
最后三段拼成一条 24 秒音轨 —— 这样语音和画面永远同步。

用法：
    python make_voice.py            # 生成全部
    python make_voice.py 04-Agent工作流  # 只生成某一个
"""

import asyncio
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
VAULT = os.path.dirname(HERE)                      # 智能体学习/
ANIM_DIR = os.path.join(VAULT, "动画")              # 视频在这里
VOICE_DIR = os.path.join(VAULT, "动画", "_voice")

VOICE = "zh-CN-XiaoyiNeural"
RATE = "+18%"     # 语速略快，配合信息密度
BEAT = 8.0        # 每个分镜 8 秒


# ══════════════════════════════════════════════════════════════
# 旁白脚本：每段 3 句，对应 3 个分镜
# ══════════════════════════════════════════════════════════════
SCRIPT = {
    "00-课程地图": [
        "大模型给能力，提示词定质量，智能体把它用起来，多智能体把它规模化。",
        "九个章节其实是三层：大模型是底座，提示词是用法，智能体系统是上层建筑。",
        "记住这条主线，后面每一章你都找得到自己的位置。",
    ],
    "01-Transformer": [
        "苹果是水果还是公司？答案不在这个词本身，而在它周围都有谁。",
        "自注意力让每个词直接看到全局，多头同时捕捉语法、指代和语义，位置编码补上先后顺序。",
        "它真正改变的是可并行，这才让堆算力这件事成立，也才有了今天的大模型。",
    ],
    "01-预训练与微调": [
        "预训练像是先上完大学，微调像是上岗培训，成本差了几个数量级。",
        "预训练读万亿字学通识，指令微调让它听得懂话，对齐让它靠谱，领域微调让它变专业。",
        "想改格式用提示词就够了，想懂你的资料用知识库，只有学新技能才值得微调。",
    ],
    "02-提示词六技巧": [
        "提示词的本质，是把模糊的要求收窄成精确的指令。",
        "六个技巧其实是三层：说清楚、给参照、控结构。示例是性价比最高的一招。",
        "每写一条提示词，按这三层检查一遍，基本不会错。",
    ],
    "03-高级提示技巧": [
        "什么时候该给例子，什么时候该让它自己推理？四种策略，看任务缺什么。",
        "简单任务直接问，要固定格式给三到五个例子，要多步推理用思维链，材料多用上下文学习。",
        "最强的提示词往往是组合拳：角色加示例加思维链，再加背景资料。",
    ],
    "03-思维链vs上下文学习": [
        "这两个最容易混：一个解决深度，一个解决新知。",
        "思维链依赖模型已经会的东西，让它想得更深；上下文学习是模型原本不会，从示例里现学。",
        "记一句话：你想清楚点，还是你看这几个例子。",
    ],
    "03-提示词评估": [
        "感觉变好了，不等于真的变好了。没有评测集，你改的每一版都是凭感觉。",
        "定性看切题和语气，定量看指标：摘要用 ROUGE，翻译用 BLEU，分类用 F1。",
        "每次只改一个变量，否则你永远不知道是哪一处起了作用。",
    ],
    "04-Agent工作流": [
        "智能体等于大模型加工具加循环。它不是一次问答，而是一个盯住目标反复干完的环。",
        "感知看懂环境，规划想清路径，行动真的去做，学习总结经验。四个环节各有各的难点。",
        "关键在于行动之后必须重新感知，否则它只是一条流水线，不叫智能体。",
    ],
    "04-Agent五层次": [
        "从条件反射到自我进化，智能体有五级台阶，越往下越强，也越不可控。",
        "反应式只管刺激和反应，有模型的记得住历史，有目标的会搜路，讲效用的会权衡，会学习的能进化。",
        "选型的正确做法，是用能满足需求的最低层级，别过度设计。",
    ],
    "04-Agent-vs-传统软件": [
        "传统软件照着做，智能体自己想办法。本质是穷举路径和搜索路径的区别。",
        "规则写死遇到新情况就崩，智能体临场应变；但它的可控性也下降了。",
        "所以生产环境必须配护栏：工具白名单、迭代上限、敏感操作人工确认。",
    ],
    "05-无代码开发五步": [
        "搭出来不难，让它稳定地做对才难。从零到一，只有五步。",
        "先写人设，注意能力边界比能力描述更重要；再配知识库，接插件，然后用真实问题反复调试。",
        "最后发布上线。记住，调试阶段建的测试集，才是能不能上生产的分水岭。",
    ],
    "05-RAG知识库": [
        "想让模型读懂你自己公司的事，不需要训练，用 RAG 就够了。",
        "把问题变成向量，检索出最相关的几段，拼进提示词再生成。便宜、即时生效、可溯源。",
        "但效果的八成取决于检索：切分别太碎也别太大，单块三到八百字，先取前三条试试。",
    ],
    "06-单智能体vs多智能体": [
        "一个人干不完，就拆成一支队伍。多智能体的价值，一半在于容错。",
        "单一智能体串行、可控；多个智能体并行、能扩展，但协调本身就是难题。",
        "真实的代价是 token 消耗三到十倍，调试难度指数上升。能单个搞定，就别拆。",
    ],
    "06-三大协作机制": [
        "多智能体跑不跑得起来，全看三件事：通信、分工、和吵架了怎么办。",
        "通信可以用消息，也可以共享白板；分工可以静态也可以动态；冲突用投票、优先级或仲裁者。",
        "比事后仲裁更有效的，是一开始就规定清楚谁能改什么。",
    ],
    "07-四条扩展路线": [
        "从只会聊天到真正干活，中间隔着四条扩展路线。",
        "提示词定风格，知识库懂私事，插件给手脚，接口和工作流做精确编排。",
        "最佳实践是分工：能确定的地方用代码，需要理解的地方才用模型。",
    ],
    "07-工具选型": [
        "大部分想法活不过第一轮验证，所以别急着写代码。",
        "低代码上手快，一站式，适合验证；代码框架可控性强，适合生产；开源方案能私有化。",
        "正确的顺序是：先用低代码跑通，确认有价值，再用代码重构上生产。",
    ],
    "08-三大瓶颈": [
        "训练是一次性的，推理是持续的。很多团队最后发现，成本黑洞在推理这一侧。",
        "第一是算力，第二是偏见，第三是隐私和能耗。",
        "出路是让模型更小更省，同时让答案可被外部验证，而不是去解释一个黑盒。",
    ],
    "08-四条降本路线": [
        "六千亿参数，每次只激活一百多亿，这是混合专家的全部秘密。",
        "蒸馏让小的学大的，量化把 32 位压到 4 位，稀疏化只激活一部分，高效架构从根上减计算。",
        "大参数量决定能力上限，激活参数量决定单次成本。",
    ],
    "08-社会影响": [
        "被替代的不是人，而是那些可以被清晰描述的重复步骤。",
        "重复劳动被自动化，专家效率被增强，新岗位同时长出来。",
        "应对的办法不是和人工智能比速度，而是往定义问题、判断结果、承担责任的位置走。",
    ],
}


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        raise RuntimeError(f"命令失败: {' '.join(cmd[:6])}...\n{r.stderr[-800:]}")
    return r.stdout


async def synth(text, out_mp3):
    import edge_tts
    comm = edge_tts.Communicate(text, VOICE, rate=RATE)
    await comm.save(out_mp3)


async def synth_all_texts(items, tmpdir):
    for i, (text, out) in enumerate(items):
        for attempt in range(3):
            try:
                await synth(text, out)
                break
            except Exception as e:
                if attempt == 2:
                    raise
                print(f"    重试 {i+1} ... ({e.__class__.__name__})")
                await asyncio.sleep(1.5)


def duration(path):
    out = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
               "-of", "default=nw=1:nk=1", path])
    return float(out.strip())


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    os.makedirs(VOICE_DIR, exist_ok=True)

    targets = {k: v for k, v in SCRIPT.items() if only is None or k == only}
    if not targets:
        print(f"找不到 {only}")
        return

    print(f"音色: {VOICE}  语速: {RATE}  共 {len(targets)} 段\n")

    for idx, (name, lines) in enumerate(targets.items(), 1):
        mp4 = os.path.join(ANIM_DIR, f"{name}.mp4")
        if not os.path.exists(mp4):
            print(f"[{idx}] 跳过 {name}（视频不存在）")
            continue

        print(f"[{idx}] {name}")
        tmpdir = os.path.join(VOICE_DIR, "_tmp")
        os.makedirs(tmpdir, exist_ok=True)

        # 1. 三段分别合成
        seg_files = []
        to_synth = []
        for j, line in enumerate(lines):
            seg = os.path.join(tmpdir, f"seg{j}.mp3")
            to_synth.append((line, seg))
            seg_files.append(seg)
        asyncio.run(synth_all_texts(to_synth, tmpdir))

        # 2. 用静音补齐/压缩到精确的 8 秒槽位
        padded = []
        for j, seg in enumerate(seg_files):
            d = duration(seg)
            slot = os.path.join(tmpdir, f"slot{j}.wav")
            if d > BEAT:  # 太长则轻微加速压缩
                speed = d / (BEAT - 0.15)
                filt = f"atempo={speed:.4f}"
                run(["ffmpeg", "-y", "-i", seg, "-filter:a", filt,
                     "-ar", "44100", "-ac", "1", slot, "-loglevel", "error"])
                print(f"    分镜{j+1}: {d:.1f}s 超长 → 加速至 {BEAT}s")
            else:
                # 补静音到 8 秒（前面留 0.35s 起手）
                pad_head = 0.35
                pad_tail = max(0.0, BEAT - d - pad_head)
                filt = (f"adelay={int(pad_head*1000)}|{int(pad_head*1000)},"
                        f"apad=pad_dur={pad_tail:.3f}")
                run(["ffmpeg", "-y", "-i", seg, "-filter:a", filt,
                     "-ar", "44100", "-ac", "1", "-t", str(BEAT),
                     slot, "-loglevel", "error"])
            padded.append(slot)

        # 3. 三段拼接成 24 秒
        concat_txt = os.path.join(tmpdir, "concat.txt")
        with open(concat_txt, "w", encoding="utf-8") as f:
            for p in padded:
                f.write(f"file '{p.replace(chr(92), '/')}'\n")

        final_wav = os.path.join(VOICE_DIR, f"{name}.wav")
        run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
             "-ar", "44100", "-ac", "1", final_wav, "-loglevel", "error"])

        # 4. 混进视频
        out_mp4 = os.path.join(tmpdir, f"{name}.mp4")
        run(["ffmpeg", "-y", "-i", mp4, "-i", final_wav,
             "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
             "-map", "0:v:0", "-map", "1:a:0", "-shortest",
             out_mp4, "-loglevel", "error"])
        os.replace(out_mp4, mp4)

        total = duration(final_wav)
        print(f"    ✓ 音轨 {total:.1f}s 已混入 {os.path.basename(mp4)}")

    # 清理临时文件
    tmp = os.path.join(VOICE_DIR, "_tmp")
    if os.path.isdir(tmp):
        for f in os.listdir(tmp):
            try:
                os.remove(os.path.join(tmp, f))
            except OSError:
                pass
        os.rmdir(tmp)
    print("\n全部完成")


if __name__ == "__main__":
    main()
