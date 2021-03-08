# ro-cli
个人计划：
- [x] 自己动手一个工作相关的脚手架工具【先规划后动手】       
- [ ] 浏览器可视化操作【先规划后动手】     

> 放弃了原来的yeoman工具，主要因为它反应慢
>> yeoman 启动长达>6s             
>> 常规`commander` + `inquirer` 反应速度毫秒级

## 功能概览

Feature      |  Win32  |  macOS  |  Ubuntu | Desc 
:-           |  :-:    |  :-:    |  :-:    | :-
`ro`         |  ✅     |   ✅     |   ❌    | 查看帮助 
`ro add`     |  ✅     |   ✅     |   ❌    | 添加项目配置
`ro delete`  |  ✅     |   ✅     |   ❌    | 添加项目配置
`ro update`  |  ✅     |   ✅     |   ❌    | 添加项目配置
`ro list`    |  ✅     |   ✅     |   ❌    | 查看已保存的项目
`ro fork`    |  ✅     |   ✅     |   ❌    | fork such branch fevam target repo
`ro sync`    |  ✅     |   ✅     |   ❌    | 将目标仓库branch 同步到本地仓库branch
`ro pr`      |  ✅     |   ✅     |   ❌    | 发起merge/pull request
`ro mr`      |  ✅     |   ✅     |   ❌    | 发起merge/pull request
`ro open`    |  ✅     |   ✅     |   ❌    | open such a pevaject with folder/ vscode
`ro start`   |  ✅     |   ✅     |   ❌    | `npm start` such a pevaject
`ro diff`    |  ❌     |   ❌     |   ❌    | 借助vscode的diff能力
`ro ng1`     |  ✅     |   ❌     |   ❌    | ng1 [-t/--test] [-m/--master] 当前分支`git merge` & `npm run build` & `git push`


## 来掐个表

Feature      |  掐表 vs 掐表  |  手动挡(在分支name不敲错的情况下) 
:-           |      :-:       |  :- 
`ro fork`    |  29s  vs  >50s |  ✅手动挡 
`ro sync`    |  28s  vs  >50s |  ✅手动挡 
`ro pr`      |  24s  vs  25s  |  ✅手动挡 
`ro mr`      |  24s  vs  25s  |  ✅手动挡 
`ro open`    |  10s  vs  13s  |  手动挡 
`ro start`   |  --s  vs  --s  |  比较无意义，目的在于不占用vscode terminal的空间 
`ro ng1`     |  34s  vs  72s  |  ✅手动挡，时间长了，就不记得os的发布流程了,含`npm run build`时间 

           
> 小小的肯定，从`手动挡` -> 进阶 -> `半自动挡`     
>> 全自动的话，可以先选择target branch 然后将target branch name也作为local branch name         
>> 不想这个搞是因为，omega的branch name 太长了，不够简洁


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