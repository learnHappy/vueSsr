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
      <el-col :span="24" class="three-style-border">
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

    <component :is="componentName" v-if="state.componentName === 'salesSupplies'" :subclass="subclassChild"></component>
    <component :is="componentName" v-else-if="state.componentName === 'salesInvoice'" :subclass="subclassChild1"></component>
    <component :is="componentName" v-else-if="state.componentName === 'salesEphedrine'" :subclass="subclassChild2"></component>
  </div>
</template>

<script>
import salesSupplies from './salesSupplies.vue';
import { nextTick, reactive, toRef, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import moment from 'moment';
import axios from '../../../axios/index';
import analyzeApi from '../../../api/sellsave/analyze';
import {
  tenantId,
  pageHeight,
  suppliesGinseng,
  suppliesGinsengEcharts,
  ephedrineGinseng,
  ephedrineGinsengEcharts,
  invoicePartGinseng,
  invoicePartGinsengEcharts
} from '../../../utils/publus';
export default {
  components: {
    salesSupplies
  },
  setup() {
    let componentName = 'salesSupplies';
    const state = reactive({
      componentName: 'salesSupplies',
      // 日期参数
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      fastDateType: 'thisMonth',
      tableData: [],
      // 时间参数
      month: moment(new Date()).format('YYYYMM'),
      year: moment(new Date()).format('YYYY'),
      // 走马灯参数
      height: '400px',
      checkAll: true,
      checkOne: (val, val1) => val.indexOf(val1) > -1
    });

    const menu = reactive({
      menus: [
        { tabName: 'salesSupplies', threeMenus: '物资类别', fourMenus: suppliesGinseng },
        { tabName: 'salesInvoice', threeMenus: '开票项目', fourMenus: invoicePartGinseng },
        { tabName: 'salesEphedrine', threeMenus: '麻黄碱类', fourMenus: ephedrineGinseng }
      ],
      fourMenus: suppliesGinseng,
      threeShow: 0,
      fourShow: suppliesGinseng.map((item) => item.value)
    });

    //子组件翻译入参
    const ginseng = reactive({
      ginsengTable: suppliesGinseng,
      ginsengEcharts: suppliesGinsengEcharts,
      api: analyzeApi.suppliesCategoryAnalyze
    });

    // 子组件条件入参
    const params = reactive({
      tenantId,
      startDate: moment(state.month).startOf('month').format('YYYYMMDD'),
      endDate: moment(state.month).endOf('month').format('YYYYMMDD'),
      prarm2: suppliesGinseng.map((item) => item.value),
      dateType: 'thisMonth',
      supplierName: ''
    });

    const subclassChild = reactive({
      ginseng: JSON.parse(JSON.stringify(ginseng)),
      params: JSON.parse(JSON.stringify(params))
    });
    const subclassChild1 = reactive({
      ginseng: {},
      params: {}
    });
    const subclassChild2 = reactive({
      ginseng: {},
      params: {}
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
      // 三级菜单修改
      menu.threeShow = index;
      menu.fourMenus = JSON.parse(JSON.stringify(menu.menus[index]['fourMenus']));
      menu.fourShow = menu.fourMenus.map((item) => item.value);
      // state 公共参数修改
      state.checkAll = true;
      state.fastDateType = 'thisMonth';
      state.month = moment(new Date()).format('YYYY-MM');
      state.year = moment(new Date()).format('YYYY');
      // 子组件入参条件修改
      params.startDate = moment(state.month).startOf('month').format('YYYYMMDD');
      params.endDate = moment(state.month).endOf('month').format('YYYYMMDD');
      params.prarm2 = menu.fourMenus.map((item) => item.value);
      console.log(params.prarm2);
      params.dateType = 'thisMonth';
      params.supplierName = '';
      // 子组件翻译入参修改
      if (tabName === 'salesSupplies') {
        ginseng.ginsengTable = suppliesGinseng;
        ginseng.ginsengEcharts = suppliesGinsengEcharts;
        ginseng.api = analyzeApi.suppliesCategoryAnalyze;
        subclassChild.ginseng = JSON.parse(JSON.stringify(ginseng));
        subclassChild.params = JSON.parse(JSON.stringify(params));
      } else if (tabName === 'salesInvoice') {
        ginseng.ginsengTable = invoicePartGinseng;
        ginseng.ginsengEcharts = invoicePartGinsengEcharts;
        ginseng.api = analyzeApi.makeOutAnInvoiceAnalyze;
        subclassChild1.ginseng = JSON.parse(JSON.stringify(ginseng));
        subclassChild1.params = JSON.parse(JSON.stringify(params));
      } else if (tabName === 'salesEphedrine') {
        ginseng.ginsengTable = ephedrineGinseng;
        ginseng.ginsengEcharts = ephedrineGinsengEcharts;
        ginseng.api = analyzeApi.ephedrineAnalyze;
        subclassChild2.ginseng = JSON.parse(JSON.stringify(ginseng));
        subclassChild2.params = JSON.parse(JSON.stringify(params));
      }
      state.componentName = tabName;
    };

    // 点击四级菜单事件
    let fourHandleClick = (vals) => {
      let val = vals.value;
      // 已存在则删除
      let index = menu.fourShow.indexOf(val);
      if (index > -1) {
        menu.fourShow.splice(index, 1);
      } else {
        // 不存在则添加
        menu.fourShow.push(val);
      }
      state.checkAll = menu.fourShow.length === menu.fourMenus.length;
      params.prarm2 = menu.fourShow;
      if (state.componentName === 'salesSupplies') {
        subclassChild.params = JSON.parse(JSON.stringify(params));
      } else if (state.componentName === 'salesInvoice') {
        subclassChild1.params = JSON.parse(JSON.stringify(params));
      } else if (state.componentName === 'salesEphedrine') {
        subclassChild2.params = JSON.parse(JSON.stringify(params));
      }
    };

    // 四级菜单选择所有
    let selectAll = (vals) => {
      if (menu.fourShow.length === vals.length) {
        menu.fourShow = [];
      } else {
        menu.fourShow = JSON.parse(JSON.stringify(vals.map((val) => val.value)));
      }
      menu.fourMenus = vals.map((item) => {
        return {
          label: item.label,
          value: item.value,
          checked: state.checkAll
        };
      });
      params.prarm2 = menu.fourShow;
      if (state.componentName === 'salesSupplies') {
        subclassChild.params = JSON.parse(JSON.stringify(params));
      } else if (state.componentName === 'salesInvoice') {
        subclassChild1.params = JSON.parse(JSON.stringify(params));
      } else if (state.componentName === 'salesEphedrine') {
        subclassChild2.params = JSON.parse(JSON.stringify(params));
      }
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
      if (state.componentName === 'salesSupplies') {
        subclassChild.params = JSON.parse(JSON.stringify(params));
      } else if (state.componentName === 'salesInvoice') {
        subclassChild1.params = JSON.parse(JSON.stringify(params));
      } else if (state.componentName === 'salesEphedrine') {
        subclassChild2.params = JSON.parse(JSON.stringify(params));
      }
    };

    return {
      componentName,
      state,
      menu,
      ginseng,
      params,
      subclassChild,
      subclassChild1,
      subclassChild2,
      fastDateHanderClick,
      threeHandleClick,
      monthRange,
      fourHandleClick,
      selectAll
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