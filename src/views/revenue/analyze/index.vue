// 营收数据分析功能
<template>
  <div class="analyze second-layout">
    <el-row>
      <el-col :md="14" :sm="9" class="sm-bottom">
        <el-row :gutter="20">
          <el-col :lg="4" :md="6" :sm="12">
            <el-select v-model="state.value" placeholder="测试门店">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="9" :sm="13">
        <el-row class="date-param">
          <el-col :lg="18" :md="17" :sm="16">
            <ul class="date-ul">
              <li :class="{ 'is-select-li': state.fastDateType === 'thisMonth' }" @click="fastDateHanderClick('thisMonth')">
                月
              </li>
              <li :class="{ 'is-select-li': state.fastDateType === 'thisYear' }" @click="fastDateHanderClick('thisYear')">年</li>
            </ul>
          </el-col>
          <el-col :lg="6" :md="7" :sm="7">
            <div v-show="state.fastDateType === 'thisMonth'">
              <el-date-picker v-model="state.month" type="month" placeholder="选择月" />
            </div>
            <div v-show="state.fastDateType === 'thisYear'">
              <el-date-picker v-model="state.year" type="year" placeholder="选择年" />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="1" :sm="2" class="export-print">
        <el-row>
          <el-col :md="12" :sm="12">
            <i class="iconfont icon-export" />
          </el-col>
          <el-col :md="12" :sm="12">
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
          @click="threeHandleClick(index, item.tabName)"
        >
          {{ item.threeMenus }}
          <div class="arrow-up" />
        </div>
      </el-col>
      <el-col
        :span="2"
        class="fout-style"
        :class="{ 'is-active-four': menu.fourShow.length === menu.fourMenus.length }"
        @click="selectAll(menu.fourMenus)"
        >所有</el-col
      >
      <el-col
        v-for="(item, index) in menu.fourMenus"
        :key="index"
        :span="2"
        :class="{ 'is-active-four': menu.fourShow.indexOf(item) > -1 }"
        class="fout-style"
        @click="fourHandleClick(item)"
      >
        {{ item }}
      </el-col>
    </el-row>
    <component :is="state.componentName" />
  </div>
</template>

<script>
import coverage from './coverage.vue';
import payment from './payment.vue';
import { onMounted, reactive } from 'vue';
export default {
  components: {
    coverage,
    payment
  },
  setup() {
    const state = reactive({
      componentName: 'coverage',
      // 日期参数
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      fastDateType: 'thisMonth',
      // 时间参数
      month: '',
      year: '',
      // 走马灯参数
      height: '400px',
      // 表格数据
      tableData: []
    });

    const menu = reactive({
      menus: [
        { tabName: 'coverage', threeMenus: '险种方式', fourMenus: ['自费', '台州医保'] },
        { tabName: 'payment', threeMenus: '支付渠道方式', fourMenus: ['文案1', '文案', '文案'] },
        { threeMenus: '所有科室', fourMenus: ['文案2', '文案', '文案'] },
        { threeMenus: '物资类别', fourMenus: ['文案3', '文案', '文案'] },
        { threeMenus: '开票项目', fourMenus: ['文案4', '文案', '文案'] }
      ],
      fourMenus: ['自费', '台州医保'],
      threeShow: 0,
      fourShow: []
    });

    // 点击快速选择时间范围
    let fastDateHanderClick = (val) => {
      state.fastDateType = val;
      console.log(val);
    };

    // 点击三级菜单事件
    let threeHandleClick = (index, tabName) => {
      menu.threeShow = index;
      menu.fourMenus = JSON.parse(JSON.stringify(menu.menus[index]['fourMenus']));
      menu.fourShow = [];
      state.componentName = tabName;
    };

    // 点击四级菜单事件
    let fourHandleClick = (val) => {
      // 已存在则删除
      let index = menu.fourShow.indexOf(val);
      if (index > -1) {
        menu.fourShow.splice(index, 1);
      } else {
        // 不存在则添加
        menu.fourShow.push(val);
      }
    };

    // 四级菜单选择所有
    let selectAll = (vals) => {
      console.log(menu.fourShow.length);
      if (menu.fourShow.length === vals.length) {
        menu.fourShow = [];
      } else {
        menu.fourShow = JSON.parse(JSON.stringify(vals));
      }
    };

    onMounted(() => {
      console.log('-------onMounted');
    });

    return {
      state,
      menu,
      fastDateHanderClick,
      threeHandleClick,
      fourHandleClick,
      selectAll
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

// 时间参数样式
.date-param {
  text-align: right;
  & .date-ul {
    margin-right: 5px;
  }
  & .el-input.el-input--prefix {
    width: 100%;
  }
}
</style>
