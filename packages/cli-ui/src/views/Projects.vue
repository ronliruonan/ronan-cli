<template>
  <div class="projects">
    <h1>This is an about projects</h1>
    <el-button @click="shua">Refresh</el-button>
    <el-table :data="projects" style="width: 99%">
      <el-table-column prop="projectName" label="项目名称" />
      <el-table-column prop="localPath" label="本地地址" />
      <el-table-column prop="targetRepo" label="目标仓库" />
      <el-table-column prop="gitPlatform" label="所属Git平台" />
    </el-table>
  </div>
</template>

<script>
import ws from '@/WSS';
import Enums from '../../../cli-enums/index';
import utilJSON from '../../../cli-shared-utils/utilJSON';

const { toJSONString, toJSONParse } = utilJSON;
const MsgType = Enums.WSMsgType;

export default {
  name: 'Projects',
  data() {
    return {
      projects: [],
    };
  },
  // created() {
  //   // to do
  // },
  mounted() {
    ws.onopen = () => {
      ws.send(toJSONString({ type: MsgType.cacheProjects }));
      ws.onmessage = (event) => {
        const objMsg = toJSONParse(event.data);

        if (objMsg.type === MsgType.cacheProjects) {
          this.projects = objMsg.data;
        }
      };
    };
  },
  methods: {
    shua() {
      ws.send(toJSONString({ type: MsgType.cacheProjects }));
    },
  },
};
</script>
