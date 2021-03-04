// 营收统计功能
<template>
  <div class="second-layout">
    <el-row>
      <el-col :md="15" :sm="24" class="sm-bottom">
        <el-row :gutter="20">
          <el-col :lg="4" :md="6" :sm="6">
            <el-select v-model="params.plantCode" placeholder="选择供应商">
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
                <!-- {{
                  parseFloat(dataReslut.suppliesCategoryData.map((item) => item.amount - 0).reduce((n, m) => n + m, 0)).toFixed(2)
                }} -->
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
    </el-row>
  </div>
</template>

<script>
import { reactive } from '@vue/runtime-core';
import moment from 'moment';
import { pageHeight, tenantId, fastDateHanderClick ,customTimeRange} from '../../utils/publus';
export default {
  setup() {
    const state = reactive({
      // 日期参数
      options: [{ label: '选择供应商', value: '' }],
      fastDateType: 'day',
      // 时间参数
      date: '',
      // 走马灯参数
      height: ''
    });

    // 今日日期
    let day = moment(new Date()).format('YYYYMMDD');
    // 参数条件
    const params = reactive({
      tenantId,
      startDate: day,
      endDate: day,
      supplierName: '' // 供应商名称
    });

    // 请求返回数据结果
    const dataReslut = reactive({
      suppliesCategoryData: []
    });

    return {
      state,
      params,
      dataReslut,
      fastDateHanderClick,
      pageHeight
    };
  }  
  ,mounted() {
    // 设置内容高度
    let that = this;
    this.pageHeight(that, 198);
    window.onresize = () => {
      that.pageHeight(that, 198);
    };
    console.log(this.state.height);
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