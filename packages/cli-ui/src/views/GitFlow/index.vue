<template>
  <div class="gitflow">
    <el-container>
      <el-header style="height:3em; padding:0; text-align:left;">
        <el-button @click="curType = 1">Fork branch</el-button>
        <el-button @click="curType = 2">Sync branch</el-button>
      </el-header>
      <el-main style="background-color: #e3e3e3">
        <GitFork v-if="curType === 1" />
        <GitSync v-if="curType === 2" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GitFork from './fork/index.vue';
import GitSync from './sync/index.vue';

export default {
  name: 'GitFlow',
  components: {
    GitFork,
    GitSync,
  },
  data() {
    return {
      curType: 1,
    };
  },
};
</script>
