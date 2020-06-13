<template>
  <center>
    <v-card class="mx-auto" max-width="300" tile>
      <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(pokemon, index) in pokemons"
            :key="index"
            class="name"
            v-on:click="handleRouteCard($event, pokemon)"
          >
            <v-list-item-content class="content">
              <v-list-item-title class="item">{{pokemon.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </center>
</template>

<script>
export default {
  name: "PokemonsList",
  props: {
    pokemons: Array
  },

  methods: {
    handleRouteCard(event, pokemon) {
      this.$router.push({ path: "/pokemon", query: { name: pokemon.name } });
    }
  }
};
</script>

<style scoped>
.name {
  color: #000 !important;
  text-decoration: none;
  text-align: center;
}

.name:hover {
  background: #fff333;
  color: #ffe;
}

.content {
  text-align: center;
}

.item {
  font-size: 20px;
  text-align: center;
}
</style>
