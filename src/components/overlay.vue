<template>
	<div class="overlay" @click="$emit('click')"></div>
</template>

<script>
export default {
	name: 'overlay',
}
</script>

<style scoped lang="scss">
.overlay {
	position: fixed;
	background: transparent;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	z-index: 5;
}
</style>
