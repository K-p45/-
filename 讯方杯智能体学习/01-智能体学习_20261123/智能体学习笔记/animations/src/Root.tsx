import React from 'react';
import { Composition } from 'remotion';
import { SceneTemplate } from './Scene';
import { SCENES, FPS, WIDTH, HEIGHT } from './scenes';

/**
 * 整个工程只注册「一类」composition：每个场景一条，
 * 全部套用同一个 SceneTemplate，尺寸/帧率统一。
 * 新增知识点 = 在 scenes.ts 加一条，这里自动多出一条 composition。
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {SCENES.map((scene) => (
        <Composition
          key={scene.id}
          id={scene.id}
          component={SceneTemplate}
          durationInFrames={Math.round(scene.duration * FPS)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ scene }}
        />
      ))}
    </>
  );
};
