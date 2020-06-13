<template>
  <div>
    <Slogan msg="Seat at home. Save pokemons."/>
    <img width="50%" src="../assets/logo.png">
    <CircularProgress v-if="isLoading"/>
    <br>
    {{getError}}
    <div v-if="isLoading">
      <SkeletonList class="skeleton_list" v-for="(item, index) in new Array(10)" :key="index"/>
    </div>
    <PokemonsList
      class="pokemon-list"
      v-bind:pokemons="getPokemon.length > 0 ? getPokemon : getPokemons"
    />
    <v-btn-toggle mandatory>
      <v-btn v-on:click="handleRoutePage($event, currentPage - 1)" :disabled="!currentPage > 0">
        <span>Back</span>
      </v-btn>
      <v-btn
        v-for="(page, index) in new Array(Math.ceil(getCount)).fill(null)"
        :key="index"
        v-on:click="handleRoutePage($event, index)"
        v-bind:style="{ background: index === currentPage ? '#fff333' : '',
          display: index > currentPage + 2 || index < currentPage - 2 ? 'none' : ''}"
      >{{index + 1}}</v-btn>
      <v-btn v-on:click="handleRoutePage($event, currentPage + 1)" :disabled="currentPage + 1 === Math.ceil(getCount)">
        <span>Next</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import Slogan from "../components/Slogan";
import PokemonsList from "../components/PokemonsList";
import CircularProgress from "../components/CircularProgress";
import SkeletonList from "../components/SkeletonList";

export default {
  name: "Main",
  components: {
    Slogan,
    PokemonsList,
    CircularProgress,
    SkeletonList
  },

  props: ["list"],

  computed: {
    isLoading: function() {
      return this.getFetchStatus === "pending";
    },

    getPokemons() {
      return this.$store.getters.getPokemons;
    },

    getFetchStatus() {
      return this.$store.getters.getFetchStatus;
    },

    getPokemon() {
      return this.$store.getters.getPokemon;
    },

    getError() {
      return this.$store.getters.getError;
    },

    getCount() {
      return this.$store.getters.getCount;
    },

    currentPage() {
      if (this.list) {
        return +this.list;
      }
      return 0;
    }
  },

  methods: {
    addPokemonsAction(currentPage) {
      return this.$store.dispatch("addPokemonsAction", currentPage);
    },

    handleRoutePage(event, page) {
      if (page !== this.currentPage) {
        this.$router.push({ path: "/main", query: { list: page } });
        this.addPokemonsAction(page);
      }
    }
  },

  mounted() {
    this.addPokemonsAction(this.currentPage);
  }
};
</script>

<style>
#app {
  text-align: center;
}

.skeleton_list {
  height: 30px;
}

.search {
  border: solid 1px;
  border-radius: 10px;
  height: 35px;
  padding-left: 30px;
  margin-bottom: 20px;
}

.pokemon-list {
  margin-top: 10px;
  margin-bottom: 10px;
}

.searchIcon {
  position: relative;
  height: auto;
  left: 28px;
}

.text_search {
  position: relative;
  height: auto;
  left: -30px;
}
</style>
