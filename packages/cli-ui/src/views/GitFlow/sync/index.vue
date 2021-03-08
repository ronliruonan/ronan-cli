<template>
  <div class="gitsync">
    <el-container>
      <el-aside
        width="280px"
        style="padding:10px; text-align:left; background-color:rgb(238, 241, 246)"
      >
        <h1 style="margin:0; font-size:24px; color:#F56C6C;">Git Sync:</h1>
        <div>
          <p
            :class="{ 'step-actived': selectedProject }"
            class="gitsync_step step-1"
            title="点击重新选择项目"
            @click="reSelectPro"
          >*1. 选择项目: {{ selectedProject && curProject.projectName }}</p>
          <p
            class="gitsync_step step-2"
            :class="{ ' step-actived': checkGit }"
          >2. 确认Git仓库：{{ checkGit }} </p>
          <p
            class="gitsync_step step-3"
            :class="{ ' step-actived': checkTarget }"
          >3. 添加目标仓库: {{ checkTarget }} </p>
          <p
            class="gitsync_step step-4"
            :class="{ ' step-actived': checkFetch }"
          >4. Fetch目标仓库: {{ checkFetch }} </p>
          <p
            class="gitsync_step step-5"
            :class="{ ' step-actived': checkBranches }"
          >5. 获取目标的branch：{{ checkBranches }} </p>
          <p
            :class="{ 'step-actived': checkSync }"
            class="gitsync_step step-6"
          >6. 选择目标branch：{{ checkSync }} </p>
          <p
            :class="{ 'step-actived': checkSync }"
            class="gitsync_step step-7"
          >7. 选择开发branch：{{ checkSync }} </p>
          <p
            class="gitsync_step step-8"
            :class="{ ' step-actived': checkSync }"
          >8. Syncing: {{ checkSync }} </p>
        </div>
      </el-aside>
      <el-main style="padding-top:0; background-color: #e3e3e3">
        <div style="text-align:left;">
          <el-button @click="onOpenVSCode">open with vscode</el-button>
          <el-button @click="onOpenFolder">open with folder</el-button>
        </div>
        <div
          v-if="curProject"
          style="text-align:left; font-size:14px;"
        >
          <p>
            <span style="color:red;">LocalPath: </span> {{ curProject.localPath }} <br>
            <span style="color:red;">TargetRepo: </span> {{ curProject.targetRepo }} <br>
          </p>
        </div>
        <div
          v-show="!checkGit"
          style="text-align:left;"
        >
          <el-select
            v-model="selectedProject"
            placeholder="请选择项目"
          >
            <el-option
              v-for="item in projects"
              :key="item.localPath"
              :label="item.projectName"
              :value="item.localPath"
            />
          </el-select>
          <el-button @click="checkGitRepo">手动 确认Git仓库信息</el-button>
        </div>
        <!-- 下拉选择目标分支 -->
        <div
          v-show="checkBranches && !checkSync && !checkSync"
          style="text-align:left;"
        >
          <el-select
            v-model="selectedTargetBranch"
            filterable
            placeholder="选择目标仓库branch"
            style="width:100%;"
          >
            <el-option
              v-for="item in branches"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <br>
          <br>
          <el-select
            v-model="selectedLocalBranch"
            filterable
            placeholder="选择本地仓库branch"
            style="width:100%;"
          >
            <el-option
              v-for="item in localBranches"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <br>
          <br>
          <el-button @click="onSyncing">forking</el-button>
        </div>
        <div
          v-if="checkSync"
          style="text-align:left;"
        >
          <span style="color:red;">Target branch: </span> {{ selectedTargetBranch }} <br>
          <span style="color:red;">Dev branch: </span> {{ selectedLocalBranch }} <br>
        </div>
        <div
          v-if="checkSync"
          style="margin:30px; font-size:30px;"
        >
          😀😃😄😁😆🙂😉😊🥰😍
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { toRaw } from 'vue';
import ws from '@/WSS';
import Enums from '../../../../../cli-enums/index';
import utilJSON from '../../../../../cli-shared-utils/utilJSON';

const { toJSONString, toJSONParse } = utilJSON;
const MsgType = Enums.WSMsgType;

export default {
  name: 'GitSync',
  data() {
    return {
      mustInfos: [],
      projects: [],
      branches: [],
      localBranches: [],
      selectedProject: null,
      selectedTargetBranch: null,
      selectedLocalBranch: null,
      checkGit: false,
      checkTarget: false,
      checkFetch: false,
      checkBranches: false,
      checkSync: false,
    };
  },
  computed: {
    curProject() {
      if (!this.selectedProject) return null;

      const finded = this.projects.find((i) => i.localPath === this.selectedProject);
      console.log(finded);
      console.log(finded.projectName);
      return finded;
    },
  },
  mounted() {
    const handler = () => {
      ws.send(toJSONString({ type: MsgType.cacheProjects }));
      ws.onmessage = (event) => {
        const objMsg = toJSONParse(event.data);

        if (objMsg.type === MsgType.cacheProjects) {
          this.projects = objMsg.data;
        } else if (objMsg.type === MsgType.addTargetUpstream) {
          if (objMsg.data.success) {
            this.checkTarget = true;
            ws.send(toJSONString({
              type: MsgType.fetchRocliUpstream,
              data: toRaw(this.curProject),
            }));
          } else {
            console.error('啊呀，坏了');
          }
        } else if (objMsg.type === MsgType.fetchRocliUpstream) {
          if (objMsg.data.success) {
            this.checkFetch = true;
            ws.send(toJSONString({
              type: MsgType.gitBranchR,
              data: toRaw(this.curProject),
            }));
          } else {
            console.error('啊啊啊啊，坏了');
          }
        } else if (objMsg.type === MsgType.gitBranchR) {
          if (objMsg.data.success) {
            this.checkBranches = true;
            this.branches = objMsg.data.branches;
            this.localBranches = objMsg.data.originBranches;
          } else {
            console.error('啊啊啊啊， 坏了');
          }
        } else if (objMsg.type === MsgType.gitSync) {
          if (objMsg.data.success) {
            this.checkSync = true;
            this.onOpenVSCode();
          }
        }
      };
    };
    if (ws.readyState === 1) {
      handler();
    } else {
      ws.onopen = handler;
    }
  },
  methods: {
    checkGitRepo() {
      this.checkGit = true;
      console.log(toRaw(this.curProject));

      ws.send(toJSONString({
        type: MsgType.addTargetUpstream,
        data: toRaw(this.curProject),
      }));
    },
    onSyncing() {
      ws.send(toJSONString({
        type: MsgType.gitFork,
        data: {
          project: toRaw(this.curProject),
          localBranch: this.inputedLocalBranch,
          targetBranch: this.selectedTargetBranch,
        },
      }));
    },
    onOpenVSCode() {
      ws.send(toJSONString({
        type: MsgType.openWithVSCode,
        data: toRaw(this.curProject),
      }));
    },
    onOpenFolder() {
      ws.send(toJSONString({
        type: MsgType.openWithFolder,
        data: toRaw(this.curProject),
      }));
    },
    reSelectPro() {
      this.checkGit = false;
      this.checkGit = false;
      this.checkTarget = false;
      this.checkFetch = false;
      this.checkBranches = false;
      this.checkSync = false;
      this.checkSync = false;
    },
  },
};
</script>

<style>
.gitsync_step {
  opacity: .3;
}
.gitsync_step.step-1,
.gitsync_step.step-6,
.gitsync_step.step-7 {
  cursor: pointer;
}
.gitsync_step.step-actived {
  opacity: 1;
  color: #409EFF;
}
</style>
