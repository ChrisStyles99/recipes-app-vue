<template>
  <div class="recipes">
    <h1>All recipes</h1>
    <RecipesCard :recipes="recipes" />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import RecipesCard from '@/components/RecipesCard'

export default {
  components: {
    RecipesCard
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['recipes'])
  },
  methods: {
    ...mapActions(['allRecipes'])
  },
  created() {
    this.allRecipes();
  },
}
</script>

<style lang="scss" scoped>
  .recipes {
    min-height: 100vh;

    h1 {
      text-align: center;
    }
  }
</style>