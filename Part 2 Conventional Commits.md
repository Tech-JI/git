## 4. 什么是 Conventional Commit 以及为何使用

**Conventional Commit**（约定式提交通知）是一套为 Git 提交消息定义的规范化格式，最初由 [Conventional Commits 规范](https://www.conventionalcommits.org/) 提出。它通过在提交消息头部强制使用一组固定的“type”关键词（例如 `feat`、`fix`、`docs` 等），并可选地添加作用域（scope）、描述（subject）、正文（body）和脚注（footer），来确保团队的提交记录具有一致的结构和可读性。

### 我们为什么要用 Conventional Commit？

1. **自动化发布**
   基于提交类型（如 `feat`、`fix`、`BREAKING CHANGE`），可以自动推断出版本号更新策略（语义化版本控制SemVer）：

   * `feat` → **次版本（minor）**
   * `fix` → **补丁版本（patch）**
   * `BREAKING CHANGE` → **主版本（major）**
     这样结合 CI/CD 工具能自动生成 Changelog、打标签并发布新版本。

2. **更清晰的历史记录**
   通过统一的提交类型和格式，阅读 `git log` 时可以快速分辨一个提交是新增功能、修复 Bug 还是文档更新，有助于团队协作和代码审查。

3. **提高协作效率**

   * 代码审查者能立即了解改动意图。
   * 合作者可通过提交类型筛选需要重点验证的改动（例如 `fix` vs. `feat`）。
   * 自动化工具（如 Lint、Changelog generator、Release drafter）可直接识别这些结构化信息。

---

## 5. Conventional Commit 的常见格式（三段式提交格式），使用 Commitizen 在命令行生成

### 5.1 常见格式（Header / Body / Footer）

```text
<type>(<scope>)!?: <subject>

<body>

<footer>
```

* **Header标头（第一行）**

  * `type`：提交类型，常见有：

    * `feat`：新增功能
    * `fix`：修复 Bug
    * `docs`：文档变更
    * `style`：格式（不影响逻辑）
    * `refactor`：重构（既不是新增功能，也不是修复 Bug）
    * `perf`：性能优化
    * `test`：添加或修改测试
    * `chore`：构建过程或辅助工具变动
    * `build`: changes affecting the build system, eg. Makefile, dependencies
    * `ci`: 有关持续整合(在通过频繁地将代码集成到共享仓库中，并通过自动化构建和测试来验证每次集成的正确性，从而尽早发现和修复错误，确保代码库的稳定性)的提交, 比如 Gitea actions configuration
    * `revert`: 回退一次提交
  * `scope`（可选）：作用阈，影响的模块或功能，例如 `ui`、`api`、`auth`
  * `!`（可选）：表示本次提交包含向后兼容的重大变动（BREAKING CHANGE）
  * `subject`：简短描述（不超过 50 字，首字母小写，不以句号结尾）

了解更多：[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

* **Body正文（可选）**
  详细描述为何作此更改，以及与之前行为的对比，换行宽度建议在 72 字以内。

* **Footer脚注（可选）**

  * 用于关联 Issue（例如 `Closes #123`）
  * 标记 BREAKING CHANGE 并说明兼容性破坏的细节：

    ```text
    BREAKING CHANGE: 重构 X 模块，移除了 Y 接口。
    ```

* **举几个合法的例子:**

  * 有描述和BREAKING CHANGE Footer
    ```bash
    feat: allow provided config object to extend other configs

    BREAKING CHANGE: `extends` key in config file is now used for extending other config files
    ```

  * 用!来提示BREAKING CHANGE
    ```bash
    feat!: send an email to the customer when a product is shipped
    ```

  * 有scope并用!来提示BREAKING CHANGE
    ```bash
    feat(api)!: send an email to the customer when a product is shipped
    ```

  * 既有!又有BREAKING CHANGE
    ```bash
    chore!: drop support for Node 6

    BREAKING CHANGE: use JavaScript features not available in Node 6.
    ```

  * 没有Body
    ```bash
    docs: correct spelling of CHANGELOG
    ```

  * 有scope
    ```bash
    feat(lang): add Polish language
    ```

  * 有多段Body和多段Footer
    ```bash
    fix: prevent racing of requests

    Introduce a request id and a reference to latest request. Dismiss
    incoming responses other than from latest request.

    Remove timeouts which were used to mitigate the racing issue but are
    obsolete now.

    Reviewed-by: Z
    Refs: #123
    ```

### 5.2 JOJ3 提交

所有的提交必须符合 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 的规范. 所有的提交必须以以下格式:
```bash
git commit -m "type(scope): message [option_list]"
```

**NOTE !**    `scope` 一般情况下必须是以下的内容:

- `p1` / `p2` / `p3` / `...` : 提交对应的Project
- `ex1` / `ex2` / `ex3` / `...`: 提交对应的Exercise

**NOTE !**    `message` 中应当尽量简洁的描述你这次提交的目的。

**NOTE !**    `option_list` 可以是空的，也可以是以下的一个或两个:

- `build`: 触发对你代码的编译
- `joj`: 在 ***JOJ3*** 上测试你的代码

以上是2025SP时期JOJ3的git提交方式，在2024AU时期的ENGR151课程中是可以使用以下格式进行提交的:
```bash
git commit -m "type(scope): joj message"
```

通常情况下build和joj没有次数限制，但有些时候有限制(ENGR151)，故而每次提交前要检查自己的代码，不要浪费build和joj的次数。

以下的指令都是有效的:

```bash
git commit -m "fix(p3): memory leak fixed []"
git commit -m "style(ex5): improve code quality [build]"
git commit -m "revert(ex4): undo latest code []"
git commit -m "docs(ex2): add comments [build joj]"
```

如果想要提交 **empty commit**，可以用以下指令 `--allow-empty`。 比如：

```bash
git commit --allow-empty -m "chores(p1): wrong commit msg [build joj]"
```


### 5.3 使用 [Commitizen](https://github.com/commitizen/cz-cli) 交互式生成

1. **前置条件**
   安装 [Node.js](https://nodejs.org/zh-cn) 和 [npm](https://github.com/npm/cli)

   Node.js发布于2009年5月，由Ryan Dahl开发，是一个基于Chrome V8引擎的JavaScript运行环境，使用了一个事件驱动、非阻塞式I/O模型，让JavaScript 运行在服务端的开发平台，它让JavaScript成为与PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言。安装方式如下：

   ```bash
   brew install node@22 # macOS
   
   docker pull node:22-alpine
   docker run -it --rm --entrypoint sh node:22-alpine # Linux by Docker
   
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   \. "$HOME/.nvm/nvm.sh"
   nvm install 22 # Linux by nvm
   ```

   npm（注意：这三个字母均不大写）是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。npm的前体实际上是一个名为“pm”的bash实用程序，这是“pkgmakeinst”的简称——一个在各种平台上安装各种东西的bash函数。

   ```bash
   curl -qL https://www.npmjs.com/install.sh | sh
   ```

2. **全局或项目安装 Commitizen**

   ```bash
   # 全局安装
   npm install -g commitizen

   # 或在项目中安装并写入 devDependencies
   npm install --save-dev commitizen
   ```

3. **初始化适配器（以 cz-conventional-changelog 为例）**

   ```bash
   # 项目根目录执行
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   commitizen init cz-conventional-changelog --save-dev --save-exact
   ```

4. **使用 `cz`（或 `git cz`）来提交**

   ```bash
   # 提交时可替代 git commit
   git cz

   # 或者
   npx cz
   ```

   Commitizen 会在命令行中依次提示你填写：

   1. **type**（类型）
   2. **scope**（影响范围）
   3. **subject**（简要描述）
   4. **body**（详细说明，可多行）
   5. **footer**（关联 Issue 或 BREAKING CHANGE）

---

## 6. 如何使用 VSCode 插件或 LazyGit 快速生成 Conventional Commit

### 6.1 在 VSCode 中使用 Conventional Commit 插件

1. **安装插件**
   搜索并安装 “Conventional Commits” 或 “Conventional Commit Messages” 插件（例如 vivaxy/vscode-conventional-commits）。

2. **简单配置（可选）**
   在 `settings.json` 中添加：

   ```jsonc
   {
     // 自定义 scope 列表
     "conventionalCommits.scopes": [
       "ex1",
       "ex2",
       "p1"
       //其他scope
     ]
   }
   ```

3. **使用方式**

   * `Command + Shift + P` 或者 `Ctrl + Shift + P`, 输入 `Conventional Commits`, 然后按 `Enter`
   * 或可以点击源代码管理按钮，再点击该窗口中的圆圈符号
   * 在弹出的快速选择窗口中依次填写或选择已有的 `type`、`scope`、`emoji`、`subject`，自动生成符合规范的提交消息

### 6.2 在 LazyGit 中快速生成 Conventional Commit

1. **安装并打开 LazyGit**

   ```bash
   brew install jesseduffield/lazygit/lazygit  # macOS
   
   LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | \grep -Po '"tag_name": *"v\K[^"]*')
   curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/download/v${LAZYGIT_VERSION}/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
   tar xf lazygit.tar.gz lazygit
   sudo install lazygit -D -t /usr/local/bin/  # Ubuntu 25.04 earlier
   
   sudo apt install lazygit  # Ubuntu 25.10 later
   ```

2. **进入提交界面**
   在终端中运行 `lazygit`，然后按 `c`（commit）键进入提交消息编辑。

3. **利用 Commitizen（可选）**
   如果已在项目中安装并配置好 Commitizen，可以在 LazyGit 的 commit 输入框中先执行交互式命令：

   ```bash
   git cz --no-verify --commit-all --dry-run
   ```

   然后将生成的提交消息复制到 LazyGit 提交框中。

   也可以如下加入config.yml文件中以配置按`shift+c`键提交

   ```yaml
   customCommands:
     - key: "C"
       command: "git cz c"
       description: "commit with commitizen"
       context: "files"
       loadingText: "opening commitizen commit tool"
       subprocess: true
   ```

5. **配置 LazyGit Commit Prefix（可选）**
   在 `~/.config/lazygit/config.yml` (Linux) `~/Library/Application\ Support/lazygit/config.yml` (macOS) 中添加：

   ```yaml
   customCommands:
     - key: "<c-v>"
       context: "global"
       description: "Create new conventional commit"
       prompts:
         - type: "menu"
           key: "Type"
           title: "Type of change"
           options:
             - name: "build"
               description: "Changes that affect the build system or external dependencies"
               value: "build"
             - name: "feat"
               description: "A new feature"
               value: "feat"
             - name: "fix"
               description: "A bug fix"
               value: "fix"
             - name: "chore"
               description: "Other changes that don't modify src or test files"
               value: "chore"
             - name: "ci"
               description: "Changes to CI configuration files and scripts"
               value: "ci"
             - name: "docs"
               description: "Documentation only changes"
               value: "docs"
             - name: "perf"
               description: "A code change that improves performance"
               value: "perf"
             - name: "refactor"
               description: "A code change that neither fixes a bug nor adds a feature"
               value: "refactor"
             - name: "revert"
               description: "Reverts a previous commit"
               value: "revert"
             - name: "style"
               description: "Changes that do not affect the meaning of the code"
               value: "style"
             - name: "test"
               description: "Adding missing tests or correcting existing tests"
               value: "test"
         - type: "input"
           title: "Scope"
           key: "Scope"
           initialValue: ""
         - type: "menu"
           key: "Breaking"
           title: "Breaking change"
           options:
             - name: "no"
               value: ""
             - name: "yes"
               value: "!"
         - type: "input"
           title: "message"
           key: "Message"
           initialValue: ""
         - type: "confirm"
           key: "Confirm"
           title: "Commit"
           body: "Are you sure you want to commit?"
       command: "git commit --message '{{.Form.Type}}{{ if .Form.Scope }}({{ .Form.Scope }}){{ end }}{{.Form.Breaking}}: {{.Form.Message}}'"
       loadingText: "Creating conventional commit..."
   ```

   提交时按 `control+v` 选择所需选项，再按 `enter` 即可。

# Reference
24au ENGR1510J Lab1 & c0

25sp ECE2800J README

https://github.com/jesseduffield/lazygit
