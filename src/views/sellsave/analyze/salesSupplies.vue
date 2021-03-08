<template>
  <div class="payment">
    <el-row>
      <el-col :span="24">
        <div class="echart-body table-layout">
          <el-carousel :autoplay="false" :initial-index="0" :height="state.height">
            <el-carousel-item>
              <div id="barEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
            <el-carousel-item>
              <el-table border :max-height="state.height" :data="state.tableData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column prop="happenTime" label="日期" align="center" min-width="120" />
                <el-table-column
                  v-for="(item, index) in state.ginseng.ginsengTable"
                  :prop="item.value"
                  :class-name="item.value"
                  :label="item.label"
                  :formatter="anlyzeMoneyFormatter"
                  :key="index"
                  align="right"
                  header-align="center"
                  min-width="120"
                />
              </el-table>
            </el-carousel-item>
            <el-carousel-item>
              <div id="lineEcharts" :style="{ height: state.height }" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { nextTick, reactive, watch, watchEffect } from 'vue';
import * as echart from 'echarts';
import moment from 'moment';
import { ElMessage } from 'element-plus';
import axios from '../../../axios/index';
import { tenantId, pageHeight, echartsStatistical, echartsLineEcharts, anlyzeMoneyFormatter } from '../../../utils/publus';
export default {
  props: {
    subclass: Object
  },
  setup(props) {
    const state = {
      tableData: [],
      // 走马灯参数
      height: '0',
      ginseng: props.subclass.ginseng,
      frirt: true
    };
    watch(async () => {
      // 3.4营收物资类别分析
      // state.ginseng = props.subclass.ginseng;
      await axios.post(state.ginseng.api, props.subclass.params, { loading: false }).then((res) => {
        if (res.code === '1') {
          let long = 0;
          let value = [];
          // 获取表格数据
          state.tableData = res.data.map((item) => {
            if (item.drugSalesStatisticsVO.length >= long) {
              long = item.drugSalesStatisticsVO.length;
              value = item.drugSalesStatisticsVO;
            }
            let tableJson = {};
            if (item.happenTime.length === 6) {
              tableJson.happenTime = moment(item.happenTime).format('YYYY-MM');
            } else {
              tableJson.happenTime = moment(item.happenTime).format('YYYY-MM-DD');
            }
            item.drugSalesStatisticsVO.map((itemChild) => {
              tableJson[itemChild.aggregationElement] = itemChild.amount;
            });
            return tableJson;
          });
          // 获取表列
          state.ginseng.ginsengTable = value.map((item) => {
            return {
              label: state.ginseng.ginsengEcharts[item.aggregationElement],
              value: item.aggregationElement
            };
          });

          // 加载柱状图
          let series = state.ginseng.ginsengTable.map((item) => {
            return {
              name: item.label,
              type: 'bar',
              stack: 'total',
              data: state.tableData.map((itemChild) => itemChild[item.value])
            };
          });
          echartsStatistical('barEcharts', echart, state.tableData, series);
          // 加载折线图
          let seriesLine = state.ginseng.ginsengTable.map((item) => {
            return {
              name: item.label,
              type: 'line',
              connectNulls: true,
              data: state.tableData.map((itemChild) => itemChild[item.value])
            };
          });
          echartsLineEcharts('lineEcharts', echart, state.tableData, seriesLine);
        } else {
          ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
        }
      });
    });
    return {
      state,
      pageHeight,
      anlyzeMoneyFormatter,
      echartsStatistical,
      echartsLineEcharts
    };
  },
  beforeMount() {
    // 设置内容高度
    let that = this;
    this.pageHeight(that, 208);
    window.onresize = () => {
      that.pageHeight(that, 208);
    };
  }
};
</script>

<style>
</style>