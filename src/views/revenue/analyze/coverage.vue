// 缴费方式
<template>
  
</template>

<script>
import { pageHeight } from '../../../utils/publus';
import { onMounted, reactive, toRef, watch, watchEffect } from 'vue';
import * as echart from 'echarts';
import axios from '../../../axios/index';
export default {
  props: {
    datas: Array
  },
  async setup(props, { emit }) {
    const state = reactive({
      height: '',
      tableHeight: '200px',
      tableData: props.datas,
      currpage: 1,
      pagesize: 10
    });

    // if (props.datas.length > 0) {
    //   state.tableHeight = props.datas.map((item) => {
    //     let data = {
    //       happenTime: item.happenTime,
    //       ybAmount: item.revenueAnalyzeList[0].amount,
    //       zfAmount: item.revenueAnalyzeList[1].amount
    //     };
    //   });
    // }

    watchEffect(() => {
      console.log(state.tableData);
    });


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

    onMounted(() => {
      echartsStatistical('plantBarEcharts', echart, state.tableData);
    });

    return {
      state,
      pageHeight,
      handleSizeChange,
      handleCurrentChange
      // echartsStatistical
    };
  },
  mounted() {
    this.pageHeight(this, 250);
    let that = this;
    window.onresize = () => {
      this.pageHeight(that, 250);
    };
  }
};
</script>

<style lang="scss">

</style>