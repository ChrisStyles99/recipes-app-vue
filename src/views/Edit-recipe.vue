<template>
  <div class="edit-recipe">
    <h1>Edit the recipe</h1>
    <form @submit.prevent="updRecipe">
      <input
        type="text"
        name="title"
        placeholder="Enter the title"
        v-model="singleRecipe.title"
      />
      <input
        type="url"
        name="image"
        placeholder="Enter the image url"
        v-model="singleRecipe.image"
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients(separate with a comma)"
        v-model="singleRecipe.ingredients"
      ></textarea>
      <textarea
        name="description"
        placeholder="Recipe description"
        v-model="singleRecipe.description"
      ></textarea>
      <input type="submit" value="Edit" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user', 'singleRecipe']),
  },
  methods: {
    ...mapActions(['getRecipe', 'updateRecipe']),
    updRecipe() {

      const matchReg = this.singleRecipe.image.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/);

      if(!matchReg) {
        this.singleRecipe.image = 'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      }

      const updData = {
        title: this.singleRecipe.title,
        image: this.singleRecipe.image,
        ingredients: this.singleRecipe.ingredients,
        description: this.singleRecipe.description,
      };
      this.updateRecipe({ id: this.$route.params.id, data: updData });

      this.$router.push(`/recipe/${this.$route.params.id}`);
    },
  },
  created() {
    if (this.singleRecipe.user != this.user._id) {
      return this.$router.push('/profile');
    }
    this.getRecipe(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.edit-recipe {
  min-height: 100vh;

  h1 {
    text-align: center;
  }

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
}
</style>
