// 营收统计功能
<template>
  <div class="second-layout">
    <el-row>
      <el-col :md="14" :sm="24" class="sm-bottom">
        <el-row :gutter="20">
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="state.value" placeholder="测试门店">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="state.value1" placeholder="险种选择">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="state.value2" placeholder="科室选择">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-date-picker v-model="state.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
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
              <div class="header-blue header-position">¥133.00</div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :height="state.height">
            <el-carousel-item>
              <div id="echarts-category" style="height: 429px" />
            </el-carousel-item>
            <el-carousel-item> 123 </el-carousel-item>
            <el-carousel-item> 123 </el-carousel-item>
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
              <div class="header-green header-position">¥133.00</div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :initial-index="1" :height="state.height">
            <el-carousel-item> 123 </el-carousel-item>
            <el-carousel-item>
              <el-table :data="state.tableData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column prop="xy" label="西药" min-width="90" />
                <el-table-column prop="cy" label="草药" min-width="90" />
                <el-table-column prop="zcy" label="中成药" min-width="90" />
                <el-table-column prop="cl" label="材料" min-width="90" />
              </el-table>
            </el-carousel-item>
            <el-carousel-item> 123 </el-carousel-item>
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
              <div class="header-yellow header-position">¥133.00</div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body">
          <el-carousel :autoplay="false" :initial-index="2" :height="state.height">
            <el-carousel-item>
              <div>123</div>
            </el-carousel-item>
            <el-carousel-item> 123 </el-carousel-item>
            <el-carousel-item>
              <div id="revenueEcharts" style="height: 429px" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pageHeight } from '../../utils/publus';
import { reactive } from 'vue';
import * as echart from 'echarts';
export default {
  setup() {
    const state = reactive({
      // 日期参数
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      value1: '',
      value2: '',
      fastDateType: 'day',
      // 时间参数
      date: '',
      // 走马灯参数
      height: '',
      // 表格数据
      tableData: []
    });

    // 点击快速选择时间范围
    let fastDateHanderClick = (val) => {
      state.fastDateType = val;
      if (val === 'day') {

      }
    };

    return {
      state,
      pageHeight,
      fastDateHanderClick
    };
  },
  mounted() {
    let that = this;
    this.pageHeight(that, 228);
    window.onresize = () => {
      that.pageHeight(that, 228);
    };
    setTimeout(() => {
      that.echartsCategory(echart);
      that.revenueEcharts(echart);
    }, 100);
  },
  methods: {
    echartsCategory(echart) {
      /**
       * 报表功能
       */
      var echartsCategory = echart.init(window.document.getElementById('echarts-category'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        xAxis: {
          data: ['2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12']
        },
        yAxis: {
          // type: 'category',
        },
        series: [
          {
            name: '新手',
            type: 'bar',
            data: [100, 80, 150, 200, 300, 260]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsCategory.setOption(option);
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
            data: [
              { value: 80.5, name: '西药费' },
              { value: 60.49, name: '中草药' },
              { value: 630.0, name: '中成药' },
              { value: 200.0, name: '材料费' }
            ]
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