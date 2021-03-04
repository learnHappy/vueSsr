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
      <!-- <el-col :md="1" :sm="2" class="export-print">
        <el-row>
          <el-col :md="12" :sm="12">
            <i class="iconfont icon-export" />
          </el-col>
          <el-col :md="12" :sm="12">
            <i class="iconfont icon-dayin" />
          </el-col>
        </el-row>
      </el-col> -->
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
      <el-col
        v-for="(item, index) in menu.fourMenus"
        :key="index"
        :span="2"
        class="fout-style"
        @change="fourHandleClick(item.value)"
      >
        <el-checkbox :label="item.label" v-model="menu.fourMenus[index].checked" />
      </el-col>
    </el-row>
    <!-- <component :is="state.componentName" :datas="reslutData.coverageAnalysisData"/> -->
    <!-- coverage组件 -->
    <div v-if="state.componentName === 'coverage'">
      <div class="payment">
        <el-row>
          <el-col :span="24">
            <div class="echart-body table-layout">
              <el-carousel :autoplay="false" :height="state.height">
                <el-carousel-item>
                  <div id="plantBarEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
                <el-carousel-item>
                  <el-table
                    border
                    :max-height="state.height"
                    :data="coverageData.tableData"
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column
                      v-for="(item, index) in state.plantGinsengTable"
                      :prop="item.value"
                      :class-name="item.value"
                      :label="item.label"
                      :formatter="moneyFormatter"
                      :key="index"
                      align="right"
                      header-align="center"
                      min-width="120"
                    />
                  </el-table>
                </el-carousel-item>
                <el-carousel-item>
                  <div id="plantLineEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- payment组件 -->
    <div v-if="state.componentName === 'payment'">
      <div class="payment">
        <el-row>
          <el-col :span="24">
            <div class="echart-body table-layout">
              <el-carousel :autoplay="false" :height="state.height">
                <el-carousel-item>
                  <div id="paymentBarEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
                <el-carousel-item>
                  <el-table
                    border
                    :max-height="state.height"
                    :data="paymentData.tableData"
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column property="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column
                      v-for="(item, index) in state.paymentGinsengTable"
                      :property="item.value"
                      :class-name="item.value"
                      :label="item.label"
                      :formatter="moneyFormatter"
                      :key="index"
                      align="right"
                      header-align="center"
                      min-width="120"
                    />
                  </el-table>
                </el-carousel-item>
                <el-carousel-item>
                  <div id="paymentLineEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- department组件 -->
    <div v-if="state.componentName === 'department'">
      <div class="payment">
        <el-row>
          <el-col :span="24">
            <div class="echart-body table-layout">
              <el-carousel :autoplay="false" :height="state.height">
                <el-carousel-item>
                  <div id="departmentBarEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
                <el-carousel-item>
                  <el-table
                    border
                    :max-height="state.height"
                    :data="departmentData.tableData"
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column
                      v-for="(item, index) in state.departmentGinsengTable"
                      :prop="item.value"
                      :class-name="item.value"
                      :label="item.label"
                      :formatter="moneyFormatter"
                      :key="index"
                      align="right"
                      header-align="center"
                      min-width="120"
                    />
                  </el-table>
                </el-carousel-item>
                <el-carousel-item>
                  <div id="departmentLineEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- supplies组件 -->
    <div v-if="state.componentName === 'supplies'">
      <div class="payment">
        <el-row>
          <el-col :span="24">
            <div class="echart-body table-layout">
              <el-carousel :autoplay="false" :height="state.height">
                <el-carousel-item>
                  <div id="suppliesBarEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
                <el-carousel-item>
                  <el-table
                    border
                    :max-height="state.height"
                    :data="suppliesData.tableData"
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column
                      v-for="(item, index) in state.suppliesGinsengTable"
                      :prop="item.value"
                      :class-name="item.value"
                      :label="item.label"
                      :formatter="moneyFormatter"
                      :key="index"
                      align="right"
                      header-align="center"
                      min-width="120"
                    />
                  </el-table>
                </el-carousel-item>
                <el-carousel-item>
                  <div id="suppliesLineEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- invoice开票项目组件 -->
    <div v-if="state.componentName === 'invoice'">
      <div class="payment">
        <el-row>
          <el-col :span="24">
            <div class="echart-body table-layout">
              <el-carousel :autoplay="false" :height="state.height">
                <el-carousel-item>
                  <div id="invoiceBarEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
                <el-carousel-item>
                  <el-table
                    border
                    :max-height="state.height"
                    :data="invoiceData.tableData"
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column
                      v-for="(item, index) in state.invoiceGinsengTable"
                      :prop="item.value"
                      :label="item.label"
                      :class-name="item.value"
                      :formatter="moneyFormatter"
                      :key="index"
                      align="right"
                      header-align="center"
                      min-width="120"
                    />
                  </el-table>
                </el-carousel-item>
                <el-carousel-item>
                  <div id="invoiceLineEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 结 -->
  </div>
