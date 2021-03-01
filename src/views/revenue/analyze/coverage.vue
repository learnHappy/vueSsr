// 缴费方式
<template>
  <div class="paycost">
    <el-row>
      <el-col :span="24">
        <!-- <div class="echart-header">
          <el-row>
            <el-avatar class="header-avatar-table">
              <i class="iconfont icon-shezhigouwujizifei icon-size" />
            </el-avatar>
            <el-col class="header-table-copy" :span="20">
              <div>标题文案</div>
              <div>站位符站位符站位符站位符站位符站位符站位符站位符站位符站位符</div>
            </el-col>
          </el-row>
        </div> -->
        <div class="echart-body table-layout">
          <el-carousel :autoplay="false" :height="state.height">
            <el-carousel-item>
              <el-table
                border
                :max-height="state.tableHeight"
                :data="state.tableData.slice((state.currpage - 1) * state.pagesize, state.currpage * state.pagesize)"
                empty-text="无数据"
                stripe
                style="width: 100%"
              >
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column prop="xy" label="西药" align="center" min-width="90" sortable />
                <el-table-column prop="cy" label="草药" align="center" min-width="90" />
                <el-table-column prop="zcy" label="中成药" align="center" min-width="90" />
                <el-table-column prop="cl" label="材料" align="center" min-width="90" />
              </el-table>
              <el-pagination
                :current-page="state.currpage"
                :page-sizes="[10, 20, 50, 100, 200]"
                :page-size="state.pagesize"
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
import axios from '../../../axios/index';
export default {
  async setup() {
    const state = reactive({
      height: '',
      tableHeight: '200px',
      tableData: [
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' },
        { xy: '123' }
      ],
      currpage: 1,
      pagesize: 10
    });

    // 分页-每页条数
    let handleSizeChange = (val) => {
      state.pagesize = val;
    };

    // 当前分页
    let handleCurrentChange = (val) => {
      state.currpage = val;
    };

    return {
      state,
      pageHeight,
      handleSizeChange,
      handleCurrentChange
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
.table-layout {
  padding: 10px;
}
</style>