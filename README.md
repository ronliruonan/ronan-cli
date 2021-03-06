# ronan-cli

## 功能概览2

Feature     | Win32 | macOS | Ubuntu | Desc 
:-          |  :-:  |  :-:  |   :-:  | :-
`ronan`        |  ✔️   |   ❗   |   ❌  | 查看帮助 
`ronan add`    |  ✔️   |   ❗   |   ❌  | 添加项目配置
`ronan list`   |  ✔️   |   ❗   |   ❌  | 查看已保存的项目
`ronan start`  |  ✔️   |   ❗   |   ❌  | `npm start` such a project
`ronan fork`   |  ✔️   |   ❗   |   ❌  | fork such branch from target repo
`ronan pr`     |  ✔️   |   ❗   |   ❌  | 发起merge/pull request
`ronan mr`     |  ✔️   |   ❗   |   ❌  | 发起merge/pull request
`ronan open`   |  ✔️   |   ❗   |   ❌  | open such a project with folder/ vscode


## 整理一份脑图
// to do


## npm 相关操作
记录使用到的操作，以免就着馒头吃了

> 软连接 npm link 包
```shell
// 建立软链接
npm link

// to do 卸载link
```

> 修改npm 包版本
```shell
// patch: 补丁包
// minor：小修小改
// major: 大改动
npm version <update_type>
```

> 切换npm源头
```shell
// 查看所有
nrm ls

// 修改源
nrm use taobao
```

> npm登录情况
```shell
npm whoami

// note: 使用用户名登录，非邮箱地址
npm login
```

## vscode api
https://code.visualstudio.com/docs/editor/command-line
vscode://file/{full path to project}/

> macOS
1. terminal：`open vscode://file/usr/local/`    
2. GitHub Desktop： 牛啤使用installPath来催动运行，通过npm`path`包来实现

> win32
>> `code c:/`    
>> GitHub Desktop 牛啤使用installPath来催动运行，通过注册表实现

> linux
>> `code usr/local/`     
>> GitHub Desktop 牛啤使用installPath来催动运行，通过`usr/bin/code` 实现
