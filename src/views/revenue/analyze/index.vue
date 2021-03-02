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
              <el-date-picker v-model="state.month" type="month" placeholder="选择月" @change="monthRange" />
            </div>
            <div v-show="state.fastDateType === 'thisYear'">
              <el-date-picker v-model="state.year" type="year" placeholder="选择年" @change="monthRange" />
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
        :class="{ 'is-active-four': menu.fourShow.indexOf(item.value) > -1 }"
        class="fout-style"
        @click="fourHandleClick(item.value)"
      >
        {{ item.label }}
      </el-col>
    </el-row>
    <!-- <component :is="state.componentName" :datas="reslutData.coverageAnalysisData"/> -->
    <!-- coverage组件 -->
    <div v-show="state.componentName === 'coverage' || state.allLoading">
      <div class="block">
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
                    :max-height="state.tableHeight"
                    :data="
                      coverageData.tableData.slice(
                        (coverageData.currpage - 1) * coverageData.pagesize,
                        coverageData.currpage * coverageData.pagesize
                      )
                    "
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column prop="ybAmount" label="医保金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="zfAmount" label="自费金额" align="right" header-align="center" min-width="120" />
                  </el-table>
                  <el-pagination
                    :current-page="coverageData.currpage"
                    :page-sizes="[10, 20, 50, 100, 200]"
                    :page-size="coverageData.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="coverageData.tableData.length"
                    :hide-on-single-page="coverageData.tableData.length === 0"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </el-carousel-item>
                <el-carousel-item>
                  <div id="plantPieEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- payment组件 -->
    <div v-show="state.componentName === 'payment' || state.allLoading">
      <div class="block">
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
                    :max-height="state.tableHeight"
                    :data="
                      paymentData.tableData.slice(
                        (paymentData.currpage - 1) * paymentData.pagesize,
                        paymentData.currpage * paymentData.pagesize
                      )
                    "
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column prop="xjAmount" label="现金金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="zfbAmonut" label="支付宝金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="wxAmonut" label="微信金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="ylAmonut" label="银联金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="qtAmonut" label="其他金额" align="right" header-align="center" min-width="120" />
                  </el-table>
                  <el-pagination
                    :current-page="paymentData.currpage"
                    :page-sizes="[10, 20, 50, 100, 200]"
                    :page-size="paymentData.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paymentData.tableData.length"
                    :hide-on-single-page="paymentData.tableData.length === 0"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                  />
                </el-carousel-item>
                <el-carousel-item>
                  <div id="paymentPieEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- department组件 -->
    <div v-show="state.componentName === 'department' || state.allLoading">
      <div class="block">
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
                    :max-height="state.tableHeight"
                    :data="
                      paymentData.tableData.slice(
                        (paymentData.currpage - 1) * paymentData.pagesize,
                        paymentData.currpage * paymentData.pagesize
                      )
                    "
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column prop="xjAmount" label="现金金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="zfbAmonut" label="支付宝金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="wxAmonut" label="微信金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="ylAmonut" label="银联金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="qtAmonut" label="其他金额" align="right" header-align="center" min-width="120" />
                  </el-table>
                  <el-pagination
                    :current-page="paymentData.currpage"
                    :page-sizes="[10, 20, 50, 100, 200]"
                    :page-size="paymentData.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paymentData.tableData.length"
                    :hide-on-single-page="paymentData.tableData.length === 0"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                  />
                </el-carousel-item>
                <el-carousel-item>
                  <div id="departmentPieEcharts" :style="{ height: state.height }" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- supplies组件 -->
    <div v-show="state.componentName === 'supplies' || state.allLoading">
      <div class="block">
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
                    :max-height="state.tableHeight"
                    :data="
                      paymentData.tableData.slice(
                        (paymentData.currpage - 1) * paymentData.pagesize,
                        paymentData.currpage * paymentData.pagesize
                      )
                    "
                    empty-text="无数据"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column type="selection" align="center" width="55" />
                    <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                    <el-table-column prop="xjAmount" label="现金金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="zfbAmonut" label="支付宝金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="wxAmonut" label="微信金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="ylAmonut" label="银联金额" align="right" header-align="center" min-width="120" />
                    <el-table-column prop="qtAmonut" label="其他金额" align="right" header-align="center" min-width="120" />
                  </el-table>
                  <el-pagination
                    :current-page="paymentData.currpage"
                    :page-sizes="[10, 20, 50, 100, 200]"
                    :page-size="paymentData.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paymentData.tableData.length"
                    :hide-on-single-page="paymentData.tableData.length === 0"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                  />
                </el-carousel-item>
                <el-carousel-item>
                  <div id="suppliesPieEcharts" :style="{ height: state.height }" />
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
import { tenantId } from '../../../utils/publus';
import { Payment } from '../../../enum/index';
import analyze from '../../../api/revenue/analyze';
import axios from '../../../axios/index';
import * as echart from 'echarts';
import { onMounted, reactive, watch, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import moment from 'moment';
export default {
  setup() {
    const state = reactive({
      componentName: 'coverage',
      allLoading: true,
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
      tableData: []
    });

    const menu = reactive({
      menus: [
        {
          tabName: 'coverage',
          threeMenus: '险种方式',
          fourMenus: [
            { label: '自费', value: '00000000' },
            { label: '医保', value: '33080001' }
          ]
        },
        {
          tabName: 'payment',
          threeMenus: '支付渠道方式',
          fourMenus: [
            { label: '自费', value: '00000000' },
            { label: '医保', value: '33080001' }
          ]
        },
        { tabName: 'department', threeMenus: '所有科室', fourMenus: [] },
        { threeMenus: '物资类别', fourMenus: [] },
        { threeMenus: '开票项目', fourMenus: [] }
      ],
      fourMenus: [
        { label: '自费', value: '00000000' },
        { label: '医保', value: '33080001' }
      ],
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
      params.prarm2 = menu.fourShow;
    };

    // 四级菜单选择所有
    let selectAll = (vals) => {
      if (menu.fourShow.length === vals.length) {
        menu.fourShow = [];
      } else {
        menu.fourShow = JSON.parse(JSON.stringify(vals.map((val) => val.value)));
      }
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
        xAxis: {
          data: datas.map((item) => {
            return item.happenTime;
          })
        },
        yAxis: {
          // type: 'category',
        },
        series: series
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsCategory.setOption(option);
    };

    /**
     * 加载生成饼图
     * id: dom的id
     * echarts: 引入echarts插件
     * datas: 需要加载的数据
     */
    let revenueEcharts = (id, echarts, datas) => {
      var echartsRecords = echarts.init(window.document.getElementById(id), 'light');
      var option = {
        title: {
          text: '',
          subtext: '',
          textStyle: { fontFamily: 'serif' },
          top: 50,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '<br/>{b} 营收金额: {c} ({d}%)'
        },
        series: [
          {
            name: '金额',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'outside'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: datas
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsRecords.setOption(option);
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
      tableData: [],
      currpage: 1,
      pagesize: 10
    });
    // 分页-每页条数
    let handleSizeChange = (val) => {
      coverageData.pagesize = val;
    };
    // 当前分页
    let handleCurrentChange = (val) => {
      coverageData.currpage = val;
    };
    /**************************coverage组件 end************************************/

    /**************************payment组件 start************************************/
    const paymentData = reactive({
      datas: [],
      tableData: [],
      currpage: 1,
      pagesize: 10
    });

    // 分页-每页条数
    let handleSizeChange1 = (val) => {
      paymentData.pagesize = val;
    };
    // 当前分页
    let handleCurrentChange1 = (val) => {
      paymentData.currpage = val;
    };

    /**************************payment组件 end************************************/

    /**************************department组件 start************************************/
    /**************************department组件 end************************************/

    watchEffect(async () => {
      if (state.componentName === 'coverage') {
        // 3.1营收险种分析
        await axios.post(analyze.coverageAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            coverageData.datas = res.data;
            coverageData.tableData = res.data.map((item) => {
              let happenTime = item.happenTime;
              let zfAmount = 0;
              let ybAmount = 0;
              if (item.revenueAnalyzeList[0].aggregationElement === '00000000') {
                zfAmount = item.revenueAnalyzeList[0]['amount'];
              } else {
                ybAmount = item.revenueAnalyzeList[0]['amount'];
              }
              if (item.revenueAnalyzeList.length === 2 && item.revenueAnalyzeList[1].aggregationElement === '00000000') {
                zfAmount = item.revenueAnalyzeList[0]['amount'];
              } else {
                ybAmount = item.revenueAnalyzeList[0]['amount'];
              }
              return {
                happenTime,
                ybAmount,
                zfAmount
              };
            });
            // 加载柱状图
            let series = [
              {
                name: '医保',
                type: 'bar',
                data: coverageData.tableData.map((item) => item.ybAmount)
              },
              {
                name: '自费',
                type: 'bar',
                data: coverageData.tableData.map((item) => item.zfAmount)
              }
            ];
            echartsStatistical('plantBarEcharts', echart, coverageData.tableData, series);
            // 加载饼图
            let datasPie = coverageData.tableData.map((item) => {
              return {
                name: item.happenTime,
                value: item.ybAmount + item.zfAmount
              };
            });
            revenueEcharts('plantPieEcharts', echart, datasPie);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      } else if (state.componentName === 'payment') {
        // 3.2营收支付方式分析
        await axios.post(analyze.paymentAnalysis, params, { loading: false }).then((res) => {
          if (res.code === '1') {
            paymentData.datas = res.data;
            paymentData.tableData = res.data.map((item) => {
              let happenTime = item.happenTime;
              let xjAmount = 0,
                zfbAmonut = 0,
                wxAmonut = 0,
                ylAmonut = 0,
                qtAmonut = 0;
              item.revenueAnalyzeList.forEach((item) => {
                if (item.aggregationElement === Payment.Cash) {
                  xjAmount = item.amount;
                } else if (item.aggregationElement === Payment.Alipay) {
                  zfbAmonut = item.amount;
                } else if (item.aggregationElement === Payment.WeChat) {
                  wxAmonut = item.amount;
                } else if (item.aggregationElement === Payment.Unionpay) {
                  wxAmonut = item.amount;
                } else if (item.aggregationElement === Payment.Other) {
                  qtAmonut = item.amount;
                }
              });
              return {
                happenTime,
                xjAmount,
                zfbAmonut,
                wxAmonut,
                ylAmonut,
                qtAmonut
              };
            });
            console.log(paymentData.tableData);
            // 加载柱状图
            let series = [
              {
                name: '现金',
                type: 'bar',
                data: paymentData.tableData.map((item) => item.xjAmount)
              },
              {
                name: '支付宝',
                type: 'bar',
                data: paymentData.tableData.map((item) => item.zfbAmonut)
              },
              {
                name: '微信',
                type: 'bar',
                data: paymentData.tableData.map((item) => item.wxAmonut)
              },
              {
                name: '银联',
                type: 'bar',
                data: paymentData.tableData.map((item) => item.ylAmonut)
              },
              {
                name: '其他',
                type: 'bar',
                data: paymentData.tableData.map((item) => item.qtAmonut)
              }
            ];
            echartsStatistical('paymentBarEcharts', echart, paymentData.tableData, series);
            // 加载饼图
            let datasPie = paymentData.tableData.map((item) => {
              return {
                name: item.happenTime,
                value: item.xjAmount + item.zfbAmonut + item.wxAmonut + item.ylAmonut + item.qtAmonut
              };
            });
            revenueEcharts('paymentPieEcharts', echart, datasPie);
          } else {
            ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
          }
        });
      }
    });

    onMounted(() => {
      setTimeout(() => {
        state.allLoading = false;
      }, 500);
    });

    return {
      state,
      menu,
      fastDateHanderClick,
      threeHandleClick,
      fourHandleClick,
      selectAll,
      // reslutData,
      monthRange,
      handleSizeChange,
      handleSizeChange1,
      handleCurrentChange,
      handleCurrentChange1,
      coverageData,
      paymentData
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

.table-layout {
  padding: 10px;
}
</style>
