// 初始化教程数据
const tutorialData = [
    {
        id: 1,
        title: "Git 简介",
        content: `
            <h2>Git 简介</h2>
            <p>Git 是一个分布式版本控制系统，由 Linus Torvalds 于2005年创建，用于跟踪文件更改并协调多人协作开发。</p>
            <p>Git 与其他版本控制系统（如 SVN）的主要区别在于：</p>
            <ul>
                <li>分布式而非集中式，每个开发人员都有完整的代码历史</li>
                <li>高效处理分支和合并操作</li>
                <li>可以离线工作，不需要持续连接到中央服务器</li>
            </ul>
            <p>在本教程中，你将学习 Git 的基本命令和工作流程。你可以在左侧的终端中输入命令，并在右侧看到这些命令对仓库产生的变化。</p>
            <p>准备好了吗？点击"下一步"开始学习创建 Git 仓库！</p>
        `,
        hint: "这一步不需要执行任何命令，只需阅读关于 Git 的简介。准备好后，点击“下一步”继续。"
    },
    {
        id: 2,
        title: "创建仓库 (git init)",
        content: `
            <h2>创建 Git 仓库</h2>
            <p>Git 仓库（repository）是一个包含项目文件和完整历史记录的目录。创建 Git 仓库有两种方式：</p>
            <ol>
                <li>将本地目录初始化为 Git 仓库</li>
                <li>从远程仓库克隆现有的 Git 仓库</li>
            </ol>
            <p>我们先来学习如何初始化一个新的 Git 仓库。</p>
            <p>在终端中，输入以下命令来创建一个名为 "my-project" 的新目录并初始化为 Git 仓库：</p>
            <pre>mkdir my-project
cd my-project
git init</pre>
            <p><code>git init</code> 命令会在当前目录创建一个新的 Git 仓库，包含必要的 Git 文件（在 .git 隐藏文件夹中）。</p>
            <p>试试看！在左侧终端输入这些命令。</p>
        `,
        hint: "请依次输入以下命令：\n1. mkdir my-project\n2. cd my-project\n3. git init\n\n这将创建一个新目录并将其初始化为 Git 仓库。"
    },
    {
        id: 3,
        title: "添加文件 (git add)",
        content: `
            <h2>添加文件到暂存区 (git add)</h2>
            <p>Git 中文件有以下几种状态：</p>
            <ul>
                <li><strong>未跟踪（Untracked）</strong>：新创建但尚未被 Git 跟踪的文件</li>
                <li><strong>已修改（Modified）</strong>：已被 Git 跟踪但尚未暂存的修改</li>
                <li><strong>已暂存（Staged）</strong>：已添加到暂存区的修改，准备提交</li>
                <li><strong>已提交（Committed）</strong>：已保存到本地数据库的修改</li>
            </ul>
            <p>现在我们来创建一些文件并添加到暂存区。</p>
            <p>在终端中执行以下命令：</p>
            <pre>echo "# My Project" > README.md
echo "console.log('Hello, Git!');" > app.js
git add README.md app.js</pre>
            <p><code>git add</code> 命令将指定的文件添加到暂存区，准备下一次提交。你也可以使用 <code>git add .</code> 添加所有修改过的文件。</p>
            <p>试试看！在左侧终端输入这些命令。</p>
        `,
        hint: "请依次输入以下命令：\n1. echo \"# My Project\" > README.md\n2. echo \"console.log('Hello, Git!');\" > app.js\n3. git add README.md app.js\n\n这将创建两个文件并将它们添加到暂存区。"
    },
    {
        id: 4,
        title: "提交更改 (git commit)",
        content: `
            <h2>提交更改 (git commit)</h2>
            <p>将文件添加到暂存区后，下一步是将这些更改"提交"到仓库的历史记录中。每个提交代表项目历史中的一个快照。</p>
            <p>提交时，应该添加一条描述性的提交信息，解释这次更改的内容和原因。</p>
            <p>在终端中执行以下命令：</p>
            <pre>git commit -m "Initial commit: add README and app.js"</pre>
            <p><code>git commit</code> 命令将暂存区的更改提交到仓库。<code>-m</code> 参数用于指定提交信息。</p>
            <p>如果你省略 <code>-m</code> 参数，Git 会打开一个文本编辑器让你输入更详细的提交信息。</p>
            <p>试试看！在左侧终端输入这个命令。</p>
        `,
        hint: "请输入命令：\ngit commit -m \"Initial commit: add README and app.js\"\n\n这将把暂存区的文件提交到仓库，并添加一条描述这次提交内容的信息。"
    },
    {
        id: 5,
        title: "查看状态和历史 (git status/log)",
        content: `
            <h2>查看状态和历史 (git status/log)</h2>
            <p>Git 提供了几个命令来查看仓库的状态和历史记录。</p>
            <p><strong>git status</strong> 显示工作目录和暂存区的状态，让你知道哪些文件被修改，哪些文件已暂存，哪些文件未被跟踪。</p>
            <p><strong>git log</strong> 显示提交历史，包括提交哈希值、作者、日期和提交信息。</p>
            <p>在终端中尝试这些命令：</p>
            <pre>git status
git log</pre>
            <p>现在，我们再添加一些更改，然后再次查看状态：</p>
            <pre>echo "// This is a sample JavaScript file" >> app.js
git status</pre>
            <p>注意现在 app.js 显示为已修改但未暂存。让我们暂存并提交这个更改：</p>
            <pre>git add app.js
git commit -m "Add comment to app.js"
git log</pre>
            <p>试试看！在左侧终端输入这些命令，并观察右侧仓库视图的变化。</p>
        `,
        hint: "请依次输入以下命令：\n1. git status\n2. git log\n3. echo \"// This is a sample JavaScript file\" >> app.js\n4. git status\n5. git add app.js\n6. git commit -m \"Add comment to app.js\"\n7. git log\n\n这些命令可以帮助你了解如何查看仓库状态、修改文件、提交更改并查看提交历史。"
    },
    {
        id: 6,
        title: "分支操作 (git branch/checkout)",
        content: `
            <h2>分支操作 (git branch/checkout)</h2>
            <p>分支是 Git 最强大的功能之一，它允许你在不影响主分支的情况下开发新功能或修复 bug。</p>
            <p>主要分支操作包括：</p>
            <ul>
                <li><strong>git branch</strong>：列出或创建分支</li>
                <li><strong>git checkout</strong>：切换到指定分支</li>
                <li><strong>git checkout -b</strong>：创建新分支并立即切换到该分支</li>
            </ul>
            <p>在终端中执行以下命令：</p>
            <pre>git branch
git branch feature
git checkout feature</pre>
            <p>现在你已经切换到 feature 分支。让我们在这个分支上做一些更改：</p>
            <pre>echo "function sayHello() { return 'Hello, World!'; }" >> app.js
git add app.js
git commit -m "Add sayHello function"
git checkout main
git branch</pre>
            <p>注意，切换回 main 分支后，app.js 中的新函数不会出现，因为它只存在于 feature 分支中。</p>
            <p>试试看！在左侧终端输入这些命令，并观察右侧仓库视图的变化。</p>
        `,
        hint: "请依次输入以下命令：\n1. git branch\n2. git branch feature\n3. git checkout feature\n4. echo \"function sayHello() { return 'Hello, World!'; }\" >> app.js\n5. git add app.js\n6. git commit -m \"Add sayHello function\"\n7. git checkout main\n8. git branch\n\n这些命令演示了如何创建和切换分支，以及如何在不同分支上进行独立的开发工作。"
    },
    {
        id: 7,
        title: "合并分支 (git merge)",
        content: `
            <h2>合并分支 (git merge)</h2>
            <p>当你在一个分支上完成开发工作后，通常需要将其合并回主分支。</p>
            <p><code>git merge</code> 命令用于将一个分支的更改合并到当前分支中。</p>
            <p>在终端中执行以下命令：</p>
            <pre>git checkout main
git merge feature
git log</pre>
            <p>合并后，你会看到 feature 分支的提交现在也出现在 main 分支的历史记录中。</p>
            <p>如果合并过程中出现冲突（当两个分支修改了同一文件的同一部分时），Git 会要求你手动解决这些冲突。</p>
            <p>我们可以删除已合并的分支：</p>
            <pre>git branch -d feature
git branch</pre>
            <p>试试看！在左侧终端输入这些命令，并观察右侧仓库视图的变化。</p>
        `,
        hint: "请依次输入以下命令：\n1. git checkout main\n2. git merge feature\n3. git log\n4. git branch -d feature\n5. git branch\n\n这些命令演示了如何将 feature 分支的更改合并到 main 分支，并删除不再需要的分支。"
    },
    {
        id: 8,
        title: "远程仓库操作 (git push/pull)",
        content: `
            <h2>远程仓库操作 (git push/pull)</h2>
            <p>远程仓库是托管在互联网或网络上的项目仓库。通过远程仓库，团队成员可以共享和协作开发项目。</p>
            <p>主要的远程仓库操作包括：</p>
            <ul>
                <li><strong>git remote</strong>：管理远程仓库</li>
                <li><strong>git push</strong>：将本地更改上传到远程仓库</li>
                <li><strong>git pull</strong>：从远程仓库获取并合并更改</li>
                <li><strong>git clone</strong>：克隆远程仓库到本地</li>
            </ul>
            <p>在终端中执行以下命令（在实际环境中，你需要替换为真实的 GitHub 仓库 URL）：</p>
            <pre>git remote add origin https://github.com/username/my-project.git
git push -u origin main</pre>
            <p><code>git remote add</code> 命令添加一个远程仓库，通常命名为 "origin"。</p>
            <p><code>git push</code> 命令将本地分支推送到远程仓库。<code>-u</code> 参数设置上游分支，以后可以直接使用 <code>git push</code> 和 <code>git pull</code>。</p>
            <p>如果其他人对远程仓库做了更改，你可以使用以下命令获取这些更改：</p>
            <pre>git pull origin main</pre>
            <p>或者，如果你之前设置了上游分支：</p>
            <pre>git pull</pre>
            <p>在这个模拟环境中，我们会模拟这些操作的效果。</p>
            <p>恭喜！你已经完成了 Git 基础教程。现在你已经了解了 Git 的核心概念和常用命令，可以开始在实际项目中使用 Git 进行版本控制了。</p>
        `,
        hint: "在实际环境中，你需要使用以下命令：\n1. git remote add origin https://github.com/username/my-project.git\n2. git push -u origin main\n3. git pull\n\n在我们的模拟环境中，这些命令被模拟执行，不会真正连接到远程仓库。"
    }
];

