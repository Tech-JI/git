# Git Hook Tutorial

## 目录
1. [Git Hook 简介](#git-hook-简介)
2. [使用 Git Hook 强制实施 Conventional Commit](#使用-git-hook-强制实施-conventional-commit)
3. [基于 Conventional Commit 自动生成 Changelog](#基于-conventional-commit-自动生成-changelog)

## Git Hook 简介

### 什么是 Git Hook？

Git Hook 是在 Git 仓库中特定事件发生时自动触发运行的脚本。这些"钩子"允许自定义 Git 的内部行为，并在提交代码、推送更改等关键时刻触发自定义操作。

Git Hooks 位于每个 Git 仓库的 `.git/hooks` 目录中。Git 默认提供了一系列示例钩子（以 `.sample` 为后缀）。要启用一个钩子，只需移除 `.sample` 后缀并确保该脚本可执行。

`.git` 目录在IDE中通常是默认隐藏的，可以更改设置以显示。以VSCode为例，使用快捷键 `Ctrl + ,`（Windows/Linux）或 `Cmd + ,`（Mac）打开设置，在搜索框中输入`files.exclude`，找到`**/.git`并删除或取消勾选该条目。

### Git Hook 的类型

Git Hooks 主要分为两类：

1. **客户端钩子**：在开发者本地执行 Git 操作时触发，如：
   - `pre-commit`: 在提交前运行，可用于检查代码质量
   - `prepare-commit-msg`: 在提交消息编辑器显示之前运行，可用于生成或修改默认消息
   - `commit-msg`: 在提交消息创建后运行，可用于验证提交消息格式
   - `post-commit`: 在提交完成后运行，通常用于通知

2. **服务器端钩子**：在服务器接收推送时触发，如：
   - `pre-receive`: 在服务器接收推送之前运行
   - `update`: 类似于 pre-receive 但针对每个被推送的分支运行
   - `post-receive`: 在整个推送过程完成后运行

### 为什么使用 Git Hook？

Git Hooks 可以帮助团队：
- 强制实施编码标准和提交规范
- 防止低质量代码进入代码库
- 自动化测试、部署和发布流程
- 保持提交记录的一致性和可读性
- 简化版本管理和发布过程