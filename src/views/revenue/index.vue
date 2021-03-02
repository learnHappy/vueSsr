// 统计功能
<template>
  <div class="revenue">
    <router-link to="/welcome">
      <div style="position: absolute; top: 7px; right: 20px; color: #2e92fa; cursor: pointer; z-index: 999">
        <i style="font-size: 22px" class="iconfont icon-withdraw" />
      </div>
    </router-link>
    <el-tabs v-model="state.activeName" @tab-click="handleClick">
      <el-tab-pane label="营收统计" name="statistical" />
      <el-tab-pane label="营收数据分析" name="analyze" />
    </el-tabs>
    <component :is="state.componentName" />
  </div>
</template>
<script>
import statistical from './statistical.vue';
import analyze from './analyze/index.vue';
import { reactive } from 'vue';
export default {
  components: { statistical, analyze },
  setup() {
    let state = reactive({
      componentName: 'statistical',
      // 二级菜单标签参数
      activeName: 'statistical'
    });

    // 点击tabs标签页,触发方法
    let handleClick = (target) => {
      if (target.props.name) {
        state.componentName = target.props.name;
      } else {
        console.log('没有获取到对应功能名称!');
      }
    };
    return {
      state,
      handleClick
    };
  }
};
</script>
<style scoped lang="scss">
@import '../../scss/revenue/index.scss';
</style>