// 初始化变量，稍后会获取DOM元素
let terminalInput, terminalOutput, tutorialContent, tutorialList, repoFiles;
let commitList, currentBranchElement, hintBtn, nextStepBtn, helpModal, hintContent, closeModal;

// 当前教程步骤
let currentStep = 1;

// 初始化模拟终端数据
let terminalHistory = [];
let currentDirectory = "~/";

// 模拟仓库数据
let repoData = {
    name: "my-project",
    branches: ["main"],
    currentBranch: "main",
    files: {},
    commits: []
};

// 初始化DOM元素
function initDOMElements() {
    console.log("正在初始化DOM元素");
    
    // 获取所有必要的DOM元素
    terminalInput = document.getElementById('terminal-input');
    terminalOutput = document.getElementById('terminal-output');
    tutorialContent = document.getElementById('tutorial-content');
    tutorialList = document.getElementById('tutorial-list');
    repoFiles = document.getElementById('repo-files');
    commitList = document.getElementById('commit-list');
    currentBranchElement = document.getElementById('current-branch');
    hintBtn = document.getElementById('hint-btn');
    nextStepBtn = document.getElementById('next-step-btn');
    helpModal = document.getElementById('help-modal');
    hintContent = document.getElementById('hint-content');
    closeModal = document.querySelector('.close');
    
    // 记录所有元素的状态
    const elements = {
        terminalInput,
        terminalOutput,
        tutorialContent,
        tutorialList,
        repoFiles,
        commitList,
        currentBranchElement,
        hintBtn,
        nextStepBtn,
        helpModal,
        hintContent,
        closeModal
    };
    
    // 检查哪些元素未找到
    const missingElements = Object.entries(elements)
        .filter(([, el]) => !el)
        .map(([name]) => name);
    
    if (missingElements.length > 0) {
        console.error(`未找到以下DOM元素: ${missingElements.join(', ')}`);
        return false;
    }
    
    console.log("所有DOM元素初始化成功");
    return true;
}

