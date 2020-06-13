<template>
  <v-sheet class="px-3 pt-3 pb-3">
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      height="500"
      type="card, list-item, table-tfoot, list-item-three-line, actions"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  name: "SkeletonCard"
};
</script>