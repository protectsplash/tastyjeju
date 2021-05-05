<template>
	<v-btn class="py-6 px-4 rounded-lg text-subtitle-1 font-weight-medium" @click="$emit('click')">
		<slot></slot>
	</v-btn>
</template>
<script>
/*
 **
 * Home 페이지에 호스트 되기 버튼
 */
export default {
	name: 'btn-2',
}
</script>
