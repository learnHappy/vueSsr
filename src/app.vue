<template>
  <div class="container" v-cloak>
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
    <!-- <router-view /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>
<style lang="scss">
@import './scss/global.scss';
</style>
<style  type="text/css">
	[v-cloak] {
		display: none;
	}
</style>
