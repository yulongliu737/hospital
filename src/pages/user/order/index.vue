<script setup lang="ts">
import {useRoute} from "vue-router";
import detail from '@/pages/user/order/detail/index.vue'
import orderList from '@/pages/user/order/list/index.vue'
let $route = useRoute()
</script>

<template>
  <div>
    <div v-if="$route.query.orderId">
      <detail></detail>
    </div>
    <div v-else><order-list></order-list></div>
  </div>
</template>

<style scoped lang="scss">

</style>