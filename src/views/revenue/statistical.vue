// 营收统计功能
<template>
  <div class="second-layout">
    <el-row>
      <el-col :md="15" :sm="24" class="sm-bottom">
        <el-row :gutter="20">
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="params.plantCode" placeholder="险种选择">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="params.competentDepartment" placeholder="科室选择">
              <el-option v-for="item in state.options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="9" :sm="22">
        <el-row>
          <el-col :lg="8" :md="11" :sm="8">
            <ul class="date-ul">
              <li :class="{ 'is-select-li': state.fastDateType === 'day' }" @click="fastDateHanderClick('day')">今日</li>
              <li :class="{ 'is-select-li': state.fastDateType === 'month' }" @click="fastDateHanderClick('month')">本月</li>
              <li :class="{ 'is-select-li': state.fastDateType === 'year' }" @click="fastDateHanderClick('year')">本年</li>
            </ul>
          </el-col>
          <el-col :lg="16" :md="13" :sm="14">
            <el-date-picker
              v-model="state.date"
              type="daterange"
              @change="customTimeRange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYYMMDD"
            />
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
      </el-col>-->
    </el-row>

    <!-- echasts图表显示 -->
    <el-row :gutter="20">
      <el-col :lg="8" :md="24" :sm="24" class="sm-bottom">
        <div class="echart-header">
          <el-row>
            <el-col :md="4" :sm="2">
              <el-avatar class="header-avatar-wzlb">
                <i class="iconfont icon-kucun1 icon-size" />
              </el-avatar>
            </el-col>
            <el-col :md="6" :sm="4">
              <div>物资类别</div>
            </el-col>
            <el-col :md="14" :sm="18">
              <div class="header-blue header-position">
                {{
                  parseFloat(dataReslut.suppliesCategoryData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0)).toFixed(2)
                }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :height="state.height">
            <el-carousel-item>
              <div id="suppliesBarEcharts" style="width: 100%" :style="{ height: state.height }" />
            </el-carousel-item>
            <el-carousel-item>
              <el-table :data="dataReslut.suppliesCategoryData" border empty-text="无数据" stripe style="width: 100%">
                <el-table-column
                  prop="aggregationElement"
                  label="物资类别"
                  min-width="120"
                  align="center"
                  :formatter="materialCategoryTableConversion"
                />
                <el-table-column prop="amount" label="总金额" min-width="120" align="center" />
              </el-table>
            </el-carousel-item>
            <el-carousel-item>
              <div id="suppliesPieEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :lg="8" :md="24" :sm="24" class="sm-bottom">
        <div class="echart-header">
          <el-row>
            <el-col :md="4" :sm="4">
              <el-avatar class="header-avatar-kpxm">
                <i class="iconfont icon-icon-test-copy icon-size" />
              </el-avatar>
            </el-col>
            <el-col :md="6" :sm="6">
              <div>开票项目</div>
            </el-col>
            <el-col :md="14" :sm="14">
              <div class="header-green header-position">
                {{
                  parseFloat(dataReslut.makeOutAnInvoiceData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0)).toFixed(2)
                }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :initial-index="0" :height="state.height">
            <el-carousel-item>
              <div id="makeOutBarEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
            <el-carousel-item>
              <el-table :data="dataReslut.makeOutAnInvoiceData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column
                  prop="aggregationElement"
                  label="开票项目"
                  min-width="120"
                  align="center"
                  :formatter="inoviceTableConversion"
                />
                <el-table-column prop="amount" label="总金额" min-width="120" align="center" />
              </el-table>
            </el-carousel-item>
            <el-carousel-item>
              <div id="makeOutPieEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :lg="8" :md="24" :sm="24" class="sm-bottom">
        <div class="echart-header">
          <el-row>
            <el-col :md="4">
              <el-avatar class="header-avatar-srfx">
                <i class="iconfont icon-shezhigouwujizifei icon-size" />
              </el-avatar>
            </el-col>
            <el-col :md="6">
              <div>收入分项</div>
            </el-col>
            <el-col :md="14">
              <div class="header-yellow header-position">
                {{
                  parseFloat(dataReslut.methodOfPaymentData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0)).toFixed(2)
                }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :initial-index="0" :height="state.height">
            <el-carousel-item>
              <div id="paymentBarEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
            <el-carousel-item>
              <el-table :data="dataReslut.methodOfPaymentData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column prop="aggregationElement" label="收入分项" min-width="120" align="center" :formatter="paymentTableConversion" />
                <el-table-column prop="amount" label="总金额" min-width="120" align="center" />
              </el-table>
            </el-carousel-item>
            <el-carousel-item>
              <div id="paymentPieEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pageHeight, tenantId, paymentGinsengEcharts, suppliesGinsengEcharts } from '../../utils/publus';
