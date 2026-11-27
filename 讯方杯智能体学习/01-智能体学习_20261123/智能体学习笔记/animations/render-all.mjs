/**
 * 一条命令渲染全部动画。
 *   npm run render
 *
 * 只渲染 scenes.ts 里有、out/ 里还没有的；加 --force 全部重渲。
 * 输出到 Obsidian 仓库内的 动画/ 目录，笔记里用 ![[名字.mp4]] 嵌入。
 */
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FORCE = process.argv.includes('--force');

// 输出目录：Obsidian 仓库里的 动画/
const OUT_DIR = path.resolve(__dirname, '..', '动画');
fs.mkdirSync(OUT_DIR, { recursive: true });

// 从 scenes.ts 里读 id 列表（不 import，避免 TS 编译链依赖）
const scenesSrc = fs.readFileSync(path.join(__dirname, 'src', 'scenes.ts'), 'utf8');
const ids = [...scenesSrc.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

console.log(`共 ${ids.length} 个场景，输出到 ${OUT_DIR}\n`);

console.log('打包 Remotion 工程...');
const bundled = await bundle({
  entryPoint: path.join(__dirname, 'src', 'index.ts'),
  onProgress: () => {},
});
console.log('打包完成\n');

let done = 0;
for (const id of ids) {
  const outFile = path.join(OUT_DIR, `${id}.mp4`);
  if (!FORCE && fs.existsSync(outFile)) {
    console.log(`[skip] ${id}.mp4 已存在`);
    done++;
    continue;
  }

  const composition = await selectComposition({ serveUrl: bundled, id });
  const t0 = Date.now();
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: 'h264',
    outputLocation: outFile,
    imageFormat: 'jpeg',
    jpegQuality: 88,
    everyNthFrame: 1,
    onProgress: ({ progress }) => {
      const pct = Math.round(progress * 100);
      process.stdout.write(`\r[${id}] ${pct}%   `);
    },
  });
  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\r[done] ${id}.mp4  (${sec}s)          `);
  done++;
}

console.log(`\n全部完成：${done}/${ids.length} 个动画`);
console.log(`打开 Obsidian，笔记里的 ![[xxx.mp4]] 会直接播放。`);
