<template>
  <el-container>
    <el-aside :width="asideWidth">
      <!-- logo组件 -->
      <Logo />
      <el-menu
        class="el-menu-vertical-demo"
        :router="true"
        :collapse="isCollapse"
      >
        <!-- 左侧菜单导航栏组件 -->
        <NavMenu />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部栏 -->
        <Header :shrink="shrink" @isshow="isShowParent" />
      </el-header>
      <!-- 内容主体部分 -->
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from '@/components/navigation/navMenu.vue';
import Logo from '@/components/logo/logo.vue';
import Header from '@/components/header/header.vue';

export default {
  components: {
    NavMenu, // 声明子组件
    Logo,
    Header
  },
  data() {
    return {
      isCollapse: false,
      asideWidth: '220px',
      shrink: 'el-icon-s-fold'
    };
  },
  methods: {
    isShowParent() {
      console.log('------------> ishow');
      // 收缩按钮操作
      if (this.isCollapse) {
        this.isCollapse = false;
        this.asideWidth = '220px';
        this.shrink = 'el-icon-s-fold';
      } else {
        this.isCollapse = true;
        this.asideWidth = '64px';
        this.shrink = 'el-icon-s-unfold';
      }
    }
  }
};
</script>

<style lang="scss" socpe>
html,
body {
  height: 100%;
}

.el-menu-vertical-demo {
  min-height: calc(100% - 60px);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  text-align: left;
}

.el-menu {
  border-right: unset;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-header,
.el-footer {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #f2f2f2;
  padding: 10px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container {
  height: 100%;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 收缩效果时间 */
.horizontal-collapse-transition {
  transition: 0s width ease-in-out;
}
</style>