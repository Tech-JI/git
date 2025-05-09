*Conventional Commits* 是一种用于**规范化 Git 提交信息的约定**。
- 提高代码提交的可读性，方便自己记录每次更改
- 团队工作中更清晰地传达每次代码变更的意图和影响
- 自动化生成变更日志（CHANGELOG）
- 支持语义化版本控制（SemVer）

## 基础格式 

```
<类型> (<作用域>) : <主题>

<正文>

<脚注>
```

- **类型（type)**：表明提交的性质（如功能新增、修复、文档更新等）。
- **作用域（scope）**：可选，说明修改影响的范围（如模块、组件）。
- **主题（subje）**：简明扼要的总结，通常不超过50个字符。
- **正文（Body）**：详细描述变更内容或动机，可多行。
- **脚注（Footer）**：用于标注破坏性变更（BREAKING CHANGE）或关联Issue（如 `Closes #123`）。
*正文和脚注在JOJ提交中一般不用*

**常见提交类型**
-   `feat`: 新增功能。
-   `fix`: 修复Bug。
-   `docs`: 文档变更（如README、注释）。
-   `style`: 代码格式调整（不影响逻辑，如空格、缩进）。
-   `refactor`: 代码重构（未修复Bug或新增功能）。
-   `perf`: 性能优化。
-   `test`: 测试相关变更。
-   `chore`: 构建流程或辅助工具的变动（如配置脚本）。

了解更多：[Conventional Commits]([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/))

**JOJ3提交格式**
```
$ git commit -m "type(scope): message [option_list]"
```
例如：
```
$ git commit -m "fix(p3): memory leak fixed []"
$ git commit -m "style(ex5): improve code quality [build]"
$ git commit -m "revert(ex4): undo latest code []"
$ git commit -m "docs(ex2): add comments [build joj]"
```

## commitizen
**Requirement**: 已安装 Node.js 和 npm. [下载连接]([Node.js — 在任何地方运行 JavaScript](https://nodejs.org/zh-cn))
1. 全局安装Commitizen：`npm install -g commitizen`
2. `cd` 至项目根目录
3. 运行以下命令 **在当前窗口下允许脚本执行**：`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`
4. 初始化 Commitizen 配置：`npx commitizen init cz-conventional-changelog --save-dev --save-exact`
5. 提交更新：`git cz`


# Plug-in
## lazygit

# Reference
25sp ECE2800 README