import { watchEffect, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from '../../axios/index';
import statisticalApi from '../../api/revenue/statistical';
import baseApi from '../../api/base';
import * as echart from 'echarts';
import moment from 'moment';
import { SuppliesCategory } from '../../enum/index';
export default {
  async setup() {
    let baseParams = {
      tenantId,
      fplb: '0'
    };
    // 4.2租户开票项目
    let invoiceGinsengEcharts = {};
    await axios.post(baseApi.tenantInvoiceProject, baseParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        res.data.map((item) => {
          invoiceGinsengEcharts[item.xmdm] = item.xmmc;
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });
    // 4.3租户结算险种
    let plantGinseng = [];
    await axios.post(baseApi.tenantPlantCode, baseParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        plantGinseng = res.data.map((item) => {
          return {
            label: item.xzmc,
            value: item.xzdm
          };
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    let departmentGinseng = [];
    await axios.post(baseApi.tenantDepartment, baseParams, { loading: false }).then((res) => {
      if (res.code === '1') {
        departmentGinseng = res.data.map((item) => {
          return {
            label: item.ksmc,
            value: item.ksdm
          };
        });
      } else {
        ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
      }
    });

    const state = reactive({
      // 日期参数
      options: [{ label: '选择险种', value: '' }].concat(plantGinseng),
      options1: [{ label: '选择科室', value: '' }].concat(departmentGinseng),
      fastDateType: 'day',
      // 时间参数
      date: '',
      // 走马灯参数
      height: '',
      // 表格数据
      tableData: []
    });

    // 今日日期
    let day = moment(new Date()).format('YYYYMMDD');
    // 参数条件
    const params = reactive({
      tenantId,
      plantCode: '',
      competentDepartment: '',
      startDate: day,
      endDate: day
    });

    // 请求返回数据结果
    const dataReslut = reactive({
      suppliesCategoryData: [],
      makeOutAnInvoiceData: [],
      methodOfPaymentData: []
    });

    // 点击快速选择时间范围
    let fastDateHanderClick = (val) => {
      state.fastDateType = val;
      if (val === 'day') {
        params.startDate = day;
        params.endDate = day;
      } else if (val === 'month') {
        params.startDate = moment(new Date()).startOf('month').format('YYYYMMDD');
        params.endDate = day;
      } else if (val === 'year') {
        params.startDate = moment(new Date()).startOf('year').format('YYYYMMDD');
        params.endDate = day;
      }
      state.date = [params.startDate, params.endDate];
    };

    // 自定义时间范围
    let customTimeRange = (val) => {
      params.startDate = moment(val[0]).format('YYYYMMDD');
      params.endDate = moment(val[1]).format('YYYYMMDD');
      state.fastDateType = 'timeRange';
    };

    // 物资类别转换
    let materialCategoryConversion = (val) => {
      if (SuppliesCategory.Drug == val) {
        return '药品';
      } else if (SuppliesCategory.Material == val) {
        return '材料';
      } else if (SuppliesCategory.Instrument == val) {
        return '器械';
      } else if (SuppliesCategory.HealthProducts == val) {
        return '保健品';
      } else if (SuppliesCategory.TheDrug == val) {
        return '非药品';
      } else if (SuppliesCategory.Treatment == val) {
        return '诊疗';
      }
      return val;
    };

    // 物资类别格式化
    let materialCategoryTableConversion = (row, column, cellValue) => {
      return materialCategoryConversion(cellValue);
    };
    // 物资类别表格格式化
    let inoviceTableConversion = (row, column, cellValue) => invoiceGinsengEcharts[cellValue];
    // 收入分项表格格式化
    let paymentTableConversion = (row, column, cellValue) => paymentGinsengEcharts[cellValue];

    /**
     * 加载生成柱状图
     * id: dom的id
     * echarts: 引入echarts插件
     * datas: 需要加载的数据
     */
    let echartsStatistical = (id, echart, datas, ginsengEcharts) => {
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
            return ginsengEcharts[item.aggregationElement];
          })
        },
        yAxis: {
          // type: 'category',
        },
        series: [
          {
            name: '金额',
            type: 'bar',
            data: datas.map((item) => item.amount)
          }
        ]
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
    let revenueEcharts = (id, echarts, datas, ginsengEcharts) => {
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
            labelLine: {
              show: false
            },
            data: datas.map((item) => {
              return {
                name: ginsengEcharts[item.aggregationElement],
                value: item.amount
              };
            })
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsRecords.setOption(option);
    };

    // 监听参数变化,改变后请求查询后台
    watchEffect(async () => {
      // 请求物资类别
      await axios.post(statisticalApi.suppliesCategory, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.suppliesCategoryData = res.data;
          echartsStatistical('suppliesBarEcharts', echart, dataReslut.suppliesCategoryData, suppliesGinsengEcharts);
          revenueEcharts('suppliesPieEcharts', echart, dataReslut.suppliesCategoryData, suppliesGinsengEcharts);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 请求开票项目
      await axios.post(statisticalApi.makeOutAnInvoice, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.makeOutAnInvoiceData = res.data;
          echartsStatistical('makeOutBarEcharts', echart, dataReslut.makeOutAnInvoiceData, invoiceGinsengEcharts);
          revenueEcharts('makeOutPieEcharts', echart, dataReslut.makeOutAnInvoiceData, invoiceGinsengEcharts);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 请求收入分项
      await axios.post(statisticalApi.methodOfPayment, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.methodOfPaymentData = res.data;
          echartsStatistical('paymentBarEcharts', echart, dataReslut.methodOfPaymentData, paymentGinsengEcharts);
          revenueEcharts('paymentPieEcharts', echart, dataReslut.methodOfPaymentData, paymentGinsengEcharts);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
    });

    return {
      state,
      params,
      dataReslut,
      pageHeight,
      fastDateHanderClick,
      customTimeRange,
      materialCategoryConversion,
      inoviceTableConversion,
      paymentTableConversion,
      materialCategoryTableConversion,
      echartsStatistical,
      revenueEcharts
    };
  },
  mounted() {
    // 设置内容高度
    let that = this;
    this.pageHeight(that, 198);
    window.onresize = () => {
      that.pageHeight(that, 198);
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../scss/revenue/statistical.scss';
</style>
<style>
.el-tabs__nav-wrap {
  padding: 0 20px;
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .sm-bottom {
    margin-bottom: 10px;
  }
}
</style>