<template>
  <div class="profile">
    <div class="profile-header">
      <h1>My profile</h1>
      <h2>{{ user.name }}</h2>
      <button @click="showModal()">Create recipe</button>
      <div class="btns">
        <button v-if="viewFavs" @click="toggleRecipes()" class="recipes-btn">My recipes</button>
        <button v-if="!viewFavs" @click="toggleFavs()" class="fav-btn">Favorites</button>
      </div>
    </div>
    <div class="own-recipes">
      <RecipesCard v-if="!viewFavs" :recipes="ownRecipes" />
    </div>
    <div class="favorites">
      <RecipesCard v-if="viewFavs" :recipes="favorites"/>
    </div>
    <div class="create-recipe" v-if="showCreateRecipe">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-x"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#00263b"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        @click="hideModal()"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      <form @submit.prevent="newRecipe">
        <h1>Create a recipe</h1>
        <input
          type="text"
          name="title"
          placeholder="Enter the title"
          v-model="title"
        />
        <input
          type="url"
          name="image"
          placeholder="Enter the image url"
          v-model="image"
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients(separate with a comma)"
          v-model="ingredients"
        ></textarea>
        <textarea
          name="description"
          placeholder="Recipe description"
          v-model="description"
        ></textarea>
        <input type="submit" value="Create" />
      </form>
    </div>
    <div :class="{ overlay: showCreateRecipe }"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RecipesCard from '@/components/RecipesCard';

export default {
  components: {
    RecipesCard,
  },
  data() {
    return {
      showCreateRecipe: false,
      viewFavs: false,
      title: '',
      image: '',
      ingredients: '',
      description: '',
    };
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn', 'ownRecipes', 'favorites']),
  },
  methods: {
    ...mapActions([
      'getProfile',
      'logout',
      'getOwnRecipes',
      'postRecipe',
      'getFavorites',
    ]),
    showModal() {
      this.showCreateRecipe = true;
    },
    hideModal() {
      this.showCreateRecipe = false;
    },
    logoutUser() {
      this.logout();
    },
    toggleFavs() {
      this.viewFavs = true;
    },
    toggleRecipes() {
      this.viewFavs = false;
    },
    newRecipe() {

      const matchReg = this.image.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/);

      if(!matchReg) {
        this.image = 'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      }

      const newRecipeData = {
        title: this.title,
        image: this.image,
        ingredients: this.ingredients,
        description: this.description,
      };

      this.postRecipe({ id: this.user._id, data: newRecipeData });
      this.hideModal();
    },
  },
  created() {
    this.getProfile();
    this.getOwnRecipes(this.user._id);
    this.getFavorites(this.user._id);
  },
  updated() {
    this.getOwnRecipes(this.user._id);
    this.getFavorites(this.user._id);
  },
};
</script>

<style lang="scss" scoped>
.profile {
  min-height: 100vh;

  .profile-header {
    text-align: center;

    button {
      padding: 10px 15px;
      background-color: $primary-color;
      border: none;
      color: $bg-color;
      border-radius: 12px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.3s ease-in-out all;

      &:hover {
        background-color: $secondary-color;
      }
    }

    .btns {
      margin-top: 10px;

      .recipes-btn {
        color: #fff;
        background-color: $secondary-color;

        &:hover {
          background-color: $third-color;
        }
      }

      .fav-btn {
        color: #fff;
        background-color: #e26a6a;

        &:hover {
          background-color: #c94444;
        }
      }
    }
  }

  .create-recipe {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    background-color: $third-color;
    width: 50%;
    height: 70vh;
    border-radius: 24px;
    animation: scalingForm 0.5s linear;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      input {
        width: 75%;
        margin-bottom: 10px;
        padding: 10px 15px;
        font-size: 1.2rem;
        border-radius: 12px;
        border: none;
      }

      textarea {
        width: 75%;
        padding: 10px 15px;
        margin-bottom: 10px;
        height: 100px;
        resize: none;
        border-radius: 12px;
        border: none;
      }

      textarea[name='description'] {
        height: 200px;
      }

      input[type='submit'] {
        cursor: pointer;
        background-color: $primary-color;
        border: none;
        color: $bg-color;
        transition: 0.3s ease-in-out all;

        &:hover {
          background-color: $secondary-color;
        }
      }
    }

    svg {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  @keyframes scalingForm {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
