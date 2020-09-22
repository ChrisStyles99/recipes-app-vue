<template>
  <div class="single-recipe">
    <div class="image-div">
      <img
        :src="singleRecipe.image"
        alt=""
      />
    </div>
    <div class="recipe-text">
      <h1>{{ singleRecipe.title }}</h1>
      <p>
        {{singleRecipe.createdAt}}
      </p>
      <p>
        Author: {{singleRecipe.user.name}}
      </p>
      <p>
        {{formattedIngredients}}
      </p>
      <p>
        {{ singleRecipe.description }}
      </p>
    </div>
    <div class="recipe-btns">
      <button
        class="fav-btn"
        v-if="singleRecipe.user !== user._id && isLoggedIn && !checkFav"
        @click="addFavorite()"
      >
        Favorite
      </button>
      <button class="already-fav" v-if="checkFav">
        Already Fav
      </button>
      <router-link
        class="edit-btn"
        v-if="singleRecipe.user === user._id && isLoggedIn"
        :to="'/recipe/edit/' + singleRecipe._id"
        >Edit</router-link
      >
      <button
        class="delete-btn"
        v-if="singleRecipe.user === user._id && isLoggedIn"
        @click="showDeleteModal()"
      >
        Delete
      </button>
    </div>
    <div class="comment-form">
      <h2>Add a comment</h2>
      <form @submit.prevent="newComment">
        <input
          type="text"
          name="commentTitle"
          placeholder="Title"
          v-model="commentTitle"
        />
        <textarea
          name="commentMessage"
          placeholder="Message"
          v-model="commentMessage"
        >
        </textarea>
        <input type="submit" value="Add Comment" />
      </form>
    </div>
    <div class="comment-section">
      <h2>Comments</h2>
      <Comment :comments="singleRecipe.comments" />
    </div>
    <div class="delete-recipe" v-if="showDelete">
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
        @click="hideDeleteModal()"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      <h1>Are you sure you want to delete the recipe?</h1>
      <button @click="dltRecipe">Delete</button>
    </div>
    <div :class="{ overlay: showDelete }"></div>
  </div>
</template>

<script>
import Comment from '@/components/Comment';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Comment,
  },
  data() {
    return {
      showDelete: false,
      id: this.$route.params.id,
      commentTitle: '',
      commentMessage: '',
      favoriteBtn: false
    };
  },
  computed: {
    ...mapGetters(['singleRecipe', 'user', 'isLoggedIn']),
    checkFav() {
      this.user.favorites.forEach(favorite => {
        if(favorite.recipeId === this.id) {
          this.favoriteBtn = true;
        }
      });
      
      return this.favoriteBtn;
    },
    formattedIngredients () {
      return this.singleRecipe.ingredients.split(',').join('\n');
    }
  },
  methods: {
    ...mapActions([
      'getRecipe',
      'updateRecipe',
      'getProfile',
      'deleteRecipe',
      'postComment',
      'saveFavorite'
    ]),
    showDeleteModal() {
      this.showDelete = true;
    },
    hideDeleteModal() {
      this.showDelete = false;
    },
    dltRecipe() {
      this.deleteRecipe({ userId: this.user._id, recipeId: this.id });
      this.hideDeleteModal();
      this.$router.push('/profile');
    },
    newComment() {
      if (!this.isLoggedIn) {
        this.commentTitle = '';
        this.commentMessage = '';
        return alert('You need to login to do that');
      }

      const commentData = {
        title: this.commentTitle,
        message: this.commentMessage,
        author: this.user.name,
      };

      this.postComment({ id: this.id, data: commentData });
      this.getRecipe(this.id);

      this.commentTitle = '';
      this.commentMessage = '';
    },
    addFavorite() {

      if(this.user._id === this.singleRecipe.user._id) {
        return
      }

      const newFav = {
        title: this.singleRecipe.title,
        image: this.singleRecipe.image,
        recipeId: this.id
      }
      console.log(newFav);
      this.saveFavorite({id: this.user._id, data: newFav});

      this.$router.push('/profile');
    }
  },
  created() {
    this.getRecipe(this.id);
    this.getProfile();
  },
  updated() {
    this.getRecipe(this.id);
    this.getProfile();
  },
};
</script>

<style lang="scss" scoped>
.single-recipe {
  display: grid;
  grid-template-columns: 5% 1fr 25%;
  grid-template-rows: 60vh minmax(40vh, auto) 300px auto;

  .image-div {
    grid-column: span 3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .recipe-text {
    grid-column: 2 / 3;

    h1 {
      color: $secondary-color;
      text-align: center;
    }
  }

  .recipe-btns {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    width: 60%;

    .fav-btn {
      color: #e26a6a;
      border: 1px solid #e26a6a;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.3s ease-in all;

      &:hover {
        color: $bg-color;
        background-color: #e26a6a;
      }
    }

    .edit-btn {
      color: $third-color;
      border: 1px solid $third-color;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 1.2rem;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      transition: 0.3s ease-in all;

      &:hover {
        color: $bg-color;
        background-color: $third-color;
      }
    }

    .delete-btn {
      color: #b61919;
      border: 1px solid #b61919;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.3s ease-in all;

      &:hover {
        color: $bg-color;
        background-color: #b61919;
      }
    }

    .already-fav {
      background-color: $primary-color;
      padding: 10px 15px;
      font-size: 1.2rem;
      border: none;
    }
  }

  .comment-form {
    grid-column: 2 / 3;

    form {
      display: flex;
      flex-direction: column;
      width: 50%;

      input {
        margin: 10px 0;
        padding: 10px 15px;
        font-size: 1.2rem;
      }

      textarea {
        margin: 10px 0;
        padding: 10px 15px;
        font-size: 0.9rem;
        max-width: 700px;
        min-width: 295px;
        min-height: 60px;
        max-height: 80px;
      }

      input[type='submit'] {
        background-color: $secondary-color;
        border: none;
        color: $bg-color;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in all;

        &:hover {
          background-color: $primary-color;
        }
      }
    }
  }

  .comment-section {
    grid-column: 2 / 3;
  }

  .delete-recipe {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    background-color: $primary-color;
    width: 50%;
    height: 20vh;
    border-radius: 24px;

    h1 {
      position: relative;
      left: 10px;
      text-align: center;
    }

    button {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 15px;
      border: none;
      background-color: #b61919;
      color: $bg-color;
      font-size: 1.2rem;
      cursor: pointer;
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

@media (max-width: 992px) {
  .single-recipe {
    .comment-form {
      form {
        textarea {
          max-width: 600px;
        }
      }
    }
  }
}
</style>
