import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { Scene, Card, Row, Stat } from './scenes';

/* ══════════════════════════════════════════════════════════════
   全局参数
   ══════════════════════════════════════════════════════════════ */
const FPS = 30;
// 24s = 720 帧，三个分镜各 240 帧（8s）—— 内容从容不赶
const BEAT = 240;
const TOTAL = BEAT * 3;

/* ══════════════════════════════════════════════════════════════
   基础动画助手
   ══════════════════════════════════════════════════════════════ */

/** 淡入上浮 */
const useIn = (delay: number, dur = 16) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - delay, fps: FPS, config: { damping: 200 }, durationInFrames: dur });
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
  };
};

/** 弹簧弹入 */
const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - delay, fps: FPS, config: { damping: 13, stiffness: 130 } });
  return {
    opacity: Math.min(1, s),
    transform: `scale(${interpolate(s, [0, 1], [0.55, 1])})`,
  };
};

/** 字节跳动风格的逐帧文字揭示 */
const useByteReveal = (delay: number) => {
  const frame = useCurrentFrame();
  return {
    clipPath: `inset(0 ${100 - Math.min(100, Math.max(0, ((frame - delay) / 14) * 100))}% 0 0)`,
    opacity: frame > delay ? 1 : 0,
  };
};

/* ══════════════════════════════════════════════════════════════
   背景
   ══════════════════════════════════════════════════════════════ */
