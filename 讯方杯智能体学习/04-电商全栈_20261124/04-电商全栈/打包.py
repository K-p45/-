# -*- coding: utf-8 -*-
"""
把整个笔记库打包成一个 zip，发给同学。

自动排除：
- node_modules（800MB 的依赖，可重装）
- .obsidian/workspace.json（只记录"我自己"的窗口状态）

用法：
    python 打包.py
"""

import os
import sys
import zipfile
import datetime

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VAULT = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(VAULT)), '_打包')
if not os.path.isdir(OUT_DIR):
    OUT_DIR = os.path.dirname(VAULT)
STAMP = datetime.date.today().strftime("%Y%m%d")
VAULT_NAME = os.path.basename(VAULT.rstrip("\\/"))
ZIP_NAME = f"{VAULT_NAME}_{STAMP}.zip"
ZIP_PATH = os.path.join(OUT_DIR, ZIP_NAME)

# 排除规则
EXCLUDE_DIRS = {"node_modules", ".git", "out", ".remotion", "__pycache__"}
EXCLUDE_FILES = {
    "workspace.json",          # Obsidian 窗口状态，每个人的都不一样
    "workspace-mobile.json",
}
EXCLUDE_EXT = {".pyc", ".log"}


def should_skip(rel_path, name):
    parts = rel_path.replace("\\", "/").split("/")
    for p in parts:
        if p in EXCLUDE_DIRS:
            return True
    if name in EXCLUDE_FILES:
        return True
    if os.path.splitext(name)[1].lower() in EXCLUDE_EXT:
        return True
    return False


def main():
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)

    files = []
    total = 0
    for root, dirs, filenames in os.walk(VAULT):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for fn in filenames:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, VAULT)
            if should_skip(rel, fn):
                continue
            files.append((full, rel))
            total += os.path.getsize(full)

    print(f"准备打包 {len(files)} 个文件，共 {total/1048576:.1f} MB")
    print(f"输出: {ZIP_PATH}\n")

    # 压缩率：视频已是压缩格式，用 ZIP_STORED 更快更省 CPU
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        # 顶层目录名，解压后能得到一个完整文件夹
        top = VAULT_NAME
        for i, (full, rel) in enumerate(files, 1):
            arc = f"{top}/{rel}".replace("\\", "/")
            ext = os.path.splitext(rel)[1].lower()
            # mp4/png/jpg/zip 本身已压缩，直接存储
            if ext in {".mp4", ".png", ".jpg", ".jpeg", ".webp", ".mp3", ".zip"}:
                zi = zipfile.ZipInfo.from_file(full, arc)
                zi.compress_type = zipfile.ZIP_STORED
                with open(full, "rb") as fh, z.open(zi, "w") as out:
                    out.write(fh.read())
            else:
                z.write(full, arc)
            if i % 5 == 0 or i == len(files):
                print(f"  [{i}/{len(files)}] {rel}")

    size = os.path.getsize(ZIP_PATH)
    print(f"\n✅ 打包完成")
    print(f"   文件: {ZIP_NAME}")
    print(f"   大小: {size/1048576:.1f} MB")

    # 校验
    with zipfile.ZipFile(ZIP_PATH) as z:
        bad = z.testzip()
        n = len(z.namelist())
        has_nm = any("node_modules" in x for x in z.namelist())
    print(f"   条目: {n}")
    print(f"   完整性: {'✅ 通过' if bad is None else '❌ 损坏: ' + bad}")
    print(f"   node_modules: {'❌ 混入了！' if has_nm else '✅ 已排除'}")


if __name__ == "__main__":
    main()
