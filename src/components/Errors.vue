<template>
  <div class="error-div">
    {{msg}}
  </div>
</template>

<script>
export default {
  props: ['msg']
}
</script>

<style lang="scss" scoped>
  .error-div {
    background-color: #c54141;
    text-align: center;
    font-size: 2rem;
    color: #fff;
  }
</style>