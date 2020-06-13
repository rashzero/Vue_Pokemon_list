<template>
  <div>
    <v-app-bar color="#5f2357" dark>
      <v-icon class="home_icon" v-on:click="handleRouteHome">mdi-home-outline</v-icon>

      <v-toolbar-title>Header</v-toolbar-title>

      <v-spacer></v-spacer>
      <div>
        <v-icon class="searchIcon">mdi-magnify</v-icon>
        <input
          class="search"
          type="search"
          ref="search"
          placeholder="Search"
          v-on:input="handleFindPokemon($event)"
          v-model="searchText"
        >
        <v-icon class="text_search" v-if="searchText" v-on:click="handleResetInput">mdi-close</v-icon>
        <v-icon v-else color="#5f2357">mdi-close</v-icon>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      searchText: "",
      timerId: "",
      controller: new AbortController()
    };
  },

  computed: {
    isLoading: function() {
      return this.getFetchStatus === "pending";
    },

    getFetchStatus() {
      return this.$store.getters.getFetchStatus;
    }
  },

  methods: {
    handleRouteHome() {
      const path = `/main`;
      if (this.$route.path !== path) this.$router.push(path);
    },

    setFetchStatusActions(status) {
      return this.$store.dispatch("setFetchStatusActions", status);
    },

    setPokemonActions(pokemon) {
      return this.$store.dispatch("setPokemonActions", pokemon);
    },

    setErrorActions(error) {
      return this.$store.dispatch("setErrorActions", error);
    },

    handleResetInput() {
      this.searchText = "";
      this.setErrorActions("");
      this.setPokemonActions([]);
    },

    handleFindPokemon(event) {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

      if (this.isLoading) {
        this.controller.abort();
        this.controller = new AbortController();
      }

      if (event.target.value) {
        this.setPokemonActions([]);
        this.getPokemonByName(event.target.value);
      } else {
        this.setFetchStatusActions("rejected");
        this.setErrorActions("");
      }
    },

    getPokemonByName(pokemonName) {
      const signal = this.controller.signal;

      this.timerId = setTimeout(() => {
        this.setFetchStatusActions("pending");
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, { signal })
          .then(res => res.json())
          .then(pokemon => {
            this.setPokemonActions([pokemon]);
            this.setFetchStatusActions("fulfilled");
            this.setErrorActions("");
          })
          .catch(err => {
            this.setErrorActions("Такого покемона еще не придумали!");
            this.setPokemonActions([]);
            this.setFetchStatusActions("rejected");
          });
      }, 1000);
    },

    setFocus() {
      this.$refs.search.focus();
    }
  },
  mounted() {
    this.setFocus();
  }
};
</script>

<style>
.home_icon {
  margin-right: 15px;
}

.text_search {
  position: relative;
  height: auto;
  left: -30px;
}

.searchIcon {
  position: relative;
  height: auto;
  left: 28px;
}

.search {
  border: solid 1px;
  border-radius: 10px;
  height: 35px;
  padding-left: 30px;
  margin-top: 20px;
}

.search:focus {
  outline: none;
}
</style>