import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  pokemons: [],
  fetchStatus: "rejected",
  pokemon: [],
  errorMessage: "",
  countPage: "",
  next: "",
  previous: ""
};

const mutations = {
  ADD_POKEMONS(state, payload) {
    if (!state.countPage) {
      state.countPage = payload.count;
    }
    state.pokemons = payload.results;
    state.next = payload.next;
    state.previous = payload.previous;
  },

  SET_FETCH_STATUS(state, payload) {
    state.fetchStatus = payload;
  },

  SET_POKEMON(state, payload) {
    state.pokemon = payload;
  },

  SET_ERROR(state, payload) {
    state.errorMessage = payload;
  }
};

const actions = {
  addPokemonsAction(context, numberOfPage) {
    this.fetchStatus = "pending";
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${numberOfPage + "0"}`
    )
      .then(res => res.json())
      .then(pokemons => {
        context.commit("ADD_POKEMONS", pokemons);
        this.fetchStatus = "fulfilled";
      });
  },

  setFetchStatusActions(context, status) {
    context.commit("SET_FETCH_STATUS", status);
  },

  setPokemonActions(context, pokemon) {
    context.commit("SET_POKEMON", pokemon);
  },

  setErrorActions(context, error) {
    context.commit("SET_ERROR", error);
  }
};

const getters = {
  getPokemons(state) {
    return state.pokemons;
  },

  getFetchStatus(state) {
    return state.fetchStatus;
  },

  getPokemon(state) {
    return state.pokemon;
  },

  getError(state) {
    return state.errorMessage;
  },

  getCount(state) {
    return state.countPage / 10;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
