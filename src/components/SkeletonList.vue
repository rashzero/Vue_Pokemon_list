<template>
  <v-skeleton-loader class="skeleton" max-width="200" type="list-item"></v-skeleton-loader>
</template>

<script>
export default {
  name: "SkeletonList"
};
</script>

<style scoped>
.skeleton {
  margin: 0px auto;
  height: 30px;
}
</style>