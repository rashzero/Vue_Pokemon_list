<template>
  <div>
    <div v-if="!pokemon">
      <SkeletonCard/>
    </div>
    <v-app class="card" v-else>
      <v-card class="mx-auto" width="400">
        <v-carousel height="400" hide-delimiters>
          <v-carousel-item
            v-for="(item,i) in pokemon.sprites"
            :key="i"
            :src="item ? item : imageNotFound"
            reverse-transition="fade-transition"
            transition="fade-transition"
            width="auto"
          ></v-carousel-item>
        </v-carousel>
        <v-card-title>
          <h2>{{pokemon.id}} {{pokemon.name}}</h2>
        </v-card-title>
        <br>
        <h2>Types:</h2>
        <span v-for="type in pokemon.types" :key="type.type.name">{{type.type.name + " "}}</span>

        <v-card-subtitle>
          <h2>Stats:</h2>
        </v-card-subtitle>
        <div class="pokemon_stats">
          <div
            v-for="stat in pokemon.stats"
            :key="stat.stat.name"
          >{{stat.stat.name}}: {{stat.base_stat}}</div>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>More:
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-card-text>
              <div>base experience: {{pokemon.base_experience}}</div>
              <div>height: {{pokemon.height}}</div>
              <div>weight: {{pokemon.weight}}</div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-btn class="back" color="#34efff" v-on:click="handleBack">Back</v-btn>
    </v-app>
  </div>
</template>

<script>
import SkeletonCard from "./SkeletonCard";

export default {
  name: "Pokemon",

  components: {
    SkeletonCard
  },

  props: ["name"],

  data() {
    return {
      pokemon: "",
      show: false,
      imageNotFound:
        "https://avatars.mds.yandex.net/get-pdb/38069/3e462e1d-9cdc-4301-a922-a4d50cf6e227/s1200?webp=false"
    };
  },

  mounted() {
    this.getPokemon(this.name);
  },

  methods: {
    getPokemon(name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(pokemon => {
          this.pokemon = pokemon;
          console.log(this.pokemon);
        });
    },

    handleBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.card {
  text-align: center;
}

.mx-auto {
  margin: 25px auto;
}

.pokemon_stats {
  text-align: left;
  padding-left: 10%;
}

.back {
  position: fixed;
  top: 80px;
  left: 20px;
  width: 8%;
  max-width: 20%;
  padding: 2px;
}
</style>