// 初始化按钮事件监听器
function setupButtonListeners() {
    console.log("设置按钮事件监听器");
    const hintBtn = document.getElementById('hint-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const closeModal = document.querySelector('.close');
    const helpModal = document.getElementById('help-modal');
    
    if (hintBtn) {
        // 移除旧监听器
        const newHintBtn = hintBtn.cloneNode(true);
        hintBtn.parentNode.replaceChild(newHintBtn, hintBtn);
        
        // 添加新监听器
        newHintBtn.addEventListener('click', function() {
            console.log("提示按钮被点击");
            showHint();
        });
        console.log("提示按钮监听器设置完成");
    } else {
        console.error("找不到提示按钮元素");
    }
    
    if (nextStepBtn) {
        // 移除旧监听器
        const newNextBtn = nextStepBtn.cloneNode(true);
        nextStepBtn.parentNode.replaceChild(newNextBtn, nextStepBtn);
        
        // 添加新监听器
        newNextBtn.addEventListener('click', function() {
            console.log("下一步按钮被点击");
            nextStep();
        });
        console.log("下一步按钮监听器设置完成");
    } else {
        console.error("找不到下一步按钮元素");
    }
    
    if (closeModal && helpModal) {
        // 移除旧监听器
        const newCloseBtn = closeModal.cloneNode(true);
        closeModal.parentNode.replaceChild(newCloseBtn, closeModal);
        
        // 添加新监听器
        newCloseBtn.addEventListener('click', function() {
            console.log("关闭按钮被点击");
            helpModal.style.display = 'none';
        });
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === helpModal) {
                helpModal.style.display = 'none';
            }
        });
        console.log("模态框关闭按钮监听器设置完成");
    } else {
        console.error("找不到关闭按钮或帮助模态框元素");
    }
}

