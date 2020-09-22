<template>
  <div class="carousel">
    <slot></slot>

    <button @click="next" class="next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chevron-right"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#fa7d09"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </button>
    <button @click="prev" class="previous">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chevron-left"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#fa7d09"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    },
  },
};
</script>

<style lang="scss">
.carousel {
  position: relative;
  overflow: hidden;

  button {
    position: absolute;
    height: 40px;
    width: 50px;
    top: calc(50% - 20px);
    transform: translateY(-50%);
    background-color: $third-color;
    border: none;
    color: $text-color;
    display: flex;

    &:focus,
    &:hover {
      outline: none;
      cursor: pointer;
    }
  }

  .next {
    right: 0;
  }

  .prev {
    left: 0;
  }
}
</style>
