// 营收数据分析功能
<template>
  <div class="analyze second-layout">
    <el-row>
      <el-col :span="15">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select v-model="state.value" placeholder="测试门店">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="10">
            <ul class="date-ul">
              <li class="is-select-li">今日</li>
              <li>本月</li>
              <li>本年</li>
            </ul>
          </el-col>
          <el-col :span="14">
            <el-date-picker v-model="state.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1" class="export-print">
        <el-row>
          <el-col :span="12">
            <i class="iconfont icon-export" />
          </el-col>
          <el-col :span="12">
            <i class="iconfont icon-dayin" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="level-three-menu">
      <el-col :span="24">
        <div
          v-for="(item, index) in menu.menus"
          :key="index"
          :class="{ 'is-active-three': menu.threeShow == index }"
          class="three-style"
          @click="threeHandleClick(index,item.tabName)"
        >
          {{ item.threeMenus }}
          <div class="arrow-up" />
        </div>
      </el-col>
      <el-col
        v-for="(item, index) in menu.fourMenus"
        :key="index"
        :span="2"
        :class="{ 'is-active-four': menu.fourShow == index }"
        class="fout-style"
        @click="fourHandleClick(index)"
      >
        {{ item }}
      </el-col>
    </el-row>
    <component :is="state.componentName" />
  </div>
</template>

<script>
import paycost from './paycost.vue';
import payment from './payment.vue';
import { onMounted, reactive } from 'vue';
export default {
  components: {
    paycost,
    payment
  },
  setup() {
    const state = reactive({
      componentName: 'paycost',
      // 日期参数
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      // 时间参数
      date: '',
      // 走马灯参数
      height: '400px',
      // 表格数据
      tableData: []
    });

    const menu = reactive({
      menus: [
        { tabName: 'paycost',threeMenus: '缴费方式', fourMenus: ['所有', '文案', '文案', '文案'] },
        { tabName: 'payment',threeMenus: '支付渠道方式', fourMenus: ['所有', '文案1', '文案', '文案'] },
        { threeMenus: '所有科室', fourMenus: ['所有', '文案2', '文案', '文案'] },
        { threeMenus: '物资类别', fourMenus: ['所有', '文案3', '文案', '文案'] },
        { threeMenus: '开票项目', fourMenus: ['所有', '文案4', '文案', '文案'] }
      ],
      fourMenus: ['所有', '文案', '文案', '文案'],
      threeShow: 0,
      fourShow: 0
    });

    // 点击三级菜单事件
    let threeHandleClick = (index, tabName) => {
      menu.threeShow = index;
      menu.fourMenus = menu.menus[index]['fourMenus'];
      state.componentName = tabName;
    };

    // 点击四级菜单事件
    let fourHandleClick = (index) => {
      menu.fourShow = index;
    };

    onMounted(() => {
      console.log('-------onMounted');
    });

    return {
      state,
      menu,
      threeHandleClick,
      fourHandleClick
    };
  }
};
</script>

<style lang="scss">
// 三级菜单样式
.level-three-menu {
  background-color: white;
  border-radius: 5px;
  & .el-tabs__nav-wrap.is-top {
    border-bottom: 1px solid #5db1ff;
    position: relative;
  }
  & .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__active-bar.is-top {
    height: 0;
  }
}

// 三级菜单样式
.three-style {
  position: relative;
  width: 20%;
  display: inline-block;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #5db1ff;
  cursor: pointer;
}

// 激活三级菜单
.is-active-three {
  color: #1e91fe;
  & .arrow-up {
    display: block;
  }
}

// 向上箭头
.arrow-up {
  width: 7px;
  height: 7px;
  position: absolute;
  bottom: -4px;
  left: calc(50% - 3.5px);
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  background-color: white;
  border: 1px solid #5db1ff;
  border-right: 0;
  border-bottom: 0;
  content: '';
  z-index: 99;
  display: none;
}

// 四级菜单样式
.fout-style {
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 12px;
  cursor: pointer;
}

// 激活四级菜单
.is-active-four {
  color: #1e91fe;
}
</style>
