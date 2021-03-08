// const chalk = require('chalk');

// const WebSocket = require('ws');
// const Enums = require('../cli-enums/index');
// const WsPort = Enums.Ports.wsPort;
// const WsPath = Enums.Path.wsPath;
// const MsgType = Enums.WSMsgType;
// const wss = new WebSocket.Server({ port: WsPort, path: WsPath });

// const utilJSON = require('../cli-shared-utils/utilJSON');
// const toJSONString = utilJSON.toJSONString;
// const toJSONParse = utilJSON.toJSONParse;

// wss.on('connection', connection);
// console.log(chalk.cyanBright(`ws://localhost:${WsPort}${WsPath}`), 'is working');

// function connection(ws) {
//   const send = data => ws.send(toJSONString(data));

//   send({ type: MsgType.connected });
//   send({ type: MsgType.test, data: '1234 check check' });

//   ws.on('message', async msg => {
//     try {
//       console.log('recived: $s', toJSONString(msg));

//       const objMsg = typeof msg === 'string' ? toJSONParse(msg) : toJSONParse(msg);

//       if (objMsg.type === MsgType.test) {
//         return send({ type: MsgType.test, data: 'test' });
//       }

//       if (objMsg.type === MsgType.cacheProjects) {
//         return send({ type: MsgType.cacheProjects, data: require('../cli-services/cache').cacheProjects });
//       }

//       if (objMsg.type === MsgType.addTargetUpstream) {
//         const { gitRemoteRemove, gitRemoteAdd } = require('../cli-services/git');
//         const project = objMsg.data;
//         await gitRemoteRemove(project.localPath);

//         const res = await gitRemoteAdd(project.localPath, project.targetRepo);
//         if (res.code !== 0 && !res.stderr.includes('already exists')) {
//           // to do failed
//           return send({ type: MsgType.addTargetUpstream, data: { success: false } });
//         }
//         return send({ type: MsgType.addTargetUpstream, data: { success: true } });
//       }

//       if (objMsg.type === MsgType.fetchRocliUpstream) {
//         const { gitFetchRepo } = require('../cli-services/git');
//         const project = objMsg.data;
//         const fetchUpsreamName = require('../cli-enums/index').ConstName.ROCLIUPSTREAM;
//         const res = await gitFetchRepo(project.localPath, fetchUpsreamName);

//         if (res.code !== 0) {
//           return send({ type: MsgType.fetchRocliUpstream, data: { success: false } });
//         }

//         return send({ type: MsgType.fetchRocliUpstream, data: { success: true } });
//       }

//       if (objMsg.type === MsgType.gitBranchR) {
//         const { gitBranchR } = require('../cli-services/git');
//         const res = await gitBranchR(objMsg.data.localPath);

//         if (res.code !== 0) {
//           return send({ type: MsgType.gitBranchR, data: { success: false } });
//         }

//         const fetchUpsreamName = require('../cli-enums/index').ConstName.ROCLIUPSTREAM;
//         const originUpstreamName = require('../cli-enums/index').ConstName.ORIGIN;
//         return send({
//           type: MsgType.gitBranchR,
//           data: {
//             success: true,
//             branches: res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(fetchUpsreamName)),
//             originBranches: res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(originUpstreamName)),
//           },
//         });
//       }

//       if (objMsg.type === MsgType.gitFork) {
//         const { gitCheckoutBSpawn } = require('../cli-services/git');
//         const { data } = objMsg;
//         const res = await gitCheckoutBSpawn(data.project.localPath, data.localBranch, data.targetBranch);
//         if (res.code !== 0) {
//           return send({ type: MsgType.gitFork, data: { success: false, }, });
//         }

//         return send({ type: MsgType.gitFork, data: { success: true, }, });
//       }

//       if (objMsg.type === MsgType.gitTrack) {
//         const { gitRemoteRemove, gitPushUOrigin } = require('../cli-services/git');
//         const { project, localBranch } = objMsg.data
//         try {
//           const res = await gitRemoteRemove(project.localPath);
//           console.log(res);
//         } catch {
//           // to do
//         }

//         const res = await gitPushUOrigin(project.localPath, localBranch);

//         if (res.code !== 0) {
//           return send({ type: MsgType.gitTrack, data: { success: false } });
//         }

//         return send({ type: MsgType.gitTrack, data: { success: true } });
//       }

//       if (objMsg.type === MsgType.openWithVSCode) {
//         const { openWithVsCode } = require('../cli-editors/index');
//         openWithVsCode(objMsg.data.localPath);
//         return;
//       }

//       if (objMsg.type === MsgType.openWithFolder) {
//         const { openWithFolder } = require('../cli-editors/index');
//         openWithFolder(objMsg.data.localPath);
//         return;
//       }
//     } catch (error) {
//       console.log(chalk.red('error:'), error);
//     }
//   });
// }
