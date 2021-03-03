<template>
  <div class="welcome">
    <!-- 功能入口 -->
    <el-row class="fun-style">
      <el-col :span="24">
        <el-carousel height="70px" arrow="never" :autoplay="false" trigger="click" indicator-position="outside">
          <el-carousel-item>
            <router-link to="/revenue">
              <button class="fun-entrance">
                <el-row>
                  <el-col :span="6">
                    <i class="el-icon-date" />
                  </el-col>
                  <el-col :span="18" class="fun-style-child">营收统计</el-col>
                </el-row>
              </button>
            </router-link>
          </el-carousel-item>
          <!-- <el-carousel-item> 1231313 </el-carousel-item> -->
        </el-carousel>
        <div class="head-portrait">
          <el-row>
            <el-col :sm="10" :xs="0"> logo </el-col>
            <el-col :sm="14" :xs="24" style="text-align: left; padding-top: 15px">
              <el-avatar icon="el-icon-user-solid" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!-- 营收金额和提醒 -->
    <el-row :gutter="10">
      <el-col :sm="12" :xs="24">
        <el-card class="box-card revenue-money">
          <template #header>
            <div>
              <span class="header-title">营收金额</span>
              <div class="time-range">
                <el-button-group>
                  <el-button
                    round
                    size="small"
                    :class="{ 'time-range-active': timeRangeType === 'day' }"
                    @click="timeHandleClick('day')"
                    >今日</el-button
                  >
                  <el-button
                    size="small"
                    :class="{ 'time-range-active': timeRangeType === 'month' }"
                    @click="timeHandleClick('month')"
                    >本月</el-button
                  >
                  <el-button
                    round
                    size="small"
                    :class="{ 'time-range-active': timeRangeType === 'year' }"
                    @click="timeHandleClick('year')"
                    >本年</el-button
                  >
                </el-button-group>
              </div>
            </div>
          </template>
          <div>
            <el-row>
              <el-col :span="8">
                <div class="text">
                  <h2>{{ parseFloat(amountSummaryData.bxje).toFixed(2) }}</h2>
                  <p>医保金额(元)</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>{{ parseFloat(amountSummaryData.xjje).toFixed(2) }}</h2>
                  <p>自费金额(元)</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>{{ parseFloat(amountSummaryData.fsje).toFixed(2) }}</h2>
                  <p>总金额(元)</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-card class="box-card comprehensive-data">
          <template #header>
            <div>
              <span class="header-title">综合数据</span>
            </div>
          </template>
          <div>
            <el-row>
              <el-col :span="8">
                <div class="text">
                  <h2>{{ comprehensiveData.seeSerialCount }}</h2>
                  <p>就诊人次</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>{{ comprehensiveTwoData.prescriptionCount }}</h2>
                  <p>处方数</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>{{ comprehensiveData.settlementCount }}</h2>
                  <p>结算次数</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <!-- <template #header>
            <div>
              <span class="header-title-native">最近五笔营收记录</span>
            </div>
          </template> -->
          <el-table :data="latelyRevenueData" empty-text="无数据" style="width: 100%">
            <el-table-column label="结算编号" prop="jsbh" min-width="100" align="center" />
            <el-table-column label="就诊人员" prop="jkry" min-width="100" align="center" />
            <el-table-column label="险种代码" prop="xzdm" min-width="100" align="center" />
            <el-table-column label="现金金额" prop="xjje" min-width="100" align="center" :formatter="moneyFormatter" />
            <el-table-column label="医保金额" prop="bxje" min-width="100" align="center" :formatter="moneyFormatter" />
            <el-table-column label="总金额" prop="fsje" min-width="100" align="center" :formatter="moneyFormatter" />
            <el-table-column label="结算状态" prop="fyfslx" min-width="100" align="center" :formatter="jsztFormatter" />
            <el-table-column label="发生时间" prop="fssj" min-width="100" align="center" :formatter="dateTimeFormatter" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :md="16" :sm="24">
        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <template #header>
                <div>
                  <span class="header-title-native">近七天营收变化</span>
                </div>
              </template>
              <div id="echarts-doctor" style="height: 300px" />
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="16" :xs="24">
            <el-card class="box-card">
              <template #header>
                <div>
                  <span class="header-title-native">近七天人次变化</span>
                </div>
              </template>
              <div id="echarts-revenue" style="height: 300px" />
            </el-card>
          </el-col>
          <el-col :sm="8" :xs="24">
            <el-card class="box-card">
              <template #header>
                <div>
                  <span class="header-title-native">当天开票项目营收情况</span>
                </div>
              </template>
              <div id="revenueEcharts" style="height: 300px" />
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="8" :sm="24">
        <el-card class="box-card">
          <template #header>
            <div>
              <span class="header-title-native">近效期提醒</span>
            </div>
          </template>
          <div>
            <div class="pending">
              <el-row v-for="o in 1" :key="o">
                <el-col :span="4">
                  <i class="iconfont icon-biaoqian--copy-copy" style="color: #f8c239" />
                </el-col>
                <el-col :span="16">
                  <h5>待处理事项</h5>
                  <p :class="o === 1 ? 'bule' : ''">快过期药品品种数量</p>
                </el-col>
                <el-col :span="4">
                  <div class="date-buttom">{{ shortTermReminderData.nearlyEffectiveCount }}</div>
                </el-col>
              </el-row>
            </div>
            <!-- <el-button type="primary" style="width: 100%">更多</el-button> -->
            <div style="height: 40px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import * as echarts from 'echarts';
