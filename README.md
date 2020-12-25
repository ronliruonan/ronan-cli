# ro-cli

## 功能概览

Feature     | Win32 | macOS | Ubuntu | Desc 
:-          |  :-:  |  :-:  |   :-:  | :-
`ro`        |  ✔️   |   ❗   |   ❌  | 查看帮助 
`ro add`    |  ✔️   |   ❗   |   ❌  | 添加项目配置
`ro list`   |  ✔️   |   ❗   |   ❌  | 查看已保存的项目
`ro start`  |  ✔️   |   ❗   |   ❌  | `npm start` such a project
`ro fork`   |  ✔️   |   ❗   |   ❌  | fork such branch from target repo
`ro pr`     |  ✔️   |   ❗   |   ❌  | 发起merge/pull request
`ro mr`     |  ✔️   |   ❗   |   ❌  | 发起merge/pull request
`ro open`   |  ✔️   |   ❗   |   ❌  | open such a project with folder/ vscode


## 整理一份脑图
// to do


## npm 相关操作
记录使用到的操作，以免就着馒头吃了

1. 软连接 npm link 包
```shell
// 建立软链接
npm link

// to do 卸载link
```

2. 修改npm 包版本
```shell
// patch: 补丁包
// minor：小修小改
// major: 大改动
npm version <update_type>
```

3. 切换npm源头
```shell
// 查看所有
nrm ls

// 修改源
nrm use taobao
```

4. npm登录情况
```shell
npm whoami

// note: 使用用户名登录，非邮箱地址
npm login
```

## vscode api
https://code.visualstudio.com/docs/editor/command-line
vscode://file/{full path to project}/

> macOS
>> open vscode://file/usr/local/

> win32
>> code c:/

> linux
>> code usr/local/
