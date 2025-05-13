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

## 使用 Git Hook 强制实施 Conventional Commit

### 使用原生 Git Hook 实施 Conventional Commit

在 Hook 脚本中，你可以编写任何你想要的逻辑。以 repo 中的 `commit-msg` 脚本为例，下面将演示如何使用 `commit-msg` 并解释每一部分代码的作用。

#### 使用方法

1. 将此脚本放入 Git 仓库的 `.git/hooks` 目录中。
2. 确保文件名为 `commit-msg`（无扩展名）。
3. 给予执行权限：
   ```bash
   chmod +x .git/hooks/commit-msg
   ```

####  提交消息处理

```bash
# Get the commit message
commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# Remove comment lines (starting with '#') to get actual message content
cleaned_msg=$(echo "$commit_msg" | grep -v '^#')
```

此部分代码：
- 获取 Git 传入的提交消息文件路径（`$1`）
- 读取文件内容
- 过滤掉以 `#` 开头的注释行，只保留用户实际输入的消息内容


#### 标题行格式验证

```bash
# Regex pattern: check the commit header format
pattern="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\([a-zA-Z0-9_-]+\))?!?: .+"

# Get the first line of the commit message (header line)
first_line=$(echo "$cleaned_msg" | head -n 1)

# Check if the first line matches the Conventional Commit format
if ! echo "$first_line" | grep -qE "$pattern"; then
  echo "The first line of the commit message does not follow the Conventional Commit format."
  exit 1
fi
```

此段代码：
- 定义了符合规范的正则表达式模式
- 提取提交消息的第一行
- 检查是否符合格式要求：`类型(可选作用域)!?: 描述`
- 不符合则输出错误信息并阻止提交



#### 主题长度检查

```bash
# Get the subject behind the colon
# Check the length of the subject 
subject=$(echo "$first_line" | sed -E 's/^.*: //')
if [ ${#subject} -gt 50 ]; then
  echo "The subject (after the colon) must not exceed 50 characters."
  exit 1
fi
```

此部分：
- 使用 `sed` 提取冒号后的主题内容
- 检查主题长度是否超过50个字符
- 超过则输出错误信息并阻止提交

#### 标点符号检查

```bash
# Check if the first line ends with a period
if [[ "$first_line" =~ \.$ ]]; then
  echo "The first line of the commit message must not end with a period."
  exit 1
fi
```

此部分检查标题行是否以句号结尾，违反规范则阻止提交。

#### 空行规范检查

```bash
# Check if the second line is empty (separating body from header)
# Only check if there is a second line
second_line=$(echo "$cleaned_msg" | sed -n '2p')

if [ -n "$second_line" ]; then
  if [[ ! "$second_line" =~ ^\s*$ ]]; then
    echo "The second line must be empty (used to separate header from body)."
    exit 1
  fi
fi
```

此部分：
- 提取消息的第二行
- 如果第二行存在，检查是否为空行
- 不是空行则输出错误信息并阻止提交

#### 正文行长检查

```bash
# Check if each line in the body exceeds 72 characters
body_lines=$(echo "$cleaned_msg" | tail -n +3) # Get all lines after the second line (body)

for line in $body_lines; do
  if [ ${#line} -gt 72 ]; then
    echo "Each line in the commit body must not exceed 72 characters."
    exit 1
  fi
done
```

此部分：
- 获取从第三行开始的所有正文内容
- 遍历每一行，检查长度是否超过72个字符
- 超过则输出错误信息并阻止提交

#### 破坏性变更格式检查

```bash
# Check for a properly formatted BREAKING CHANGE in the footer
footer=$(echo "$cleaned_msg" | grep -i "BREAKING CHANGE:")

if [[ -n "$footer" && ! "$footer" =~ ^BREAKING[[:space:]]CHANGE: ]]; then
  echo "BREAKING CHANGE must be formatted as: BREAKING CHANGE: ..."
  exit 1
fi
```

此部分：
- 在提交消息中查找包含 "BREAKING CHANGE:" 的行
- 如果存在，检查格式是否正确
- 格式不正确则输出错误信息并阻止提交

#### 完成验证

```bash
# Allow the commit if all checks pass
exit 0
```

所有验证都通过后，脚本以状态码 0 退出，允许 Git 提交继续进行。

