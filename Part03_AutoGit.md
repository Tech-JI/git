# Part 3 Auto Git

- [Part 3 Auto Git](#part-3-auto-git)
  - [Git Hook 与 Husky](#git-hook-与-husky)
    - [什么是 Git Hook ？](#什么是-git-hook-)
    - [Husky 是干什么的 ？](#husky-是干什么的-)
    - [Husky 的原理](#husky-的原理)
    - [Husky + commitlint + lint-staged](#husky--commitlint--lint-staged)
  - [Auto Changelog](#auto-changelog)
    - [conventional-changelog-cli](#conventional-changelog-cli)
    - [standard-version(语义管理git版本)(更全面)](#standard-version语义管理git版本更全面)
    - [其他工具](#其他工具)
  - [.gitignore](#gitignore)
    - [常见忽略内容分类与说明](#常见忽略内容分类与说明)
    - [.gitignore 的具体写法](#gitignore-的具体写法)
  - [.json](#json)
  - [Node.js 相关核心工具](#nodejs-相关核心工具)
    - [nvm（Node Version Manager）](#nvmnode-version-manager)
    - [npm（Node Package Manager）](#npmnode-package-manager)
    - [package.json / package-lock.json](#packagejson--package-lockjson)
    - [node\_modules/](#node_modules)
  - [Bun(类似于nvm+npm+npx)](#bun类似于nvmnpmnpx)
  - [Github 基础](#github-基础)
  - [参考资料](#参考资料)

## Git Hook 与 Husky 

### 什么是 Git Hook ？

首先，初始化git仓库；
```Bash
git init
```
可以发现当前目录出现了.git目录；
```Bash
ls -a    #展示所有文件    
```
如果使用VScode,可以更改设置以显示，使用快捷键 `Ctrl` + `,`（Windows/Linux）或 `Cmd` + `,`（Mac）打开设置，在搜索框中输入`files.exclude`，找到`**/.git`并删除或取消勾选该条目。

可以发现，在.git目录中存在hooks目录，里面存有*.sample的文件，这些是git仓库自带的hooks模板。

Git Hook 是在 Git 仓库中特定事件发生时自动触发运行的脚本。这些"钩子"允许自定义 Git 的内部行为，并在提交代码、推送更改等关键时刻触发自定义操作。主要分为两类：
1. **客户端钩子**：在开发者本地执行 Git 操作时触发，如：
   - `pre-commit`: 在提交前运行，可用于检查代码质量
   - `prepare-commit-msg`: 在提交消息编辑器显示之前运行，可用于生成或修改默认消息
   - `commit-msg`: 在提交消息创建后运行，可用于验证提交消息格式
   - `post-commit`: 在提交完成后运行，通常用于通知

2. **服务器端钩子**：在服务器接收推送时触发，如：
   - `pre-receive`: 在服务器接收推送之前运行
   - `update`: 类似于 pre-receive 但针对每个被推送的分支运行
   - `post-receive`: 在整个推送过程完成后运行

比如说，如果希望`git commit`之前检查代码，可以使用`pre-commit`在里面设置检查代码质量的命令；又或者希望规范commits格式，可以使用`commit-msg`在里面设置检查commit messages的命令。

这里以`commit-msg`为例

注意，使用hooks前需要给予文件可执行权限
```bash
chmod +x .git/hooks/commit-msg 
```

如果我们希望，上传的`commit`满足某些规范（比如说conventional commits），可以通过执行检擦commit消息的命令，实现commit规范。
```bash
# Read the commit message from the file
commit_msg_file="$1"
commit_msg=$(cat "$commit_msg_file")

# Define the regex pattern for Conventional Commits
pattern="^(feat|fix|docs|style|refactor|test|chore)(\(\w+\))?: .+"

# Check if the commit message matches the pattern
if ! echo "$commit_msg" | grep -Eq "$pattern"; then
  echo >&2 "error: conflicts with Conventional Commits. "
  echo >&2 "example: feat(tutorial): some samples"
  echo >&2 "reference: https://www.conventionalcommits.org"
  exit 1
fi  
```

### Husky 是干什么的 ？
可以发现，我们完全可以通过配合hooks文件实现自动化git管理，但是在团队协作中，`.git/hooks` 目录不会随代码库一同分发，所以 `.git` 目录不受版本控制。这使得在团队中强制实施 Git Hooks 变得困难。这就是为什么我们推荐使用像 Husky 这样的工具来管理 Git Hooks。(要求安装Node.js与npm)

首先，使用npm初始化项目（创建package.json文件）
```bash
npm init -y   # 自动生成基础配置
```
然后，安装husky
```bash
npm install husky -D    # -D 将包作为开发依赖（devDependency）安装
```
可以发现，这里创建出node_modules文件，非常的庞大，通常不希望提交到git仓库，使用可以使用.gitignore文件让git忽略特定的文件：在当前目录下，创建.gitignore文件，然后输入mode_modules。

最后初始化husky
```bash
npx husky install
```
Husky 官方教程：https://typicode.github.io/husky/

### Husky 的原理
此时原先的`.git/commit-msg`已经失效

终端里面输入
```bash
git config core.hooksPath
```
可以发现路径变成了`.husky/_`，这便是Huksy的工作原理：创建新的文件夹，更改git路径。而`_`是husky的内置hooks命令，不用去更改，新的hooks应该在`.husky`目录下创建。

最后相当于我们可以使用.husky去配置git hooks。

团队协作中，我们可以在`package.json`中配置安装指令，这样可以方便其他组员在`git pull`以后根据package.json自动安装husky。
```bash
npm set-script prepare "husky install"
```

### Husky + commitlint + lint-staged
**commitlint** 可以检查commit messages是否符合要求（配置文件）,安装如下：
```bash
npm install @commitlint/cli @commitlint/config-conventional -D
# @commitlint/cli Commitlint 的命令行工具（CLI，Command Line Interface）
# @commitlint/config-conventional 预设配置，基于 Conventional Commits 规范
```
这里可以在package.json中配置commitlint的具体内容
```json
  "commitlint": {
    "extends": ["@commitlint/config-conventional"],
    "rules": {
      "header-max-length": [2, "always", 72]
    }
  }
```
`rules`允许我们在converntional commits的基础上自定义其他的要求，比如
```json
  "rules": {
    // 新增规则：头部最大长度
    "header-max-length": [2, "always", 72],

    // 自定义类型限制（只允许下面这些 type）
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf", "ci"]
    ],

    // 强制 scope 必填
    "scope-empty": [2, "never"],

    // 禁止 subject 以句号结尾
    "subject-full-stop": [2, "never", "."]
  }
```

终端输入以下指令，可以在`.husky`目录下生成`commit-msg`
```bash
touch .husky/commit-msg
echo 'npx --no-install commitlint --edit "$1"' >> .husky/commit-msg
chmod +x .husky/commit-msg
```

**lint-staged**用于在提交前只对 Git 暂存区中的文件执行代码检查或格式化命令，例如 eslint、prettier、stylelint 等。
```bash
npm install lint-staged -D
```
然后同理，通过`package.json`配置lint-staged
```json
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.json": [
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,less,html}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
```
团队协作中，可以个人配置package.json文件，通过`prepare`功能帮助队友自动下载依赖。
```js
"scripts": {
  "prepare": "husky install", // 自动安装 husky
  "lint-staged": "lint-staged" // 定义 lint-staged 命令
}
```
## Auto Changelog
通过commitizen与git hooks的配合，我们应当想象拥有公式化的commits记录，此时可以配合其他npm的包来自动生成Changelog.md。

### conventional-changelog-cli
通过以下指令安装：
```bash
npm install conventional-changelog-cli -D
```
生成 Changelog 并输出到控制台：

```bash
npx conventional-changelog -p angular -i CHANGELOG.md -s
```

参数说明：
- `-p angular`：使用 angular 预设规范（也是最常用的规范）
- `-i CHANGELOG.md`：指定输入/输出文件
- `-s`：将内容输出到指定的文件（覆盖模式）

对于新项目，首次生成包含所有版本的 Changelog：

```bash
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

为了方便使用，可以在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "changelog:first": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```

然后可以使用以下命令生成 Changelog：

```bash
# 增量更新 Changelog
npm run changelog

# 首次生成完整 Changelog
npm run changelog:first
```
参数说明：
- `-r 0`：从第一个提交开始生成
### standard-version(语义管理git版本)(更全面)
通过以下指令安装：
```bash
npm install standard-version -D
```
可以通过以下指令发布
```bash
npx standard-version
```
或者可以将一系列功能集成起来
```json
"scripts": {
  "release": "standard-version"
}
```
`release`作为一个自定义的脚本名称，可以根据需要命名（例如 release、publish 等）

同样，`standard-version`可以在`package.json`中配置
官方文档：https://github.com/conventional-changelog/standard-version

### 其他工具
- 简单快速生成 changelog：standard-version、auto-changelog

- 自动化发布（CI/CD）：semantic-release

- 管理多包项目：lerna

- 更多发布流程控制：release-it

## .gitignore
### 常见忽略内容分类与说明

| 类别         | 示例                     | 说明                       |
|--------------|--------------------------|----------------------------|
| 依赖包文件夹 | `node_modules/`          | Node.js 依赖，体积大且可通过 `package.json` 还原 |
| 构建输出目录 | `dist/`、`build/`        | 编译或打包产物，一般由代码生成，不需提交 |
| 环境变量文件 | `.env`、`.env.local`     | 存放本地配置和敏感信息，避免泄露 |
| 日志文件     | `*.log`                  | 运行日志，无需版本管理     |
| 编辑器配置   | `.vscode/`、`.idea/`     | 开发者本地编辑器设置，不同人环境不同 |
| 操作系统文件 | `.DS_Store` (macOS)、`Thumbs.db` (Windows) | 系统自动生成文件，无意义 |
| 临时文件     | `*.tmp`、`*.swp`         | 临时缓存或编辑器临时文件   |
| 测试覆盖率   | `coverage/`              | 测试工具生成的覆盖率报告   |
| 证书和密钥   | `*.pem`、`*.key`         | 私钥和证书，必须保护       |

### .gitignore 的具体写法

- 空行会被忽略。
- 匹配是区分大小写的，例如 `/abc` 和 `/Abc` 含义不同。
- `#` 开头的是注释，会被忽略。
- `*` 表示匹配0到多个字符。
- `**` 表示匹配多层子目录，例如子目录、子子目录等。
- `?` 匹配**一个**字符（注意不是0或1个字符）。
- `[]` 用来匹配括号内的任一字符，例如 `[abc]`，也可以用连接符表示范围，如 `[0-9]` 匹配0至9的任意数字。
- `*~` 忽略所有以 `~` 结尾的文件（通常是许多编辑器生成的临时文件）。
- `*.[oa]` 忽略所有以 `.o` 或 `.a` 结尾的文件。
- `!` 表示不忽略某个文件。（为什么要特别指出“不忽略”？因为它常用于配合其他规则，比如要忽略 `*.log` 文件，但想排除 `a.log`，这时就需要用 `!a.log`。）
- 匹配规则前面不能留空格，否则规则会失效。例如 ` 一个空格Ab?.txt` 和 `Ab?.txt` 是不同的。


## .json
`package.json` 是 Node.js 和 npm 项目的核心配置文件，用于描述项目的元信息、依赖关系、脚本命令等。其基本结构如下：
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "it's my project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "author": "my name",
  "license": "SJTU"
}
```
| 字段                | 说明                     |
| ----------------- | ---------------------- |
| `name`            | 项目名称，必须小写，不允许空格        |
| `version`         | 项目版本，遵循语义化版本规范（SemVer） |
| `description`     | 项目简短描述                 |
| `main`            | 入口文件                   |
| `scripts`         | 自定义脚本命令                |
| `dependencies`    | 运行时依赖包                 |
| `devDependencies` | 开发时依赖包                 |
| `keywords`        | 项目关键词，有助于搜索            |
| `author`          | 作者信息                   |
| `license`         | 许可证类型                  |

package.json 的 scripts 字段用于定义一组经常使用的命令，简化日常开发流程。通过命令行输入：
```bash
npm run <script-name>
```
便可以快速执行对应的命令。

**作用**:
- 简化命令: 避免每次都输入复杂的命令行参数，只需执行简短的脚本名。

- 统一操作: 团队成员只需使用统一脚本，保证开发、测试、构建等流程一致，减少人为错误。

- 自动化流程: 配合持续集成（CI）/持续交付（CD）工具，可以自动执行测试、代码检查、构建等任务，提高效率和代码质量。


## Node.js 相关核心工具

###  nvm（Node Version Manager）
**用途**：管理多个 Node.js 版本。

**功能**：
- 安装多个版本的 Node.js
- 在项目之间灵活切换 Node.js 版本
- 设置默认版本以保持一致性

**安装方式（wsl2）**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

**常用命令**：
```bash
nvm install 22        # 安装 Node.js 22
nvm use 22            # 使用 Node.js 22
nvm ls                # 查看本地已安装版本
nvm alias default 22  # 设置默认版本为 22
```

### npm（Node Package Manager）

**用途**：Node.js 的官方包管理器，用于安装、管理和发布 JavaScript 包。

**功能**：
- 安装项目依赖
- 管理 `package.json`
- 运行项目脚本
- 发布 npm 包

**常用命令**：
```bash
npm init               # 初始化项目（创建 package.json）
npm install lodash     # 安装 lodash 模块
npm install            # 安装所有依赖（根据 package.json）
npm uninstall lodash   # 卸载模块
npm update             # 更新依赖
npm run dev            # 运行 package.json 中定义的脚本

#### npx（npm exec）

**用途**：执行项目中或远程的 npm 包命令，无需全局安装。

**功能**：
- 执行一次性命令
- 运行本地依赖的 CLI 工具
- 调用远程包直接执行

**常用命令**：
```bash
npx create-react-app my-app   # 创建 React 应用
npx eslint src/index.js       # 使用本地安装的 eslint 检查代码
npx serve                     # 启动一个本地静态服务器
```


### package.json / package-lock.json

**用途**：

- `package.json`：定义项目的依赖、脚本、版本号、作者信息等元数据。
- `package-lock.json`：锁定每个依赖的确切版本，保证构建过程的可重复性和一致性。

---

### node_modules/

**用途**：

- `node_modules/` 是 npm 安装的所有依赖包所在的目录。
- 不应手动修改内容。
- 通常应将其加入 `.gitignore`，避免提交到版本控制系统中。

## Bun(类似于nvm+npm+npx)
官方推荐通过安装脚本：
```bash
curl -fsSL https://bun.sh/install | bash
```
常用命令示例:
```bash
bun init           # 初始化项目，生成 package.json
bun install        # 安装依赖，替代 npm install
bun run <script>   # 运行 package.json 中 scripts 的命令
bun test           # 运行测试
bun build          # 打包项目
```

## Github 基础
Github 是一个基于 Git 的代码托管平台，广泛用于版本控制和协作开发。以下是使用 GitHub 的基本步骤：

1. **创建 Github 账号** ： 访问 https://github.com/
2. **利用 Git 连接本地仓库与远端仓库**
   
如果希望使用Github上面现有的远端仓库，那么可以利用`git clone`在本地创建相同的Git仓库
```bash
git clone <URL>
# git clone -b branch-name <UCR> 克隆特定分支
# git clone --depth x https://github.com/username/repository.git 克隆最近x次提交
```
`<URL>`可以在Github仓库里面的`Code`里面找到，通常有HTTP与SSH两种，HTTP不需要配置但是要求验证Github仓库，SSH则基于公钥与私钥验证更为方便。下面讲解SSH的配置过程：
1. 安装openssh（包括包含了 ssh、scp、sftp 等工具）
```bash
sudo apt update
sudo apt install openssh-client
```
2. 检查ssh文件
```bash
ls -al ~/.ssh
```

3. 生成公钥与私钥
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
或者使用（如果前者不行）
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

4. 配置ssh

可以找到 id_ed25519 和 id_ed25519.pub 这两个文件
用文本编辑器打开 id_ed25519.pub 文件，或者在终端中输入以下命令：
```bash
cat id_ed25519.pub
```
接着，打开 Github 。点击右上角的按钮，然后进入“Settings（设置）”。

在设置页面中，找到“SSH / GPG Keys”选项。

在 SSH Key 部分，点击“Add Key（添加密钥）”。

将你 id_ed25519.pub 文件中的内容粘贴到文本框中。如果成功，密钥名称会自动生成。你粘贴的内容应该类似于下面的格式：

```bash
ssh-ed25519 <some very long thing> your_email@example.com
```
然后点击“Add Key”按钮。系统会显示绿色的成功提示横幅。

重要提示：只复制公钥内容，也就是后缀为 .pub 的文件。不要复制或使用私钥。

3. **Github 常用的 Git 指令**
```bash
git branch -r # 显示远端仓库
git branch -vv # 显示远端仓库与本地仓库的连接情况
git remote add origin <UCL> # 本地仓库连接特定的远端仓库,origin可随意命名
git fetch # 获取远端更新
git pull  # git fetch + git merge 尝试覆盖本地文件（慎用）
git push # 本地commits推送到远端仓库
git checkout # 切换到指定分支，包括远端与本地，如果是远端会在本地生成相同的本地分支，形成连接
git branch --set-upstream-to=origin/<远程分支名> <本地分支名> # 设置关联
```


## 参考资料
ENGR1510JFA2024 &nbsp;&nbsp;&nbsp; doc: Git 

ENGR1000JSU2025-3 &nbsp;&nbsp;&nbsp; doc: Starting at SilverFOCS