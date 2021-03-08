<template>
  <el-container id="nav">
    <el-header class="rocli-header">
      <i class="el-icon-timer" /> Ro-CLI
      <div style="position:absolute; left:200px;top:0;">
        <router-link
          v-for="link of links"
          :key="link.path"
          :to="link.path"
        >
          {{ link.name }} - | -
        </router-link>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { routes } from '@/router/index';

export default {
  name: 'App',
  data() {
    return {
      links: routes,
    };
  },
};
</script>

<style>
#app {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.rocli-header {
  position: relative;
  line-height: 2;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #e3e3e3;
}
</style>
