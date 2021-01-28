<template>
  <div class="shrink">
    <a :class="shrink" @click="this.$emit('isshow')" />
  </div>
</template>

<script>
export default {
  props: ['shrink']
};
</script>

<style lang="scss">
.el-header {
  padding: 0;
  text-align: left !important;
  & .shrink {
    background-color: #1b91fd;
    line-height: 60px;
    padding: 0 20px;
    cursor: pointer;
  }
}

.el-icon-s-fold,
.el-icon-s-unfold {
  color: white;
  font-size: 20px;
}
</style>