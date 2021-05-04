<template>
  <button class="px-3 py-2 text-subtitle-2 rounded-xl">
    <slot></slot>
  </button>
</template>

<script>
/*
**
* Search 페이지에 필터 버튼에 사용
*/
export default {
  name: "btn-1"
}
</script>

<style scoped lang="scss">
button {
  border: 1px solid #cccccc;

  &:hover {
    border: 1px solid black;
  }
}
</style>
