<template>
  <el-submenu v-for="(item, index) in routes" :key="index" :index="item.path ? item.path : `${index}`">
    <template #title>
      <i :class="item.icon" />
      <span>{{ item.name }}</span>
    </template>
    <el-menu-item-group v-for="(child, idx) in item.children" :key="idx">
      <el-menu-item :index="child.path">{{ child.name }}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
import { defineComponent } from 'vue';
import axios from '../../axios/index';
export default defineComponent({
  name: 'NavMenu',
  data() {
    return {
      routes: []
    };
  },
  // async created() {
  //   await this.$store.dispatch('menus/getMenusData');
  //   let { menusInfo } = this.$store.state.menus;
  //   this.routes = menusInfo;
  //   console.log(this.routes);
  // },
  async created() {
    await axios.get('menus').then((res) => {
      console.log(res);
      this.routes = res;
    });
  }
});
</script>

<style>
</style>