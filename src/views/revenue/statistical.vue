// 营收统计功能
<template>
  <div class="second-layout">
    <el-row>
      <el-col :md="14" :sm="24" class="sm-bottom">
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
                {{ dataReslut.suppliesCategoryData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0) }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :height="state.height">
            <el-carousel-item>
              <div id="suppliesBarEcharts" :style="{ height: state.height }" />
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
                {{ dataReslut.makeOutAnInvoiceData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0) }}
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
                <el-table-column prop="aggregationElement" label="开票项目" min-width="120" align="center" />
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
                {{ dataReslut.methodOfPaymentData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0) }}
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
              <el-table :data="dataReslut.makeOutAnInvoiceData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column prop="aggregationElement" label="收入分项" min-width="120" align="center" />
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
import { pageHeight } from '../../utils/publus';
import { watchEffect, reactive } from 'vue';
import axios from '../../axios/index';
import statisticalApi from '../../api/revenue/statistical';
import * as echart from 'echarts';
import moment from 'moment';
import { SuppliesCategory } from '../../enum/index';
export default {
  setup() {
    const state = reactive({
      // 日期参数
      options: [
        {
          value: '',
          label: '险种选择'
        },
        {
          value: '00000000',
          label: '自费'
        }
      ],
      options1: [
        {
          value: '',
          label: '科室选择'
        },
        {
          value: '001',
          label: '主管科室'
        }
      ],
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
      tenantId: '3308021324',
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
    let materialCategoryTableConversion = (row, column, cellValue) => {
      return materialCategoryConversion(cellValue);
    };

    /**
     * 加载生成柱状图
     * id: dom的id
     * echarts: 引入echarts插件
     * datas: 需要加载的数据
     */
    let echartsStatistical = (id, echart, datas, formatter) => {
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
        xAxis: {
          data: datas.map((item) => {
            if (formatter) {
              return materialCategoryConversion(item.aggregationElement);
            }
            return item.aggregationElement;
          })
        },
        yAxis: {
          // type: 'category',
        },
        series: [
          {
            name: '新手',
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
    let revenueEcharts = (id, echarts, datas, formatter) => {
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
            data: datas.map((item) => {
              if (formatter) {
                return {
                  name: materialCategoryConversion(item.aggregationElement),
                  value: item.amount
                };
              }
              return {
                name: item.aggregationElement,
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
          echartsStatistical('suppliesBarEcharts', echart, dataReslut.suppliesCategoryData, true);
          revenueEcharts('suppliesPieEcharts', echart, dataReslut.suppliesCategoryData);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 请求开票项目
      await axios.post(statisticalApi.makeOutAnInvoice, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.makeOutAnInvoiceData = res.data;
          echartsStatistical('makeOutBarEcharts', echart, dataReslut.makeOutAnInvoiceData);
          revenueEcharts('makeOutPieEcharts', echart, dataReslut.makeOutAnInvoiceData);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 请求开票项目
      await axios.post(statisticalApi.methodOfPayment, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.makeOutAnInvoiceData = res.data;
          echartsStatistical('makeOutBarEcharts', echart, dataReslut.makeOutAnInvoiceData);
          revenueEcharts('makeOutPieEcharts', echart, dataReslut.makeOutAnInvoiceData);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 请求收入分项
      await axios.post(statisticalApi.methodOfPayment, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.methodOfPaymentData = res.data;
          echartsStatistical('paymentBarEcharts', echart, dataReslut.methodOfPaymentData);
          revenueEcharts('paymentPieEcharts', echart, dataReslut.methodOfPaymentData);
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