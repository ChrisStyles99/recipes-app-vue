<template>
  <div class="card-template">
    <div class="recipe-card" v-for="(recipe, index) in recipes" :key="index">
      <div class="card-header">
        <img :src="recipe.image" alt="">
      </div>
      <div class="card-text">
        <h1>{{recipe.title}}</h1>
        <p v-if="recipe.user">Author: {{recipe.user.name}}</p>
      </div>
      <div class="card-footer">
        <router-link v-if="!recipe.recipeId" class="recipe-btn" :to="'/recipe/'+recipe._id">See recipe</router-link>
        <router-link v-if="recipe.recipeId" class="recipe-btn delete-btn" :to="'/recipe/'+recipe.recipeId">See recipe</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipesCard',
  props: ['recipes']
}
</script>

<style lang="scss">
  .card-template {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 40px;
    margin: 20px 40px;

    .recipe-card {
      display: grid;
      grid-template-rows: 1.5fr 1fr 60px;
      box-shadow: 2px 4px 8px 2px rgba($color: #000000, $alpha: 0.5);

      .card-header {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .card-text {
        margin: auto;
        text-align: center;
      }

      .card-footer {
        margin: auto;

        .recipe-btn {
          cursor: pointer;
          padding: 10px 15px;
          border-radius: 12px;
          border: none;
          background-color: $secondary-color;
          color: $bg-color;
          font-size: 1.2rem;
          transition: 0.3s ease-in all;
          text-decoration: none;

          &:hover {
            background-color: $primary-color;
          }
        }
      }
    }
  }

  @media (max-width: 992px) {
    .card-template {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>