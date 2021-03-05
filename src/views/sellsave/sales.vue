// 营收统计功能
<template>
  <div class="second-layout">
    <el-row>
      <el-col :md="15" :sm="24" class="sm-bottom">
        <el-row :gutter="20">
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="params.supplierName" placeholder="选择供应商">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="9" :sm="22">
        <el-row>
          <el-col :lg="8" :md="11" :sm="8">
            <ul class="date-ul">
              <li
                :class="{ 'is-select-li': state.fastDateType === 'day' }"
                @click="fastDateHanderClick('day', state, params, moment)"
              >
                今日
              </li>
              <li
                :class="{ 'is-select-li': state.fastDateType === 'month' }"
                @click="fastDateHanderClick('month', state, params, moment)"
              >
                本月
              </li>
              <li
                :class="{ 'is-select-li': state.fastDateType === 'year' }"
                @click="fastDateHanderClick('year', state, params, moment)"
              >
                本年
              </li>
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
                  :formatter="supplierFormatter"
                />
                <el-table-column prop="amount" label="总金额" min-width="120" align="center" :formatter="moenyFormatter" />
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
                  :formatter="invoiceFormatter"
                />
                <el-table-column prop="amount" label="总金额" min-width="120" align="center" :formatter="moenyFormatter"/>
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
            <el-col :md="4" :sm="4">
              <el-avatar class="header-avatar-srfx">
                <i class="iconfont icon-shezhigouwujizifei icon-size" />
              </el-avatar>
            </el-col>
            <el-col :md="6" :sm="6">
              <div>麻黄碱类</div>
            </el-col>
            <el-col :md="14" :sm="14">
              <div class="header-yellow header-position">
                {{ parseFloat(dataReslut.ephedrineData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0)).toFixed(2) }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :initial-index="0" :height="state.height">
            <el-carousel-item>
              <div id="ephedrineBarEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
            <el-carousel-item>
              <el-table :data="dataReslut.ephedrineData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column
                  prop="aggregationElement"
                  label="麻黄碱类"
                  min-width="120"
                  align="center"
                  :formatter="ephedrineFormatter"
                />
                <el-table-column prop="amount" label="总金额" min-width="120" align="center" :formatter="moenyFormatter"/>
              </el-table>
            </el-carousel-item>
            <el-carousel-item>
              <div id="ephedrinePieEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  pageHeight,
  tenantId,
  paymentGinsengEcharts,
  suppliesGinsengEcharts,
  revenueEchartsStatistical,
  revenueEcharts,
  invoiceAixosData,
  ephedrineGinsengEcharts
} from '../../utils/publus';
import { watchEffect, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from '../../axios/index';
import salesApi from '../../api/sellsave/sales';
import baseApi from '../../api/base';
import * as echart from 'echarts';
import moment from 'moment';
export default {
  async setup() {
    const state = reactive({
      // 日期参数
      options: [{ label: '选择供应商', value: '' }],
      fastDateType: 'day',
      // 时间参数
      date: '',
      // 走马灯参数
      height: ''
    });
    let invoceData = {};
    invoiceAixosData().then((t) => {
      invoceData = t;
    });
    // 今日日期
    let day = moment(new Date()).format('YYYYMMDD');
    // 参数条件
    const params = reactive({
      tenantId,
      startDate: day,
      endDate: day,
      supplierName: ''
    });

    // 请求返回数据结果
    const dataReslut = reactive({
      suppliesCategoryData: [],
      makeOutAnInvoiceData: [],
      ephedrineData: []
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

    let supplierFormatter = (row, colunm, cellValue) => {
      return suppliesGinsengEcharts[cellValue];
    };
    let invoiceFormatter = (row, colunm, cellValue) => {
      return invoceData.invoiceFormatter[cellValue];
    };
    let ephedrineFormatter = (row, colunm, cellValue) => {
      console.log(cellValue);
      return ephedrineGinsengEcharts[cellValue];
    };
    let moenyFormatter = (row, colunm, cellValue) => {
      return parseFloat(cellValue).toFixed(2);
    };

    // 监听参数变化,改变后请求查询后台
    watchEffect(async () => {
      // 5.1药品销售统计物资类别
      await axios.post(salesApi.salesSuppliesCategory, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.suppliesCategoryData = res.data;
          revenueEchartsStatistical('suppliesBarEcharts', echart, dataReslut.suppliesCategoryData, suppliesGinsengEcharts);
          revenueEcharts('suppliesPieEcharts', echart, dataReslut.suppliesCategoryData, suppliesGinsengEcharts);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 5.2药品销售统计开票项目
      await axios.post(salesApi.salesMakeOutAnInvoice, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.makeOutAnInvoiceData = res.data;
          revenueEchartsStatistical('makeOutBarEcharts', echart, dataReslut.makeOutAnInvoiceData, invoceData.invoiceFormatter);
          revenueEcharts('makeOutPieEcharts', echart, dataReslut.makeOutAnInvoiceData, invoceData.invoiceFormatter);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
      // 5.3药品销售统计Otc/处方药/麻黄碱类药品
      await axios.post(salesApi.salesEphedrine, params, { loading: false }).then((res) => {
        if (res.code === '1') {
          dataReslut.ephedrineData = res.data;
          revenueEchartsStatistical('ephedrineBarEcharts', echart, dataReslut.ephedrineData, ephedrineGinsengEcharts);
          revenueEcharts('ephedrinePieEcharts', echart, dataReslut.ephedrineData, ephedrineGinsengEcharts);
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
      revenueEchartsStatistical,
      revenueEcharts,
      supplierFormatter,
      invoiceFormatter,
      ephedrineFormatter,
      customTimeRange,
      moenyFormatter
    };
  },
  beforeMount() {
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