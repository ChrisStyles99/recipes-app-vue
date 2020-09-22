<template>
  <footer class="foot">
    <h1>
      Copyright. 2020
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-copyright"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#f1f1f1"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9a3.5 4 0 1 0 0 6" />
      </svg>
    </h1>
  </footer>
</template>

<script>
export default {
  name: 'FooterComp',
};
</script>

<style lang="scss">
.foot {
  background-color: $secondary-color;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-content: center;

  h1 {
    color: $bg-color;
  }
}
</style>
