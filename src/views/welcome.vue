<template>
  <div class="welcome">
    <!-- 功能入口 -->
    <el-row class="fun-style">
      <el-col :span="24">
        <el-carousel height="70px" :autoplay="false" trigger="click" indicator-position="outside">
          <el-carousel-item>
            <template v-for="o in 7" :key="o">
              <router-link to="/statistical">
                <button class="fun-entrance">
                  <el-row>
                    <el-col :span="6"><i class="el-icon-date" /></el-col>
                    <el-col :span="18" style="line-height: 30px">当日营收统计</el-col>
                  </el-row>
                </button>
              </router-link>
            </template>
          </el-carousel-item>
          <el-carousel-item> 1231313 </el-carousel-item>
        </el-carousel>
        <div class="head-portrait">
          <el-row>
            <el-col :sm="10" :xs="0"> logo </el-col>
            <el-col :sm="14" :xs="24" style="text-align: left; padding-top: 15px">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
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
                  <el-button round size="small" plain>今日</el-button>
                  <el-button size="small">本月</el-button>
                  <el-button round size="small">本年</el-button>
                </el-button-group>
              </div>
            </div>
          </template>
          <div>
            <el-row>
              <el-col :span="8">
                <div class="text">
                  <h2>900.00</h2>
                  <p>医保金额(元)</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>100.00</h2>
                  <p>自费金额(元)</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>1000.00</h2>
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
                  <h2>10</h2>
                  <p>就诊人数</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>20</h2>
                  <p>临期商品种类数量</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text">
                  <h2>15</h2>
                  <p>库存不足种类数量</p>
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
          <template #header>
            <div>
              <span class="header-title-native">营收报表</span>
            </div>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="险种" prop="xz" min-width="80" />
            <el-table-column label="实收总金额" prop="sszje" min-width="120" />
            <el-table-column label="应收金额" prop="ysje" min-width="100" />
            <el-table-column label="医保金额" prop="ybje" min-width="100" />
            <el-table-column label="支付宝金额" prop="zfbje" min-width="120" />
            <el-table-column label="微信金额" prop="wxje" min-width="100" />
            <el-table-column label="银联金额" prop="ylje" min-width="100" />
            <el-table-column label="其他现金金额" prop="qtxjje" min-width="140" />
            <el-table-column label="操作" min-width="180">
              <template #default="scope">
                <el-button round size="mini" type="success" class="el-icon-circle-plus" />
                <el-button round size="mini" type="warning" class="el-icon-circle-plus-outline" />
                <el-button round size="mini" type="danger" class="el-icon-delete" />
              </template>
            </el-table-column>
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
                  <span class="header-title-native">柱状图</span>
                </div>
              </template>
              <div id="echarts-doctor" style="height: 300px"></div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="16" :xs="24">
            <el-card class="box-card">
              <template #header>
                <div>
                  <span class="header-title-native">折线图</span>
                </div>
              </template>
              <div id="echarts-revenue" style="height: 300px"></div>
            </el-card>
          </el-col>
          <el-col :sm="8" :xs="24">
            <el-card class="box-card">
              <template #header>
                <div>
                  <span class="header-title-native">饼图</span>
                </div>
              </template>
              <div id="revenueEcharts" style="height: 300px"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="8" :sm="24">
        <el-card class="box-card">
          <template #header>
            <div>
              <span class="header-title-native">待处理事项</span>
            </div>
          </template>
          <div>
            <div class="pending">
              <el-row v-for="o in 13" :key="o">
                <el-col :span="4">
                  <i class="el-icon-picture-outline-round" />
                </el-col>
                <el-col :span="16">
                  <h5>待处理事项</h5>
                  <p :class="o === 1 ? 'bule' : ''">待处理事项待处理事项待处理事项</p>
                </el-col>
                <el-col :span="4"> <div class="date-buttom">2020.02.04</div> </el-col>
              </el-row>
            </div>
            <el-button type="primary" style="width: 100%">更多</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import * as echarts from 'echarts';
import axios from '../axios/index';
export default {
  async setup() {
    let tableData = [];
    await axios.get('tableData').then((res) => {
      if (res.code === 0) {
        tableData = res.data;
      }
    });

    const state = reactive({
      tableData
      // tableData: [
      //   {
      //     xz: '自费',
      //     sszje: '678.99',
      //     ysje: '678.99',
      //     ybje: '0.00',
      //     zfbje: '0.00',
      //     wxje: '0.00',
      //     ylje: '0.00',
      //     qtxjje: '0.00'
      //   },
      //   {
      //     xz: '自费',
      //     sszje: '678.99',
      //     ysje: '678.99',
      //     ybje: '0.00',
      //     zfbje: '0.00',
      //     wxje: '0.00',
      //     ylje: '0.00',
      //     qtxjje: '0.00'
      //   },
      //   {
      //     xz: '医保',
      //     sszje: '678.99',
      //     ysje: '678.99',
      //     ybje: '0.00',
      //     zfbje: '0.00',
      //     wxje: '0.00',
      //     ylje: '0.00',
      //     qtxjje: '0.00'
      //   },
      //   {
      //     xz: '医保',
      //     sszje: '678.99',
      //     ysje: '678.99',
      //     ybje: '0.00',
      //     zfbje: '0.00',
      //     wxje: '0.00',
      //     ylje: '0.00',
      //     qtxjje: '0.00'
      //   }
      // ]
    });
    return {
      ...toRefs(state)
    };
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
        // legend: {
        //   data: ['新手', '主任', '院长']
        // },
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
          },
          {
            name: '主任',
            type: 'bar',
            data: [1000, 900, 1200, 1800, 2300, 900]
          },
          {
            name: '院长',
            type: 'bar',
            data: [5000, 9000, 6700, 4500, 3600, 5000]
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
            return `${params.name}的应收金额为￥${params.value}`;
          }
        },
        // legend: {
        //   data: ['营收金额']
        // },
        xAxis: {
          name: '日期',
          data: ['2020-12-01', '2020-12-02', '2020-12-03', '2020-12-04', '2020-12-05', '2020-12-06', '2020-12-07'],
          nameTextStyle: {
            color: 'black'
          }
        },
        yAxis: {
          name: '单位: ￥',
          nameTextStyle: {
            color: 'black'
          }
        },
        series: [
          {
            name: '金额',
            type: 'line',
            data: [1000, 800, 1100, 500, 700, 1500, 900]
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
        // legend: {
        //   orient: 'horizontal',
        //   left: 10,
        //   bottom: 20,
        //   data: ['西药费', '中草药', '中成药', '材料费'],
        //   selected: ['西药费', '中草药', '中成药', '材料费']
        // },
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
  },
  mounted() {
    this.echartsDoctor(echarts);
    this.echartsRecords(echarts);
    this.revenueEcharts(echarts);
  }
};
</script>

<style lang="scss">
@import '../scss/welcome.scss';
</style>