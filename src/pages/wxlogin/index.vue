<script setup lang="ts">
import {useRoute} from "vue-router";

let $route = useRoute();
console.log("跳转：" + $route.query)
</script>

<template>
<div>
  wxLoginPage
</div>
</template>

<style scoped lang="scss">

</style>