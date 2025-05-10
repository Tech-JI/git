# 常见钩子的举例

## 客户端钩子

```pre-commit```, ```prepare-commit-msg```, ```commit-msg```, ```post-commit```是四种提交工作流钩子(Committing-Workflow Hooks)。涉及提交的四个过程。```pre-commit```检查或修改提交的代码，```prepare-commit-msg```修改或生成commit message内容，```commit-msg```检查commit-message格式是否合规，```post-commit```提交完成后的通知或清理。

---

### pre-commit

此钩子由```git-commit```调用，可以使用```git commit --no-verify```选项绕过。它不接受任何参数，在获取建议的提交日志消息并进行提交之前调用。以非零状态退出此脚本会导致命令```git commit```在创建提交之前中止。

默认的预提交钩子在启用时会捕获```尾随空格、仅包含空格的行以及行首缩进内空格后跟制表符```, 并在发现这样的行时中止提交）。

其他功能包括：非 ASCII 文件名检查， 检查代码风格，阻止大文件的提交等。

---

### prepare-commit-msg



### commit-msg

### post-commit





### 服务器端钩子

```pre-receive```, ```update```, ```post-receive```是三种服务器端钩子

## 其他钩子

### post-checkout

### pre-rebase



## Reference

关于git hooks的更多信息以及用处和使用方法：

```https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks```

具体的：```https://git-scm.com/docs/githooks```