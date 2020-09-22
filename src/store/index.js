import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLogin: false,
    showRegister: false,
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null,
    recipes: [],
    ownRecipes: [],
    singleRecipe: '',
    favorites: ''
  },
  getters: {
    showLogin: (state) => state.showLogin,
    showRegister: (state) => state.showRegister,
    isLoggedIn: (state) => !!state.token,
    authState: (state) => state.status,
    user: (state) => state.user,
    error: (state) => state.error,
    recipes: (state) => state.recipes,
    ownRecipes: (state) => state.ownRecipes,
    singleRecipe: (state) => state.singleRecipe,
    favorites: (state) => state.favorites
  },
  actions: {
    showLoginForm({ commit }) {
      commit('show_login');
    },
    hideLoginForm({ commit }) {
      commit('hide_login');
    },
    showRegisterForm({ commit }) {
      commit('show_register');
    },
    hideRegisterForm({ commit }) {
      commit('hide_register');
    },
    async login({ commit }, user) {
      try {
        commit('auth_request');
        const res = await axios.post('http://localhost:3000/users/login', user);

        if (res.data.success) {
          const token = res.data.token;
          const user = res.data.user;

          localStorage.setItem('token', token);

          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', token, user);
        }

        return res;
      } catch (error) {
        commit('auth_error', error);
      }
    },
    async register({ commit }, userData) {
      try {
        commit('register_request');
        const res = await axios.post(
          'http://localhost:3000/users/register',
          userData
        );

        if (res.data.success !== undefined) {
          commit('register_success');
        }

        return res;
      } catch (error) {
        commit('register_error', error);
      }
    },
    async getProfile({ commit }) {
      commit('profile_request');
      const res = await axios.get('http://localhost:3000/users/profile');
      commit('user_profile', res.data.user);
      return res;
    },
    async logout({ commit }) {
      await localStorage.removeItem('token');
      commit('logout');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/');
      return;
    },
    async getOwnRecipes({ commit }, id) {
      try {
        const res = await axios.get(
          `http://localhost:3000/recipes/${id}/own-recipes`
        );
  
        commit('own_recipes', res.data.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async postRecipe({commit}, { id, data }) {
      try {
        const res = await axios.post(
          `http://localhost:3000/recipes/${id}/new-recipe`,
          data
        );
        commit('new_recipe', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async allRecipes({commit}) {
      try {
        const res = await axios.get('http://localhost:3000/recipes/all');
        commit('all_recipes', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipe({commit}, id) {
      const res = await axios.get(`http://localhost:3000/recipes/single-recipe/${id}`);
      commit('single_recipe', res.data);
    },
    async updateRecipe({commit}, {id, data}) {
      const res = await axios.put(`http://localhost:3000/recipes/update-recipe/${id}`, data);
      commit('update_recipe', res.data);
    },
    async deleteRecipe({commit},{userId, recipeId}) {
      const res = await axios.delete(`http://localhost:3000/recipes/${userId}/recipe/${recipeId}`);
      commit('delete_recipe');
      return res;
    },
    async postComment({commit}, {id, data}) {
      const res = await axios.post(`http://localhost:3000/recipes/recipe/${id}/new-comment`, data);
      commit('new_comment')
      return res;
    },
    async getFavorites({commit}, id) {
      const res = await axios.get(`http://localhost:3000/recipes/${id}/favorites`);
      commit('get_favorites', res.data);
    },
    async saveFavorite({commit}, {id, data}) {
      const res = await axios.post(`http://localhost:3000/recipes/${id}/new-favorite`, data);
      commit('new_favorite', res.data);
    }
  },
  mutations: {
    show_login(state) {
      state.showLogin = true;
    },
    hide_login(state) {
      state.showLogin = false;
    },
    show_register(state) {
      state.showRegister = true;
    },
    hide_register(state) {
      state.showRegister = false;
    },
    auth_request(state) {
      state.error = null;
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.error = null;
      state.token = token;
      state.user = user;
      state.status = 'success';
    },
    auth_error(state, error) {
      state.error = error.response.data.msg;
    },
    register_request(state) {
      state.error = null;
      state.status = 'loading';
    },
    register_success(state) {
      state.error = null;
      state.status = 'success';
    },
    register_error(state, error) {
      state.error = error.response.data.msg;
    },
    profile_request(state) {
      state.status = 'loading';
    },
    user_profile(state, user) {
      state.user = user;
    },
    logout(state) {
      state.error = null;
      state.status = '';
      state.token = '';
      state.user = '';
    },
    all_recipes(state, recipes) {
      state.recipes = recipes;
    },
    own_recipes(state, ownRecipes) {
      state.ownRecipes = ownRecipes;
    },
    single_recipe(state, singleRecipe) {
      state.singleRecipe = singleRecipe;
    },
    new_recipe(state, recipe) {
      state.recipes.push(recipe);
    },
    update_recipe(state, newRecipe) {
      state.singleRecipe = newRecipe;
    },
    delete_recipe(state) {
      state.ownRecipes;
    },
    new_comment(state) {
      state.singleRecipe;
    },
    get_favorites(state, favorites) {
      state.favorites = favorites;
    },
    new_favorite(state, favorite) {
      state.favorites.push(favorite);
    }
  },
});
