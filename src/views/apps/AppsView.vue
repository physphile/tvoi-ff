<script setup lang="ts">
import { IrdomLayout } from '@/components';
import AsyncContent from './AsyncContent.vue';
</script>

<template>
	<IrdomLayout>
		<Suspense>
			<AsyncContent />

			<template #fallback> Загрузка... </template>
		</Suspense>
	</IrdomLayout>
</template>

<style scoped></style>