import axios from '../axios/index';
import welcomeApi from '../api/welcome';
import moment from 'moment';
import { tenantId } from '../utils/publus';
export default {
  async setup() {
    const loading = ElLoading.service({
      lock: true,
      text: 'loading...'
    });
    const state = reactive({
      loading,
      tableData: [],
      // 快速时间
      timeRangeType: 'day',
      timeRangeParas: {},
      amountSummaryData: {},
      comprehensiveData: { seeSerialCount: '0', settlementCount: '0' },
      comprehensiveTwoData: { prescriptionCount: '0' },
      latelyRevenueData: [],
      latelyRevenueChangeX: [],
      latelyRevenueChangeY: [],
      latelyMChangeX: [],
      latelyMChangeY: [],
      latelyMChangeData: [],
      shortTermReminderData: {}
    });

    // 点击快速时间范围
    let timeHandleClick = async (val) => {
      state.timeRangeType = val;
      if (val === 'day') {
        let day = moment(new Date()).format('YYYYMMDD');
        state.timeRangeParas = { tenantId: tenantId, startDate: day, endDate: day };
      } else if (val === 'month') {
        let monthFirstDay = moment(new Date()).format('YYYYMM') + '01';
        let monthLastDay = moment(new Date()).endOf('month').format('YYYYMMDD');
        state.timeRangeParas = { tenantId: tenantId, startDate: monthFirstDay, endDate: monthLastDay };
      } else if (val === 'year') {
        let yearFirstDay = moment().startOf('year').format('YYYYMMDD');
        let yearLastDay = moment().endOf('year').format('YYYYMMDD');
        state.timeRangeParas = { tenantId: tenantId, startDate: yearFirstDay, endDate: yearLastDay };
      } else {
        console.log(`没有获取对应的时间范围 ${val}`);
        return;
      }
      // 1.1首页收入金额汇总
      axios.post(welcomeApi.amountSummary, state.timeRangeParas, { loading: false }).then((res) => {
        if (res.code === '1') {
          state.amountSummaryData = res.data;
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 1.2.1人次,结算次数汇总数据
      axios.post(welcomeApi.comprehensive, state.timeRangeParas, { loading: false }).then((res) => {
        if (res.code === '1') {
          state.comprehensiveData = res.data;
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 1.2.2处方数汇总数据
      axios.post(welcomeApi.comprehensiveSummary, state.timeRangeParas, { loading: false }).then((res) => {
        if (res.code === '1') {
          state.comprehensiveTwoData = res.data;
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
    };

    // 1.3首页最近五笔营收记录
    let day = moment(new Date()).format('YYYYMMDD');
    let latelyRevenueParams = {
      tenantId: tenantId,
      // startDate: day,
      startDate: '20210223',
      // endDate: day,
      endDate: '20210223',
      pageNum: 0,
      pageSize: 5
    };
    axios.post(welcomeApi.latelyRevenue, latelyRevenueParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        state.latelyRevenueData = res.data;
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    // 1.4首页近七天营收变化
    let latelyDate = moment(new Date()).subtract(6, 'days').format('YYYYMMDD');
    let latelyRevenueChangeParams = {
      tenantId: tenantId,
      startDate: latelyDate,
      // startDate: '20210217',
      endDate: day
      // endDate: '20210223'
    };
    await axios.post(welcomeApi.latelyRevenueChange, latelyRevenueChangeParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        state.latelyRevenueChangeX = res.data.map((item) => {
          return item.fyrq;
        });
        state.latelyRevenueChangeY = res.data.map((item) => {
          return item.incomeAmount;
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    // 1.5首页近七天人次变化
    let latelyMChangeParams = {
      tenantId: tenantId,
      startDate: latelyDate,
      endDate: day
    };
    await axios.post(welcomeApi.latelyMChange, latelyMChangeParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        state.latelyMChangeX = res.data.map((item) => item.fyrq);
        state.latelyMChangeY = res.data.map((item) => item.personTimesNum);
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    // 1.6首页当天开票项目营收情况
    let dayMakeRevenueParams = {
      tenantId: tenantId,
      startDate: '20210223',
      endDate: '20210223'
    };
    await axios.post(welcomeApi.dayMakeRevenue, dayMakeRevenueParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        state.latelyMChangeData = res.data;
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    // 1.7首页近效期提醒 //未来30天
    let shortTermReminderParams = {
      tenantId: tenantId,
      startDate: '20210201',
      endDate: '20210223'
    };
    await axios.post(welcomeApi.shortTermReminder, shortTermReminderParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        state.shortTermReminderData = res.data;
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    // 发生日期格式化
    let dateTimeFormatter = (row, column, cellValue) => {
      if (!cellValue) {
        return cellValue;
      }
      // return moment(cellValue).utc().tz("America/New_York").format();
      return moment.utc(cellValue).format('YYYY-MM-DD HH:mm:ss');
    };
    // 费用结算类型
    let jsztFormatter = (row, column, cellValue) => {
      if (cellValue === '1') {
        return '已结算';
      } else if (cellValue === '8') {
        return '已退费';
      }
      return cellValue;
    };
    // 金额格式化
    let moneyFormatter = (row, column, cellValue) => {
      if (!cellValue) {
        return cellValue;
      }
      return parseFloat(cellValue).toFixed(2);
    };

    timeHandleClick(state.timeRangeType);

    return {
      ...toRefs(state),
      timeHandleClick,
      dateTimeFormatter,
      jsztFormatter,
      moneyFormatter
    };
  },
  mounted() {
    this.echartsDoctor(echarts);
    this.echartsRecords(echarts);
    this.revenueEcharts(echarts);
    this.loading.close();
  },
  methods: {
    echartsDoctor(echarts) {
      /**
       * 报表功能
       */
      var echartsDoctor = echarts.init(window.document.getElementById('echarts-doctor'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        xAxis: {
          data: this.latelyRevenueChangeX
        },
        yAxis: {
          // type: 'category',
        },
        series: [
          {
            name: '当日营收',
            type: 'bar',
            data: this.latelyRevenueChangeY
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsDoctor.setOption(option);
    },
    echartsRecords(echarts) {
      /**
       * 报表功能
       */
      var echartsRecords = echarts.init(window.document.getElementById('echarts-revenue'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
          // left: 'center'
        },
        tooltip: {
          formatter: (params) => {
            return `${params.name}的就诊人次为${params.value}次`;
          }
        },
        xAxis: {
          name: '日期',
          data: this.latelyMChangeX,
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
        series: [
          {
            name: '金额',
            type: 'line',
            data: this.latelyMChangeY
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsRecords.setOption(option);
    },
    revenueEcharts(echarts) {
      var echartsRecords = echarts.init(window.document.getElementById('revenueEcharts'), 'light');
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
          formatter: '{a} <br/>{b}: {c} ({d}%)'
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
            data: this.latelyMChangeData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsRecords.setOption(option);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../scss/welcome.scss';
</style>
<style>
.fun-style .el-carousel__indicators {
  width: 117.647%;
}
.el-carousel__indicator .el-carousel__button {
  background-color: #7f8081;
}
</style>