const Backdrop: React.FC<{ a: string; b: string; phase: number }> = ({ a, b, phase }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const drift = (k: number) => Math.sin(t * 0.5 + k) * 70;

  return (
    <AbsoluteFill style={{ background: '#080910', overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at 50% 45%, #000 8%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 45%, #000 8%, transparent 76%)',
          transform: `translate(${phase * 24}px, 0)`,
          transition: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1100,
          height: 1100,
          left: -300 + drift(0) - phase * 120,
          top: -420 + drift(2),
          borderRadius: '50%',
          background: a,
          filter: 'blur(160px)',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 950,
          height: 950,
          right: -280 + drift(1.4) + phase * 120,
          bottom: -440 + drift(3),
          borderRadius: '50%',
          background: b,
          filter: 'blur(160px)',
          opacity: 0.38,
        }}
      />
      {/* 扫描光带 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(112deg, transparent 40%, ${a}1f 50%, transparent 60%)`,
          transform: `translateX(${interpolate((frame % 210) / 210, [0, 1], [-80, 80])}%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.04,
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
        }}
      />
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════
   分镜指示器（1 2 3）
   ══════════════════════════════════════════════════════════════ */
const BeatDots: React.FC<{ active: number; a: string; b: string }> = ({ active, a, b }) => (
  <div style={{ position: 'absolute', top: 62, right: 90, display: 'flex', gap: 10 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: i === active ? 46 : 14,
          height: 6,
          borderRadius: 3,
          background: i === active ? `linear-gradient(90deg, ${a}, ${b})` : 'rgba(255,255,255,0.22)',
          transition: 'none',
        }}
      />
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════════
   分镜 1：PITCH —— 大字立论
   ══════════════════════════════════════════════════════════════ */
const PitchBeat: React.FC<{ scene: Scene; local: number }> = ({ scene, local }) => {
  const { accent, accent2 } = scene;
  const r1 = useByteReveal(8);
  const r2 = useByteReveal(24);
  const subIn = useIn(40, 20);

  // 巨大的装饰性圆环，持续旋转
  const rot = local * 0.5;

  return (
    <AbsoluteFill style={{ padding: '100px 140px', justifyContent: 'center' }}>
      {/* 背后大圆环 */}
      <div
        style={{
          position: 'absolute',
          right: -180,
          top: '50%',
          marginTop: -340,
          width: 680,
          height: 680,
          borderRadius: '50%',
          border: `2px solid ${accent}38`,
          transform: `rotate(${rot}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            width: 20,
            height: 20,
            marginLeft: -10,
            borderRadius: '50%',
            background: accent2,
            boxShadow: `0 0 24px ${accent2}`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: '50%',
          marginTop: -230,
          width: 460,
          height: 460,
          borderRadius: '50%',
          border: `2px dashed ${accent2}2e`,
          transform: `rotate(${-rot * 1.6}deg)`,
        }}
      />

      <div style={{ maxWidth: 1320 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 26,
          }}
        >
          <div style={{ width: 40, height: 3, background: accent, boxShadow: `0 0 14px ${accent}` }} />
          <span style={{ fontSize: 21, letterSpacing: 6, fontWeight: 800, color: accent }}>
            {scene.kicker}
          </span>
        </div>

        <h1
          style={{
            ...r1,
            margin: 0,
            fontSize: scene.pitch.big.length > 12 ? 84 : 100,
            lineHeight: 1.18,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: -2,
            textShadow: `0 0 80px ${accent}55`,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {scene.pitch.big}
        </h1>

        <p
          style={{
            ...r2,
            fontSize: 38,
            lineHeight: 1.5,
            color: '#B4BACD',
            marginTop: 30,
            marginBottom: 0,
            fontWeight: 500,
            maxWidth: 1150,
          }}
        >
          {scene.pitch.sub}
        </p>

        <div style={{ ...subIn, display: 'flex', gap: 14, marginTop: 44, flexWrap: 'wrap' }}>
          {scene.pitch.tags.map((tag, i) => (
            <div
              key={i}
              style={{
                padding: '12px 28px',
                borderRadius: 999,
                fontSize: 23,
                fontWeight: 800,
                color: '#fff',
                background: `linear-gradient(135deg, ${accent}33, ${accent2}33)`,
                border: `1px solid ${i % 2 ? accent2 : accent}77`,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════
   分镜 2：EXPLAIN —— 卡片 / 对比表 / 数字
   ══════════════════════════════════════════════════════════════ */
const MiniCard: React.FC<{ c: Card; delay: number; a: string; b: string; i: number }> = ({
  c,
  delay,
  a,
  b,
  i,
}) => {
  const st = usePop(delay);
  return (
    <div
      style={{
        ...st,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 22,
        padding: '34px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: 52, lineHeight: 1.1 }}>{c.icon}</div>
      <div style={{ fontSize: 29, fontWeight: 900, color: '#fff', marginTop: 14 }}>{c.title}</div>
      <div style={{ fontSize: 20, color: '#9BA2B8', marginTop: 8, lineHeight: 1.45 }}>{c.sub}</div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: i % 2 ? `linear-gradient(90deg,${b},${a})` : `linear-gradient(90deg,${a},${b})`,
        }}
      />
    </div>
  );
};

const ExplainRow: React.FC<{ r: Row; delay: number; a: string; b: string }> = ({ r, delay, a, b }) => {
  const st = useIn(delay, 14);
  return (
    <div
      style={{
        ...st,
        display: 'grid',
        gridTemplateColumns: '200px 1fr 1fr',
        gap: 20,
        alignItems: 'center',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '22px 24px',
      }}
    >
      <span style={{ fontSize: 23, fontWeight: 900, color: '#fff' }}>{r.label}</span>
      <span style={{ fontSize: 24, color: '#CBD0E0', lineHeight: 1.4 }}>{r.a}</span>
      <span style={{ fontSize: 24, color: '#CBD0E0', lineHeight: 1.4 }}>{r.b}</span>
    </div>
  );
};

const ExplainBeat: React.FC<{ scene: Scene; local: number }> = ({ scene, local }) => {
  const { accent, accent2 } = scene;
  const { explain } = scene;
  const headIn = useIn(4, 16);

  const cardCount = explain.cards?.length ?? 0;
  const cols = cardCount > 4 ? 3 : cardCount === 4 ? 2 : cardCount || 1;

  return (
    <AbsoluteFill style={{ padding: '88px 120px 96px', display: 'flex', flexDirection: 'column' }}>
      <h2
        style={{
          ...headIn,
          margin: 0,
          fontSize: 62,
          fontWeight: 900,
          color: '#fff',
          letterSpacing: -1.5,
        }}
      >
        {explain.heading}
      </h2>
      <div
        style={{
          width: 90,
          height: 5,
          marginTop: 16,
          borderRadius: 3,
          background: `linear-gradient(90deg,${accent},${accent2})`,
          opacity: headIn.opacity,
        }}
      />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: 6 }}>
        {/* 卡片组 */}
        {explain.cards && (
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 22,
              alignItems: 'start',
            }}
          >
            {explain.cards.map((c, i) => (
              <MiniCard key={i} c={c} delay={20 + i * 8} a={accent} b={accent2} i={i} />
            ))}
          </div>
        )}

        {/* 对比表 */}
        {explain.rows && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr 1fr',
                gap: 20,
                padding: '0 24px',
                fontSize: 18,
                letterSpacing: 3,
                fontWeight: 800,
                color: '#767D95',
              }}
            >
              <span />
              <span style={{ color: accent }}>A 面</span>
              <span style={{ color: accent2 }}>B 面</span>
            </div>
            {explain.rows.map((r, i) => (
              <ExplainRow key={i} r={r} delay={16 + i * 10} a={accent} b={accent2} />
            ))}
          </div>
        )}
      </div>

      {/* 底部补充说明，逐条出现 */}
      {explain.notes && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 8 }}>
          {explain.notes.map((n, i) => {
            const st = useIn(70 + i * 16, 16);
            return (
              <div
                key={i}
                style={{
                  ...st,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: 24,
                  color: '#9BA2B8',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: i % 2 ? accent2 : accent, fontWeight: 900 }}>▸</span>
                <span>{n}</span>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════
   分镜 3：APPLY —— 要点 + 横向流程
   ══════════════════════════════════════════════════════════════ */
const ApplyBeat: React.FC<{ scene: Scene; local: number }> = ({ scene, local }) => {
  const { accent, accent2 } = scene;
  const { apply } = scene;
  const headIn = useIn(4, 16);

  return (
    <AbsoluteFill style={{ padding: '88px 120px 96px', display: 'flex', flexDirection: 'column' }}>
      <h2
        style={{
          ...headIn,
          margin: 0,
          fontSize: 60,
          fontWeight: 900,
          color: '#fff',
          letterSpacing: -1.5,
        }}
      >
        {apply.heading}
      </h2>
      <div
        style={{
          width: 90,
          height: 5,
          marginTop: 16,
          borderRadius: 3,
          background: `linear-gradient(90deg,${accent2},${accent})`,
          opacity: headIn.opacity,
        }}
      />

      {/* 要点列表 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          justifyContent: 'center',
          marginTop: 6,
        }}
      >
        {apply.bullets.map((b, i) => {
          const st = useIn(16 + i * 17, 16);
          return (
            <div
              key={i}
              style={{
                ...st,
                display: 'flex',
                gap: 18,
                alignItems: 'center',
                background: 'rgba(255,255,255,0.045)',
                borderLeft: `5px solid ${i % 2 ? accent2 : accent}`,
                borderTop: '1px solid rgba(255,255,255,0.07)',
                borderRight: '1px solid rgba(255,255,255,0.07)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '18px 26px',
              }}
            >
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 900,
                  color: i % 2 ? accent2 : accent,
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: 26,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 28, lineHeight: 1.45, color: '#E6E9F2', fontWeight: 500 }}>{b}</span>
            </div>
          );
        })}
      </div>

      {/* 横向流程条 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'nowrap' }}>
        {apply.steps.map((s, i) => {
          const appear = 26 + i * 11;
          const st = spring({ frame: local - appear, fps: FPS, config: { damping: 200 } });
          const lit = local > appear + 12;
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: st,
                  transform: `translateX(${interpolate(st, [0, 1], [-16, 0])}px)`,
                  padding: '13px 26px',
                  borderRadius: 999,
                  fontSize: 23,
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  color: '#fff',
                  background: `linear-gradient(135deg,${accent}${lit ? '55' : '22'},${accent2}${lit ? '55' : '22'})`,
                  border: `1px solid ${accent}${lit ? 'cc' : '55'}`,
                  boxShadow: lit ? `0 0 24px ${accent}44` : 'none',
                }}
              >
                {s}
              </div>
              {i < apply.steps.length - 1 && (
                <div style={{ opacity: st, fontSize: 24, fontWeight: 900, color: accent }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════
   主模板 —— 三个分镜串起来
   ══════════════════════════════════════════════════════════════ */
export const SceneTemplate: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { accent, accent2 } = scene;

  // 当前在第几个分镜
  const beat = Math.min(2, Math.floor(frame / BEAT));
  const local = frame - beat * BEAT;

  // 转场：每个分镜首尾各 10 帧淡出淡入
  const beatFade = interpolate(
    local,
    [0, 10, BEAT - 12, BEAT],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 整段首尾淡入淡出
  const totalFade = interpolate(frame, [0, 8, TOTAL - 12, TOTAL], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const progress = interpolate(frame, [0, TOTAL], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: totalFade, fontFamily: '"Segoe UI","Microsoft YaHei",sans-serif' }}>
      <Backdrop a={accent} b={accent2} phase={beat} />

      {/* 顶部总进度条 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 5,
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg,${accent},${accent2})`,
          boxShadow: `0 0 18px ${accent}`,
        }}
      />

      <BeatDots active={beat} a={accent} b={accent2} />

      <AbsoluteFill style={{ opacity: beatFade }}>
        {beat === 0 && <PitchBeat scene={scene} local={local} />}
        {beat === 1 && <ExplainBeat scene={scene} local={local} />}
        {beat === 2 && <ApplyBeat scene={scene} local={local} />}
      </AbsoluteFill>

      {/* 底部品牌条 */}
      <div
        style={{
          position: 'absolute',
          bottom: 26,
          left: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: 0.5,
        }}
      >
        <div style={{ width: 22, height: 2, background: accent }} />
        <span style={{ fontSize: 17, letterSpacing: 4, color: '#8A90A6', fontWeight: 700 }}>
          {scene.title}
        </span>
      </div>
    </AbsoluteFill>
  );
};