</template>

<script>
import {
  tenantId,
  pageHeight,
  paymentGinseng,
  suppliesGinseng,
  paymentGinsengEcharts,
  suppliesGinsengEcharts
} from '../../../utils/publus';
import analyze from '../../../api/revenue/analyze';
import baseApi from '../../../api/base';
import axios from '../../../axios/index';
import * as echart from 'echarts';
import { reactive, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import moment from 'moment';
export default {
  async setup() {
    // 4.1租户部门科室
    let baseParams = {
      tenantId,
      fplb: '0'
    };
    let departmentGinseng = [],
      departmentFormatter = {};
    await axios.post(baseApi.tenantDepartment, baseParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        departmentGinseng = res.data.map((item) => {
          departmentFormatter[item.ksdm] = item.ksmc;
          return {
            label: item.ksmc,
            value: item.ksdm
          };
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    // 4.2租户开票项目
    let invoiceGinseng = [],
      invoiceFormatter = {};
    await axios.post(baseApi.tenantInvoiceProject, baseParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        invoiceGinseng = res.data.map((item) => {
          invoiceFormatter[item.xmdm] = item.xmmc;
          return {
            label: item.xmmc,
            value: item.xmdm
          };
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });
    // 4.3租户结算险种
    let plantGinseng = [],
      plantFormatter = {};
    await axios.post(baseApi.tenantPlantCode, baseParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        plantGinseng = res.data.map((item) => {
          plantFormatter[item.xzdm] = item.xzmc;
          return {
            label: item.xzmc,
            value: item.xzdm
          };
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

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
      month: moment(new Date()).format('YYYYMM'),
      year: moment(new Date()).format('YYYY'),
      // 走马灯参数
      height: '400px',
      // 表格数据
      tableData: [],
      checkAll: false,
      checkOne: (val, val1) => val.indexOf(val1) > -1,
      plantGinsengTable: [],
      paymentGinsengTable: [],
      departmentGinsengTable: [],
      suppliesGinsengTable: [],
      invoiceGinsengTable: [],
      paymentGinsengData: paymentGinseng,
      suppliesGinsengData: suppliesGinseng
    });

    const menu = reactive({
      menus: [
        {
          tabName: 'coverage',
          threeMenus: '险种方式',
          fourMenus: plantGinseng
        },
        {
          tabName: 'payment',
          threeMenus: '支付渠道方式',
          fourMenus: paymentGinseng
        },
        { tabName: 'department', threeMenus: '所有科室', fourMenus: departmentGinseng },
        { tabName: 'supplies', threeMenus: '物资类别', fourMenus: suppliesGinseng },
        { tabName: 'invoice', threeMenus: '开票项目', fourMenus: invoiceGinseng }
      ],
      fourMenus: plantGinseng,
      threeShow: 0,
      fourShow: []
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
      menu.fourShow = [];
      state.componentName = tabName;
      state.fastDateType = 'thisMonth';
      state.month = moment(new Date()).format('YYYY-MM');
      state.year = moment(new Date()).format('YYYY');
      params.startDate = moment(state.month).startOf('month').format('YYYYMMDD');
      params.endDate = moment(state.month).endOf('month').format('YYYYMMDD');
      params.prarm2 = [];
      params.dateType = 'thisMonth';
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
      state.checkAll = menu.fourShow.length === menu.fourMenus.length;
      params.prarm2 = menu.fourShow;
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
    };

    /**
     * 加载生成柱状图
     * id: dom的id
     * echarts: 引入echarts插件
     * datas: 需要加载的数据
     */
    let echartsStatistical = (id, echart, datas, series) => {
      /**
       * 报表功能
       */
      echart.dispose(window.document.getElementById(id));
      var echartsCategory = echart.init(window.document.getElementById(id), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        // 防止左侧数据
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true,
          show: 'true',
          borderWidth: '0'
        },
        legend: {
          data: series.map((item) => item.name),
          selectedMode: false,
          orient: 'horizontal',
          left: '0'
        },
        xAxis: {
          data: datas.map((item) => {
            return item.happenTime;
          })
        },
        yAxis: {
          // type: 'category',
        },
        series
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsCategory.setOption(option);
    };

    // 折线图
    let echartsLineEcharts = (id, echarts, datas, series) => {
      /**
       * 报表功能
       */
      echarts.dispose(window.document.getElementById(id));
      var echartsRecords = echarts.init(window.document.getElementById(id), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          formatter: (params) => {
            return `${params.name}${params.seriesName}金额为${params.value}`;
          }
        },
        legend: {
          data: series.map((item) => item.name),
          selectedMode: false,
          orient: 'horizontal',
          left: '0'
        },
        xAxis: {
          name: '日期',
          data: datas.map((item) => item.happenTime),
          nameTextStyle: {
            color: 'black'
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: 'black'
          }
        },
        series
      }; // 使用刚指定的配置项和数据显示图表。
      echartsRecords.setOption(option);
    };

    // 金额格式化
    let moneyFormatter = (row, column) => {
      if (!row[column.className]) {
        return '0.00';
      }
      return parseFloat(row[column.className]).toFixed(2);
    };

    // 条件入参
    const params = reactive({
      tenantId,
      startDate: moment(state.month).startOf('month').format('YYYYMMDD'),
      endDate: moment(state.month).endOf('month').format('YYYYMMDD'),
      prarm2: [],
      dateType: 'thisMonth'
    });

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

    /**************************coverage组件 start************************************/
    const coverageData = reactive({
      datas: [],
      tableData: []
    });
    /**************************coverage组件 end************************************/

    /**************************payment组件 start************************************/
    const paymentData = reactive({
      datas: [],
      tableData: []
    });

    /**************************payment组件 end************************************/

    /**************************department组件 start************************************/

    const departmentData = reactive({
      datas: [],
      tableData: []
    });

    /**************************department组件 end************************************/

    /**************************supplies组件 start************************************/
    const suppliesData = reactive({
      datas: [],
      tableData: []
    });

    /**************************supplies组件 end************************************/

    /**************************invoice组件 start************************************/
    const invoiceData = reactive({
      datas: [],
      tableData: []
    });

    /**************************invoice组件 end************************************/

    watchEffect(async () => {
      if (state.componentName === 'coverage') {
        // 3.1营收险种分析
        await axios.post(analyze.coverageAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            coverageData.datas = res.data;
            // 获取表格列的数量
            let long = 0;
            let value = [];
            res.data.map((item) => {
              if (item.revenueAnalyzeList.length >= long) {
                long = item.revenueAnalyzeList.length;
                value = item.revenueAnalyzeList;
              }
            });
            state.plantGinsengTable = value.map((item) => {
              return {
                label: plantFormatter[item.aggregationElement],
                value: item.aggregationElement
              };
            });
            coverageData.tableData = res.data.map((item) => {
              let tableJson = {};
              if (item.happenTime.length === 6) {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM');
              } else {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM-DD');
              }
              item.revenueAnalyzeList.map((itemChild) => {
                tableJson[itemChild.aggregationElement] = itemChild.amount;
              });
              return tableJson;
            });
            // 加载柱状图
            let series = state.plantGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'bar',
                stack: 'total',
                data: coverageData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('plantBarEcharts', echart, coverageData.tableData, series);
            // 加载折线图
            let seriesLine = state.plantGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'line',
                stack: 'total',
                data: coverageData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsLineEcharts('plantLineEcharts', echart, coverageData.tableData, seriesLine);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      } else if (state.componentName === 'payment') {
        // 3.2营收支付方式分析
        await axios.post(analyze.paymentAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            paymentData.datas = res.data;
            // 获取表格列的数量
            let long = 0;
            let value = [];
            res.data.map((item) => {
              if (item.revenueAnalyzeList.length >= long) {
                long = item.revenueAnalyzeList.length;
                value = item.revenueAnalyzeList;
              }
            });
            state.paymentGinsengTable = value.map((item) => {
              return {
                label: paymentGinsengEcharts[item.aggregationElement],
                value: item.aggregationElement
              };
            });
            paymentData.tableData = res.data.map((item) => {
              let tableJson = {};
              if (item.happenTime.length === 6) {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM');
              } else {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM-DD');
              }
              item.revenueAnalyzeList.map((itemChild) => {
                tableJson[itemChild.aggregationElement] = itemChild.amount;
              });
              return tableJson;
            });
            // 加载柱状图
            let series = state.paymentGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'bar',
                stack: 'total',
                data: paymentData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsLineEcharts('paymentBarEcharts', echart, paymentData.tableData, series);
            // 加载折线图
            let seriesLine = state.paymentGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'line',
                stack: 'total',
                data: paymentData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('paymentLineEcharts', echart, paymentData.tableData, seriesLine);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      } else if (state.componentName === 'department') {
        // 3.3营收主管科室分析
        await axios.post(analyze.directorAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            departmentData.datas = res.data;
            // 获取表格列的数量
            let long = 0;
            let value = [];
            res.data.map((item) => {
              if (item.revenueAnalyzeList.length >= long) {
                long = item.revenueAnalyzeList.length;
                value = item.revenueAnalyzeList;
              }
            });
            state.departmentGinsengTable = value.map((item) => {
              return {
                label: departmentFormatter[item.aggregationElement],
                value: item.aggregationElement
              };
            });
            departmentData.tableData = res.data.map((item) => {
              let tableJson = {};
              if (item.happenTime.length === 6) {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM');
              } else {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM-DD');
              }
              item.revenueAnalyzeList.map((itemChild) => {
                tableJson[itemChild.aggregationElement] = itemChild.amount;
              });
              return tableJson;
            });
            // 加载柱状图
            let series = state.departmentGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'bar',
                stack: 'total',
                data: departmentData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('departmentBarEcharts', echart, departmentData.tableData, series);
            // 加载折线图
            let seriesLine = state.departmentGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'line',
                stack: 'total',
                data: departmentData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('departmentLineEcharts', echart, departmentData.tableData, seriesLine);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      } else if (state.componentName === 'supplies') {
        // 3.4营收物资类别分析
        await axios.post(analyze.suppliesAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            suppliesData.datas = res.data;
            // 获取表格列的数量
            let long = 0;
            let value = [];
            res.data.map((item) => {
              if (item.revenueAnalyzeList.length >= long) {
                long = item.revenueAnalyzeList.length;
                value = item.revenueAnalyzeList;
              }
            });
            state.suppliesGinsengTable = value.map((item) => {
              return {
                label: suppliesGinsengEcharts[item.aggregationElement],
                value: item.aggregationElement
              };
            });
            suppliesData.tableData = res.data.map((item) => {
              let tableJson = {};
              if (item.happenTime.length === 6) {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM');
              } else {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM-DD');
              }
              item.revenueAnalyzeList.map((itemChild) => {
                tableJson[itemChild.aggregationElement] = itemChild.amount;
              });
              return tableJson;
            });
            let series = state.suppliesGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'bar',
                stack: 'total',
                data: suppliesData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('suppliesBarEcharts', echart, suppliesData.tableData, series);

            // 加载折线图
            let seriesLine = state.suppliesGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'line',
                stack: 'total',
                data: suppliesData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('suppliesLineEcharts', echart, suppliesData.tableData, seriesLine);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      } else if (state.componentName === 'invoice') {
        // 3.5营收开票项目分析
        await axios.post(analyze.makeOutAnInvoiceAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            invoiceData.datas = res.data;
            // 获取表格列的数量
            let long = 0;
            let value = [];
            res.data.map((item) => {
              if (item.revenueAnalyzeList.length >= long) {
                long = item.revenueAnalyzeList.length;
                value = item.revenueAnalyzeList;
              }
            });
            state.invoiceGinsengTable = value.map((item) => {
              return {
                label: invoiceFormatter[item.aggregationElement],
                value: item.aggregationElement
              };
            });
            invoiceData.tableData = res.data.map((item) => {
              let tableJson = {};
              if (item.happenTime.length === 6) {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM');
              } else {
                tableJson.happenTime = moment(item.happenTime).format('YYYY-MM-DD');
              }
              item.revenueAnalyzeList.map((itemChild) => {
                tableJson[itemChild.aggregationElement] = itemChild.amount;
              });
              return tableJson;
            });
            // 加载柱状图
            let series = state.invoiceGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'bar',
                stack: 'total',
                data: invoiceData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('invoiceBarEcharts', echart, invoiceData.tableData, series);
            // 加载折线图
            let seriesLine = state.invoiceGinsengTable.map((item) => {
              return {
                name: item.label,
                type: 'line',
                stack: 'total',
                data: invoiceData.tableData.map((itemChild) => itemChild[item.value])
              };
            });
            echartsStatistical('invoiceLineEcharts', echart, invoiceData.tableData, seriesLine);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      }
    });

    return {
      state,
      menu,
      pageHeight,
      fastDateHanderClick,
      threeHandleClick,
      fourHandleClick,
      selectAll,
      monthRange,
      moneyFormatter,
      coverageData,
      paymentData,
      departmentData,
      suppliesData,
      invoiceData
    };
  },
  mounted() {
    // 设置内容高度
    let that = this;
    this.pageHeight(that, 228);
    window.onresize = () => {
      that.pageHeight(that, 228);
    };
  }
};
</script>

<style lang="scss">
// 三级菜单样式
.level-three-menu {
  background-color: white;
  border-radius: 5px;
  & div {
    user-select: none;
    -webkit-user-select: none; /*webkit浏览器*/
  }
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
  height: 40px;
  line-height: 40px;
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

.table-layout {
  padding: 10px;
}

.revenue {
  overflow: hidden;
}
</style>

