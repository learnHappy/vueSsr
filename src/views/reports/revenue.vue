<template>
  <el-row :gutter="10">
    <el-col :span="16">
      <el-table :data="tableData" height="460" border style="width: 100%">
        <el-table-column header-align="center" align="center" prop="xz" label="险种" min-width="60" />
        <el-table-column header-align="center" align="right" prop="sszje" label="实收总金额" min-width="100" />
        <el-table-column header-align="center" align="right" prop="ysje" label="应收金额" min-width="90" />
        <el-table-column header-align="center" align="right" prop="ybje" label="医保金额" min-width="90" />
        <el-table-column header-align="center" align="right" prop="zfbje" label="支付宝金额" min-width="100" />
        <el-table-column header-align="center" align="right" prop="wxje" label="微信金额" min-width="90" />
        <el-table-column header-align="center" align="right" prop="ylje" label="银联金额" min-width="90" />
        <el-table-column header-align="center" align="right" prop="qtxjje" label="其他现金金额" min-width="110" />
      </el-table>
      <div class="page">
        <el-pagination
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          xz: '自费',
          sszje: '678.99',
          ysje: '678.99',
          ybje: '0.00',
          zfbje: '0.00',
          wxje: '0.00',
          ylje: '0.00',
          qtxjje: '0.00'
        },
        {
          xz: '医保',
          sszje: '678.99',
          ysje: '678.99',
          ybje: '0.00',
          zfbje: '0.00',
          wxje: '0.00',
          ylje: '0.00',
          qtxjje: '0.00'
        }
      ],
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style>
.page {
  background-color: #ffffff;
}
</style>