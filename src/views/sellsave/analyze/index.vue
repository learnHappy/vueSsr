// 营收数据分析功能
<template>
  <div class="analyze second-layout" style="overflow: auto">
    <el-row>
      <el-col :md="15" :sm="24" class="sm-bottom">
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
            <div v-if="state.fastDateType === 'thisMonth'">
              <el-date-picker v-model="state.month" type="month" placeholder="选择月" @change="monthRange" />
            </div>
            <div v-if="state.fastDateType === 'thisYear'">
              <el-date-picker v-model="state.year" type="year" placeholder="选择年" @change="monthRange" />
            </div>
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
      <el-col :span="2" class="fout-style">
        <el-checkbox label="所有" v-model="state.checkAll" @change="selectAll(menu.fourMenus)" />
      </el-col>
      <el-col v-for="(item, index) in menu.fourMenus" :key="index" :span="2" class="fout-style" @change="fourHandleClick(item)">
        <el-checkbox :label="item.label" v-model="menu.fourMenus[index].checked" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import moment from 'moment';
import axios from '../../../axios/index';
import {
  tenantId,
  pageHeight,
  paymentGinseng,
  suppliesGinseng,
  paymentGinsengEcharts,
  suppliesGinsengEcharts
} from '../../../utils/publus';
export default {
  setup() {
    const state = reactive({
      componentName: '',
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
      month: moment(new Date()).format('YYYYMM'),
      year: moment(new Date()).format('YYYY'),
      // 走马灯参数
      height: '400px',
      checkAll: true,
      checkOne: (val, val1) => val.indexOf(val1) > -1
    });

    const menu = reactive({
      menus: [{ tabName: 'salesSupplies', threeMenus: '物资类别', fourMenus: suppliesGinseng }],
      fourMenus: suppliesGinseng,
      threeShow: 0,
      fourShow: suppliesGinseng.map((item) => item.value)
    });

    // 条件入参
    const params = reactive({
      tenantId,
      startDate: moment(state.month).startOf('month').format('YYYYMMDD'),
      endDate: moment(state.month).endOf('month').format('YYYYMMDD'),
      prarm2: suppliesGinseng.map((item) => item.value),
      dateType: 'thisMonth',
      supplierName: ''
    });

    // 点击快速选择时间范围
    let fastDateHanderClick = (val) => {
      state.fastDateType = val;
      params.dateType = val;
      if (val === 'thisMonth') {
        monthRange(state.month);
      } else if (val === 'thisYear') {
        monthRange(state.year);
      }
    };

    // 点击三级菜单事件
    let threeHandleClick = (index, tabName) => {
      menu.threeShow = index;
      menu.fourMenus = JSON.parse(JSON.stringify(menu.menus[index]['fourMenus']));
      // 初始化参数条件
      menu.fourShow = menu.fourMenus.map((item) => item.value);
      state.componentName = tabName;
      state.checkAll = true;
      state.fastDateType = 'thisMonth';
      state.month = moment(new Date()).format('YYYY-MM');
      state.year = moment(new Date()).format('YYYY');
      params.startDate = moment(state.month).startOf('month').format('YYYYMMDD');
      params.endDate = moment(state.month).endOf('month').format('YYYYMMDD');
      params.prarm2 = menu.fourMenus.map((item) => item.value);
      params.dateType = 'thisMonth';
      params.supplierName = '';
    };

    // 获取开始时间和结束时间
    let monthRange = (date) => {
      let dateType = '';
      if (state.fastDateType === 'thisMonth') {
        dateType = 'month';
      } else if (state.fastDateType === 'thisYear') {
        dateType = 'year';
      }
      params.startDate = moment(date).startOf(dateType).format('YYYYMMDD');
      params.endDate = moment(date).endOf(dateType).format('YYYYMMDD');
    };

    watchEffect(async () => {});

    return {
      state,
      menu,
      params,
      fastDateHanderClick,
      threeHandleClick,
      monthRange
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../../scss/analyze.scss';
</style>
<style lang="scss">
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