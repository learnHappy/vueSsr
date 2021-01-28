<template>
  <el-card class="box-card" style="margin: -10px -10px 10px -10px !important">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>主要功能</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>

  <el-row :gutter="10">
    <el-col :xs="24" :md="12">
      <el-card class="box-card">
        <template #header>
          <el-row>
            <el-col :span="8">营收金额</el-col>
            <el-col :span="16" class="date-button">
              <el-button size="mini" :type="buttonType">当日</el-button>
              <el-button size="mini">本周</el-button>
              <el-button size="mini">本月</el-button>
              <el-button size="mini">上月</el-button>
            </el-col>
          </el-row>
        </template>
        <div class="text item">
          <el-row>
            <el-col :span="3">
              <i class="el-icon-bank-card" style="font-size: 30px" />
            </el-col>
            <el-col :span="5">
              <h5>医保金额</h5>
              <div>￥<span class="amount-size">900</span></div>
            </el-col>

            <el-col :span="3">
              <i class="el-icon-money" style="font-size: 30px" />
            </el-col>
            <el-col :span="5">
              <h5>自费金额</h5>
              <div>￥<span class="amount-size">100</span></div>
            </el-col>

            <el-col :span="3">
              <i class="el-icon-coin" style="font-size: 30px" />
            </el-col>
            <el-col :span="5">
              <h5>总金额</h5>
              <div>￥<span class="amount-size">1000</span></div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :md="12">
      <div>
        <el-card class="box-card">
          <template #header>
            <div style="height: 28px; line-height: 28px">综合数据</div>
          </template>
          <div class="text item">
            <el-row style="height: 57px">
              <el-col :span="8">
                <h5>就诊人数</h5>
                <div>10</div>
              </el-col>
              <el-col :span="8">
                <h5>临期商品种类数量</h5>
                <div style="color: red">20</div>
              </el-col>
              <el-col :span="8">
                <h5>库存不足种类数量</h5>
                <div style="color: red">15</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="10">
    <el-col :xs="24" :md="12">
      <div class="">
        <el-card class="box-card">
          <template #header>
            <div>最近七日营收金额折线图</div>
          </template>
          <div class="text item">
            <div id="echarts-attendance" class="echarts" />
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :xs="24" :md="12">
      <div class="">
        <el-card class="box-card">
          <template #header>
            <div>最近七日就诊人数折线图</div>
          </template>
          <div class="text item">
            <div id="echarts-revenue" class="echarts" />
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :xs="24" :md="12">
      <el-card class="box-card">
        <template #header>
          <div>医生业绩对比图</div>
        </template>
        <div class="text item">
          <div id="echarts-doctor" class="echarts" />
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :md="12">
      <el-card class="box-card">
        <template #header>
          <div>科室业绩对比图</div>
        </template>
        <div class="text item">
          <div id="echarts-department" class="echarts" />
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card class="box-card">
        <template #header>
          <div>医生业绩对比图</div>
        </template>
        <div class="text item">
          <div id="echarts-purchasing" class="echarts" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import * as echart from 'echarts';

export default {
  data() {
    return {
      buttonType: 'primary',
      activeName: 'first'
    };
  },
  mounted() {
    this.echartsAttendance();
    this.echartsRecords();
    this.echartsDoctor();
    this.echartsDepartment();
    this.echartsPurchasing();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    echartsAttendance() {
      /**
       * 报表功能
       */
      var echartsAttendance = echart.init(document.getElementById('echarts-attendance'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['营收金额']
        },
        xAxis: {
          data: ['2020-12-01', '2020-12-02', '2020-12-03', '2020-12-04', '2020-12-05', '2020-12-06', '2020-12-07']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 15]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsAttendance.setOption(option);
    },
    echartsRecords() {
      /**
       * 报表功能
       */
      var echartsRecords = echart.init(window.document.getElementById('echarts-revenue'), 'light');
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
        legend: {
          data: ['营收金额']
        },
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
    echartsDoctor() {
      /**
       * 报表功能
       */
      var echartsDoctor = echart.init(document.getElementById('echarts-doctor'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['新手', '主任', '院长']
        },
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
    echartsDepartment() {
      /**
       * 报表功能
       */
      var echartsDepartment = echart.init(document.getElementById('echarts-department'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['儿童科', '妇科', '神经科']
        },
        xAxis: {
          data: ['2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12']
        },
        yAxis: {
          // type: 'category',
        },
        series: [
          {
            name: '儿童科',
            type: 'bar',
            data: [100, 80, 150, 200, 300, 260]
          },
          {
            name: '妇科',
            type: 'bar',
            data: [1000, 900, 1200, 1800, 2300, 900]
          },
          {
            name: '神经科',
            type: 'bar',
            data: [5000, 9000, 6700, 4500, 3600, 5000]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsDepartment.setOption(option);
    },
    echartsPurchasing() {
      /**
       * 报表功能
       */
      var echartsPurchasing = echart.init(document.getElementById('echarts-purchasing'), 'light');
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '采购、销售对比'
        },
        tooltip: {},
        legend: {
          data: ['采购', '销售']
        },
        xAxis: {
          data: ['2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12']
        },
        yAxis: {
          // type: 'category',
        },
        series: [
          {
            name: '采购',
            type: 'line',
            data: [100, 80, 150, 200, 300, 260, 90]
          },
          {
            name: '销售',
            type: 'line',
            data: [90, 90, 120, 180, 230, 90, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      echartsPurchasing.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.welcome {
  width: 100%;
  height: 100%;
  background-color: white;
}

.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.clearfix {
  & > span {
    color: #adafb3;
  }
  & > i {
    float: right;
    line-height: 21px;
  }
}
.number {
  font-size: 24px;
  // text-indent: 4px;
  padding: 5px;
}

.bread_crumb {
  margin: -10px -10px 10px -10px !important;
}

.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}

.box-card {
  width: auto !important;
  margin: 0 !important;
}

.el-card__body {
  padding: 10px;
  color: #adafb3;
  text-indent: 10px;
}

.echarts {
  width: 100%;
  min-height: 300px;
}

.date-button {
  text-align: right;
  & > button {
    margin-left: 0 !important;
    border-radius: 0 !important;
  }
}

.amount-size {
  font-size: 30px;
  font-weight: 400;
  cursor: pointer;
}
.amount-size:hover {
  color: #333;
}
</style>