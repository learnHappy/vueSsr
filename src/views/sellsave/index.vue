// 进销存功能
<template>
  <div class="revenue">
    <router-link to="/welcome">
      <div style="position: absolute; top: 7px; right: 20px; color: #2e92fa; cursor: pointer; z-index: 999">
        <i style="font-size: 22px" class="iconfont icon-withdraw" />
      </div>
    </router-link>
    <el-tabs v-model="state.activeName" @tab-click="handleClick">
      <el-tab-pane label="销售统计" name="sales" />
      <el-tab-pane label="销售统计分析" name="analyze" />
    </el-tabs>
    <component :is="state.componentName" />
  </div>
</template>
<script>
import sales from './sales.vue';
import analyze from './analyze/index.vue';
import { reactive } from 'vue';
export default {
  components: { sales, analyze },
  setup() {
    let state = reactive({
      componentName: 'sales',
      // 二级菜单标签参数
      activeName: 'sales'
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