// 加载教程内容
function loadTutorialContent(stepId) {
    try {
        console.log(`加载教程内容: 步骤 ${stepId}`);
        
        // 获取DOM元素
        const tutorialContent = document.getElementById('tutorial-content');
        const tutorialList = document.getElementById('tutorial-list');
        
        if (!tutorialContent || !tutorialList) {
            console.error('无法找到教程内容或列表元素');
            return;
        }
        
        // 查找教程数据
        const tutorial = tutorialData.find(item => item.id === stepId);
        if (!tutorial) {
            console.error(`未找到步骤 ${stepId} 的教程数据`);
            return;
        }
        
        // 更新教程内容
        tutorialContent.innerHTML = tutorial.content;
        
        // 更新侧边栏活动项
        const listItems = tutorialList.querySelectorAll('li');
        listItems.forEach(item => {
            const itemStep = parseInt(item.dataset.step);
            if (itemStep === stepId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        console.log(`教程内容加载完成: ${tutorial.title}`);
    } catch (error) {
        console.error(`加载教程内容时发生错误: ${error.message}`);
    }
}

// 更新仓库视图
function updateRepoView() {
    // 确保DOM元素已初始化
    if (!repoFiles || !commitList || !currentBranchElement) {
        if (!initDOMElements()) {
            console.error('无法找到仓库视图的DOM元素');
            return;
        }
    }
    
    // 更新文件列表
    repoFiles.innerHTML = '';
    if (Object.keys(repoData.files).length === 0) {
        repoFiles.innerHTML = '<div class="empty-repo">No files in this repository yet.</div>';
    } else {
        for (const filePath in repoData.files) {
            if (repoData.files.hasOwnProperty(filePath) && repoData.currentBranch === repoData.files[filePath].branch) {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const icon = document.createElement('i');
                if (filePath.endsWith('.md')) {
                    icon.className = 'fas fa-file-alt';
                } else if (filePath.endsWith('.js')) {
                    icon.className = 'fab fa-js';
                } else {
                    icon.className = 'fas fa-file';
                }
                
                const fileName = document.createElement('div');
                fileName.className = 'file-name';
                fileName.textContent = filePath;
                
                fileItem.appendChild(icon);
                fileItem.appendChild(fileName);
                repoFiles.appendChild(fileItem);
            }
        }
    }
    
    // 更新提交历史
    commitList.innerHTML = '';
    if (repoData.commits.length === 0) {
        commitList.innerHTML = '<div class="empty-commits">No commits yet.</div>';
    } else {
        const filteredCommits = repoData.commits.filter(commit => 
            commit.branch === repoData.currentBranch || 
            (commit.merged && commit.merged.includes(repoData.currentBranch))
        );
        
        filteredCommits.sort((a, b) => b.timestamp - a.timestamp)
            .forEach(commit => {
                const commitItem = document.createElement('div');
                commitItem.className = 'commit-item';
                
                const avatar = document.createElement('div');
                avatar.className = 'commit-avatar';
                avatar.textContent = 'U';
                
                const commitInfo = document.createElement('div');
                commitInfo.className = 'commit-info';
                
                const message = document.createElement('div');
                message.className = 'commit-message';
                message.textContent = commit.message;
                
                const meta = document.createElement('div');
                meta.className = 'commit-meta';
                meta.textContent = `User committed ${timeAgo(commit.timestamp)}`;
                
                commitInfo.appendChild(message);
                commitInfo.appendChild(meta);
                
                commitItem.appendChild(avatar);
                commitItem.appendChild(commitInfo);
                commitList.appendChild(commitItem);
            });
    }
    
    // 更新当前分支显示
    currentBranchElement.textContent = repoData.currentBranch;
}

// 处理终端命令
function processCommand(command) {
    if (!command || !command.trim()) return;
    
    console.log(`处理命令: ${command}`);
    
    // 获取终端输出元素
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) {
        console.error("找不到终端输出元素");
        return;
    }
    
    // 显示命令
    appendToTerminal(`<span class="prompt">user@git-tutorial:${currentDirectory}$</span> ${command}`);
    
    // 解析命令
    const args = command.trim().split(/\s+/);
    const cmd = args[0].toLowerCase();
    
    // 命令处理
    try {
        switch (cmd) {
            case 'mkdir':
                handleMkdir(args);
                break;
            case 'cd':
                handleCd(args);
                break;
            case 'git':
                handleGit(args);
                break;
            case 'echo':
                handleEcho(args);
                break;
            case 'ls':
                handleLs();
                break;
            case 'cat':
                handleCat(args);
                break;
            case 'clear':
                if (terminalOutput) {
                    terminalOutput.innerHTML = '';
                }
                break;
            case 'help':
                showHelp();
                break;
            default:
                appendToTerminal(`Command not found: ${cmd}`);
        }
        
        // 记录命令历史
        terminalHistory.push(command);
        
        // 检查教程进度
        checkProgress(command);
        
        console.log(`命令处理完成: ${command}`);
    } catch (error) {
        console.error(`处理命令时发生错误: ${error.message}`);
        appendToTerminal(`<span style="color: red;">Error: ${error.message}</span>`);
    }
}

// 处理 mkdir 命令
function handleMkdir(args) {
    if (args.length < 2) {
        appendToTerminal('Usage: mkdir <directory>');
        return;
    }
    
    const dirName = args[1];
    if (currentStep === 2 && dirName === 'my-project') {
        appendToTerminal(`mkdir: created directory '${dirName}'`);
    } else {
        appendToTerminal(`mkdir: operation not supported in this demo`);
    }
}

// 处理 cd 命令
function handleCd(args) {
    if (args.length < 2) {
        currentDirectory = '~/';
        appendToTerminal(`Changed directory to: ${currentDirectory}`);
        return;
    }
    
    const dirName = args[1];
    if (currentStep === 2 && dirName === 'my-project') {
        currentDirectory = '~/my-project/';
        appendToTerminal(`Changed directory to: ${currentDirectory}`);
    } else if (dirName === '..') {
        if (currentDirectory !== '~/') {
            currentDirectory = '~/';
            appendToTerminal(`Changed directory to: ${currentDirectory}`);
        }
    } else {
        appendToTerminal(`cd: no such directory: ${dirName}`);
    }
}

// 处理 git 命令
function handleGit(args) {
    if (args.length < 2) {
        appendToTerminal('Usage: git <command>');
        return;
    }
    
    const gitCmd = args[1].toLowerCase();
    
    switch (gitCmd) {
        case 'init':
            if (currentDirectory === '~/my-project/') {
                appendToTerminal('Initialized empty Git repository in ~/my-project/.git/');
                repoData.name = 'my-project';
                updateRepoView();
            } else {
                appendToTerminal('git init: must be in a project directory');
            }
            break;
            
        case 'add':
            if (args.length < 3) {
                appendToTerminal('Usage: git add <file>');
                return;
            }
            
            const filesToAdd = args.slice(2);
            let validFiles = true;
            
            filesToAdd.forEach(file => {
                if (file === '.') {
                    appendToTerminal(`Added all modified files to staging area`);
                    for (const filePath in repoData.files) {
                        if (repoData.files.hasOwnProperty(filePath) && repoData.files[filePath].branch === repoData.currentBranch) {
                            repoData.files[filePath].staged = true;
                        }
                    }
                } else if (repoData.files[file] && repoData.files[file].branch === repoData.currentBranch) {
                    appendToTerminal(`Added '${file}' to staging area`);
                    repoData.files[file].staged = true;
                } else {
                    appendToTerminal(`error: pathspec '${file}' did not match any files`);
                    validFiles = false;
                }
            });
            
            if (validFiles) {
                updateRepoView();
            }
            break;
            
        case 'commit':
            if (args.includes('-m')) {
                const messageIndex = args.indexOf('-m') + 1;
                if (messageIndex < args.length) {
                    const message = args[messageIndex].replace(/"/g, '');
                    let stagedFiles = false;
                    
                    for (const filePath in repoData.files) {
                        if (repoData.files.hasOwnProperty(filePath) && 
                            repoData.files[filePath].staged && 
                            repoData.files[filePath].branch === repoData.currentBranch) {
                            stagedFiles = true;
                            repoData.files[filePath].staged = false;
                            repoData.files[filePath].committed = true;
                        }
                    }
                    
                    if (stagedFiles) {
                        const commit = {
                            id: generateId(),
                            message: message,
                            timestamp: Date.now(),
                            branch: repoData.currentBranch
                        };
                        
                        repoData.commits.push(commit);
                        appendToTerminal(`[${repoData.currentBranch} ${commit.id.substring(0, 7)}] ${message}`);
                        appendToTerminal(`1 file changed, additions+`);
                        updateRepoView();
                    } else {
                        appendToTerminal('nothing to commit, working tree clean');
                    }
                } else {
                    appendToTerminal('error: option -m requires a value');
                }
            } else {
                appendToTerminal('Usage: git commit -m "commit message"');
            }
            break;
            
        case 'status':
            appendToTerminal(`On branch ${repoData.currentBranch}`);
            
            let staged = false;
            let modified = false;
            let untracked = false;
            
            for (const filePath in repoData.files) {
                if (repoData.files.hasOwnProperty(filePath) && repoData.files[filePath].branch === repoData.currentBranch) {
                    if (repoData.files[filePath].staged) {
                        if (!staged) {
                            appendToTerminal('\nChanges to be committed:');
                            staged = true;
                        }
                        appendToTerminal(`  (use "git restore --staged <file>..." to unstage)`);
                        appendToTerminal(`        new file:   ${filePath}`);
                    } else if (repoData.files[filePath].modified && repoData.files[filePath].committed) {
                        if (!modified) {
                            appendToTerminal('\nChanges not staged for commit:');
                            modified = true;
                        }
                        appendToTerminal(`  (use "git add <file>..." to update what will be committed)`);
                        appendToTerminal(`        modified:   ${filePath}`);
                    } else if (!repoData.files[filePath].committed) {
                        if (!untracked) {
                            appendToTerminal('\nUntracked files:');
                            untracked = true;
                        }
                        appendToTerminal(`  (use "git add <file>..." to include in what will be committed)`);
                        appendToTerminal(`        ${filePath}`);
                    }
                }
            }
            
            if (!staged && !modified && !untracked) {
                appendToTerminal('nothing to commit, working tree clean');
            }
            break;
            
        case 'log':
            if (repoData.commits.length === 0) {
                appendToTerminal('fatal: your current branch does not have any commits yet');
                break;
            }
            
            const filteredCommits = repoData.commits.filter(commit => 
                commit.branch === repoData.currentBranch || 
                (commit.merged && commit.merged.includes(repoData.currentBranch))
            );
            
            if (filteredCommits.length === 0) {
                appendToTerminal(`No commits on branch ${repoData.currentBranch}`);
                break;
            }
            
            filteredCommits.sort((a, b) => b.timestamp - a.timestamp)
                .forEach(commit => {
                    appendToTerminal(`commit ${commit.id} (${commit.branch})`);
                    appendToTerminal(`Author: User <user@example.com>`);
                    appendToTerminal(`Date:   ${new Date(commit.timestamp).toISOString()}`);
                    appendToTerminal(`\n    ${commit.message}\n`);
                });
            break;
            
        case 'branch':
            if (args.length === 2) {
                // 显示分支列表
                appendToTerminal(`Branches:`);
                repoData.branches.forEach(branch => {
                    const prefix = branch === repoData.currentBranch ? '* ' : '  ';
                    appendToTerminal(`${prefix}${branch}`);
                });
            } else {
                const branchName = args[2];
                if (args.includes('-d') || args.includes('-D')) {
                    // 删除分支
                    const branchToDelete = args[args.indexOf('-d') + 1] || args[args.indexOf('-D') + 1];
                    if (branchToDelete === repoData.currentBranch) {
                        appendToTerminal(`error: Cannot delete the branch '${branchToDelete}' which you are currently on.`);
                    } else if (repoData.branches.includes(branchToDelete)) {
                        repoData.branches = repoData.branches.filter(b => b !== branchToDelete);
                        appendToTerminal(`Deleted branch ${branchToDelete}.`);
                        updateRepoView();
                    } else {
                        appendToTerminal(`error: branch '${branchToDelete}' not found.`);
                    }
                } else {
                    // 创建新分支
                    if (repoData.branches.includes(branchName)) {
                        appendToTerminal(`fatal: A branch named '${branchName}' already exists.`);
                    } else {
                        repoData.branches.push(branchName);
                        appendToTerminal(`Created branch '${branchName}'`);
                        updateRepoView();
                    }
                }
            }
            break;
            
        case 'checkout':
            if (args.length < 3) {
                appendToTerminal(`Usage: git checkout <branch-name> or git checkout -b <new-branch-name>`);
                return;
            }
            
            if (args[2] === '-b') {
                // 创建并切换到新分支
                if (args.length < 4) {
                    appendToTerminal(`error: switch requires a value`);
                    return;
                }
                
                const newBranchName = args[3];
                if (repoData.branches.includes(newBranchName)) {
                    appendToTerminal(`fatal: A branch named '${newBranchName}' already exists.`);
                } else {
                    repoData.branches.push(newBranchName);
                    repoData.currentBranch = newBranchName;
                    appendToTerminal(`Switched to a new branch '${newBranchName}'`);
                    updateRepoView();
                }
            } else {
                // 切换到现有分支
                const branchName = args[2];
                if (repoData.branches.includes(branchName)) {
                    repoData.currentBranch = branchName;
                    appendToTerminal(`Switched to branch '${branchName}'`);
                    updateRepoView();
                } else {
                    appendToTerminal(`error: pathspec '${branchName}' did not match any file(s) known to git.`);
                }
            }
            break;
            
        case 'merge':
            if (args.length < 3) {
                appendToTerminal(`Usage: git merge <branch-name>`);
                return;
            }
            
            const sourceBranch = args[2];
            if (!repoData.branches.includes(sourceBranch)) {
                appendToTerminal(`error: branch '${sourceBranch}' not found.`);
                return;
            }
            
            if (sourceBranch === repoData.currentBranch) {
                appendToTerminal(`Already up to date.`);
                return;
            }
            
            // 找出源分支的所有提交
            const sourceCommits = repoData.commits.filter(commit => commit.branch === sourceBranch);
            
            if (sourceCommits.length === 0) {
                appendToTerminal(`Already up to date.`);
                return;
            }
            
            // 标记这些提交已被合并到当前分支
            sourceCommits.forEach(commit => {
                if (!commit.merged) {
                    commit.merged = [];
                }
                if (!commit.merged.includes(repoData.currentBranch)) {
                    commit.merged.push(repoData.currentBranch);
                }
            });
            
            // 更新文件
            for (const filePath in repoData.files) {
                if (repoData.files.hasOwnProperty(filePath) && repoData.files[filePath].branch === sourceBranch) {
                    // 复制文件到当前分支
                    if (!repoData.files[`${filePath}_${repoData.currentBranch}`]) {
                        repoData.files[filePath] = {
                            ...repoData.files[filePath],
                            branch: repoData.currentBranch,
                            committed: true
                        };
                    }
                }
            }
            
            appendToTerminal(`Merge made by the 'recursive' strategy.`);
            updateRepoView();
            break;
            
        case 'remote':
            if (args[2] === 'add' && args.length >= 5) {
                const remoteName = args[3];
                const remoteUrl = args[4];
                appendToTerminal(`Added remote '${remoteName}' (${remoteUrl})`);
            } else {
                appendToTerminal(`Usage: git remote add <name> <url>`);
            }
            break;
            
        case 'push':
            if (args.includes('-u') && args.length >= 5) {
                const remoteName = args[3];
                const branchName = args[4];
                appendToTerminal(`Enumerating objects: 5, done.`);
                appendToTerminal(`Counting objects: 100% (5/5), done.`);
                appendToTerminal(`Delta compression using up to 8 threads`);
                appendToTerminal(`Compressing objects: 100% (2/2), done.`);
                appendToTerminal(`Writing objects: 100% (3/3), 285 bytes | 285.00 KiB/s, done.`);
                appendToTerminal(`Total 3 (delta 0), reused 0 (delta 0), pack-reused 0`);
                appendToTerminal(`To ${remoteName}`);
                appendToTerminal(` * [new branch]      ${branchName} -> ${branchName}`);
                appendToTerminal(`Branch '${branchName}' set up to track remote branch '${branchName}' from '${remoteName}'.`);
            } else {
                appendToTerminal(`Usage: git push -u <remote> <branch>`);
            }
            break;
            
        case 'pull':
            appendToTerminal(`Already up to date.`);
            break;
            
        default:
            appendToTerminal(`git: '${gitCmd}' is not a git command. See 'git --help'.`);
    }
}

// 处理 echo 命令
function handleEcho(args) {
    if (args.length < 2) {
        appendToTerminal('');
        return;
    }
    
    // 重建原始命令并解析
    const command = args.join(' ');
    const match = command.match(/echo\s+"(.+)"\s+>\s+(\S+)/);
    
    if (match) {
        const content = match[1];
        const fileName = match[2];
        
        appendToTerminal(`Created file: ${fileName} with content: ${content}`);
        
        // 添加文件到仓库数据
        repoData.files[fileName] = {
            content: content,
            branch: repoData.currentBranch,
            staged: false,
            committed: false,
            modified: false
        };
        
        updateRepoView();
    } else {
        // 尝试匹配 echo "content" >> file
        const appendMatch = command.match(/echo\s+"(.+)"\s+>>\s+(\S+)/);
        
        if (appendMatch) {
            const content = appendMatch[1];
            const fileName = appendMatch[2];
            
            if (repoData.files[fileName]) {
                repoData.files[fileName].content += '\n' + content;
                repoData.files[fileName].modified = true;
                appendToTerminal(`Appended to file: ${fileName}: ${content}`);
                updateRepoView();
            } else {
                appendToTerminal(`File not found: ${fileName}`);
            }
        } else {
            // 简单的 echo 命令
            const echoContent = args.slice(1).join(' ').replace(/"/g, '');
            appendToTerminal(echoContent);
        }
    }
}

// 处理 ls 命令
function handleLs() {
    let output = '';
    
    for (const filePath in repoData.files) {
        if (repoData.files.hasOwnProperty(filePath) && repoData.files[filePath].branch === repoData.currentBranch) {
            output += filePath + '  ';
        }
    }
    
    if (output) {
        appendToTerminal(output);
    } else {
        appendToTerminal(`No files in current directory`);
    }
}

// 处理 cat 命令
function handleCat(args) {
    if (args.length < 2) {
        appendToTerminal('Usage: cat <file>');
        return;
    }
    
    const fileName = args[1];
    
    if (repoData.files[fileName] && repoData.files[fileName].branch === repoData.currentBranch) {
        appendToTerminal(repoData.files[fileName].content);
    } else {
        appendToTerminal(`cat: ${fileName}: No such file or directory`);
    }
}

// 显示帮助
function showHelp() {
    appendToTerminal(`Available commands:
  mkdir <dir>    - Create a directory
  cd <dir>       - Change directory
  ls             - List files
  cat <file>     - Display file content
  echo "text" > file - Create a file with content
  echo "text" >> file - Append content to a file
  git init       - Initialize a git repository
  git add <file> - Add file to staging area
  git commit -m "message" - Commit staged changes
  git status     - Show repository status
  git log        - Show commit history
  git branch     - List or create branches
  git checkout <branch> - Switch branches
  git merge <branch> - Merge branch into current branch
  clear          - Clear terminal
  help           - Show this help message`);
}

// 向终端添加输出
function appendToTerminal(text) {
    try {
        const terminalOutput = document.getElementById('terminal-output');
        if (!terminalOutput) {
            console.error('无法找到终端输出元素');
            return;
        }
        
        const div = document.createElement('div');
        div.innerHTML = text;
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        console.log(`终端输出: ${text.replace(/<[^>]*>/g, '')}`);
    } catch (error) {
        console.error(`添加终端输出时发生错误: ${error.message}`);
    }
}

// 检查教程进度
function checkProgress(command) {
    try {
        console.log(`检查进度: ${command}`);
        
        // 获取下一步按钮
        const nextStepBtn = document.getElementById('next-step-btn');
        if (!nextStepBtn) {
            console.error('无法找到下一步按钮');
            return;
        }
        
        const steps = {
            2: [
                { cmd: 'mkdir my-project', next: false },
                { cmd: 'cd my-project', next: false },
                { cmd: 'git init', next: true }
            ],
            3: [
                { cmd: 'echo', check: cmd => cmd.includes('README.md'), next: false },
                { cmd: 'echo', check: cmd => cmd.includes('app.js'), next: false },
                { cmd: 'git add', check: cmd => cmd.includes('README.md') && cmd.includes('app.js'), next: true }
            ],
            4: [
                { cmd: 'git commit -m', next: true }
            ],
            5: [
                { cmd: 'git status', next: false },
                { cmd: 'git log', next: false },
                { cmd: 'echo', check: cmd => cmd.includes('app.js'), next: false },
                { cmd: 'git status', next: false },
                { cmd: 'git add app.js', next: false },
                { cmd: 'git commit -m', next: true }
            ],
            6: [
                { cmd: 'git branch', next: false },
                { cmd: 'git branch feature', next: false },
                { cmd: 'git checkout feature', next: false },
                { cmd: 'echo', check: cmd => cmd.includes('app.js'), next: false },
                { cmd: 'git add app.js', next: false },
                { cmd: 'git commit -m', next: false },
                { cmd: 'git checkout main', next: true }
            ],
            7: [
                { cmd: 'git merge feature', next: false },
                { cmd: 'git branch -d feature', next: true }
            ],
            8: [
                { cmd: 'git remote add origin', next: false },
                { cmd: 'git push', next: true }
            ]
        };
        
        if (steps[currentStep]) {
            for (const step of steps[currentStep]) {
                let matched = false;
                
                if (step.check) {
                    matched = step.check(command);
                } else {
                    matched = command.startsWith(step.cmd);
                }
                
                if (matched && step.next) {
                    console.log('命令匹配，激活下一步按钮');
                    nextStepBtn.classList.add('pulse');
                    break;
                }
            }
        }
    } catch (error) {
        console.error(`检查进度时发生错误: ${error.message}`);
    }
}

// 显示提示
function showHint() {
    try {
        console.log('显示提示');
        
        // 获取DOM元素
        const hintContent = document.getElementById('hint-content');
        const helpModal = document.getElementById('help-modal');
        
        if (!hintContent || !helpModal) {
            console.error('无法找到提示内容或模态框元素');
            return;
        }
        
        // 查找当前步骤的提示
        const tutorial = tutorialData.find(item => item.id === currentStep);
        if (!tutorial || !tutorial.hint) {
            console.error(`当前步骤 ${currentStep} 没有提示信息`);
            return;
        }
        
        // 更新并显示提示
        hintContent.innerHTML = tutorial.hint;
        helpModal.style.display = 'block';
        
        console.log('提示显示成功');
    } catch (error) {
        console.error(`显示提示时发生错误: ${error.message}`);
    }
}

// 进入下一步
function nextStep() {
    try {
        console.log('进入下一步');
        
        // 获取DOM元素
        const nextStepBtn = document.getElementById('next-step-btn');
        
        if (currentStep < tutorialData.length) {
            currentStep++;
            console.log(`切换到步骤: ${currentStep}`);
            loadTutorialContent(currentStep);
            
            if (nextStepBtn) {
                nextStepBtn.classList.remove('pulse');
            }
        } else {
            console.log('已经是最后一步');
        }
    } catch (error) {
        console.error(`进入下一步时发生错误: ${error.message}`);
    }
}

// 生成随机 ID
function generateId() {
    return Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
}

// 时间格式化
function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

// 处理终端输入的事件
function setupTerminalInputListener() {
    console.log("设置终端输入监听器");
    const terminalInput = document.getElementById('terminal-input');
    
    if (terminalInput) {
        // 移除所有旧的事件监听器
        const newInput = terminalInput.cloneNode(true);
        terminalInput.parentNode.replaceChild(newInput, terminalInput);
        
        // 添加新的事件监听器
        newInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                console.log("检测到Enter键");
                const command = this.value;
                processCommand(command);
                this.value = '';
            }
        });
        
        // 确保聚焦
        newInput.focus();
        
        // 为输入框添加可见的点击事件
        newInput.style.cursor = 'text';
        newInput.addEventListener('click', function() {
            this.focus();
        });
        
        console.log("终端输入监听器设置完成");
        return newInput;
    } else {
        console.error("找不到终端输入元素");
        return null;
    }
}

// 事件监听器
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM内容已加载完成");
    
    try {
        // 初始化DOM元素
        const elementsInitialized = initDOMElements();
        if (!elementsInitialized) {
            console.error("DOM元素初始化失败");
            document.getElementById('debug-info').style.display = 'block';
            return;
        }
        
        // 加载初始教程内容
        loadTutorialContent(currentStep);
        
        // 设置按钮事件监听器
        setupButtonListeners();
        
        // 设置终端输入监听器
        const terminalInputElement = setupTerminalInputListener();
        
        // 设置全局点击事件，保持终端输入焦点
        if (terminalInputElement) {
            document.addEventListener('click', function(e) {
                // 如果点击的不是输入框本身，且不是模态框内容
                if (e.target !== terminalInputElement && !e.target.closest('.modal-content')) {
                    terminalInputElement.focus();
                }
            });
        }
        
        // 设置教程列表点击事件
        if (tutorialList) {
            tutorialList.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    const stepId = parseInt(e.target.dataset.step);
                    if (!isNaN(stepId)) {
                        currentStep = stepId;
                        console.log(`切换到教程步骤: ${stepId}`);
                        loadTutorialContent(stepId);
                    }
                }
            });
        }
        
        console.log("Git教程应用已成功初始化");
    } catch (error) {
        console.error("初始化期间发生错误:", error);
        document.getElementById('debug-info').style.display = 'block';
    }
});
