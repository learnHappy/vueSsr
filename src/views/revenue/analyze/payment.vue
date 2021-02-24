// 支付渠道方式
<template>
  <div class="payment">
    <el-row>
      <el-col :span="24">
        <div class="echart-header">
          <el-row>
            <el-avatar class="header-avatar-table">
              <i class="iconfont icon-shezhigouwujizifei icon-size" />
            </el-avatar>
            <el-col class="header-table-copy" :span="20">
              <div>支付渠道方式</div>
              <div>站位符站位符站位符站位符站位符站位符站位符站位符站位符站位符</div>
            </el-col>
          </el-row>
        </div>
        <div class="echart-body table-layout">
          <el-carousel :autoplay="false" :height="state.height">
            <el-carousel-item>
              <el-table border :data="state.tableData" empty-text="无数据" stripe style="width: 100%">
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column prop="xy" label="西药" align="center" min-width="90" sortable />
                <el-table-column prop="cy" label="草药" align="center" min-width="90" />
                <el-table-column prop="zcy" label="中成药" align="center" min-width="90" />
                <el-table-column prop="cl" label="材料" align="center" min-width="90" />
              </el-table>
              <el-pagination
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100, 200]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="state.tableData.length"
                :hide-on-single-page="state.tableData.length === 0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-carousel-item>
            <el-carousel-item> 123 </el-carousel-item>
            <el-carousel-item> 123 </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pageHeight } from '../../../utils/publus';
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      height: '',
      tableData: []
    });
    return {
      state,
      pageHeight
    };
  },
  mounted() {
    this.pageHeight(this, 330);
    let that = this;
    window.onresize = () => {
      this.pageHeight(that, 330);
    };
  }
};
</script>

<style lang="scss">
.table-layout {
  padding: 10px;
}
</style>