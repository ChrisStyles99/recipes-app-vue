<template>
  <div class="comment-template">
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <h3>{{comment.title}}</h3>
      <p>{{comment.message}}</p>
      <small>Comment by: {{comment.author}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comments']
}
</script>

<style lang="scss">
  .comment {
    margin-bottom: 20px;
    box-shadow: 2px 4px 8px 2px rgba($color: #000000, $alpha: 0.5);

    h3 {
      position: relative;
      left: 10px;
      top: 10px;
    }

    p {
      position: relative;
      left: 10px;
      width: 90%;
    }

    small {
      position: relative;
      left: 10px;
      bottom: 10px;
    }
  }
</style>