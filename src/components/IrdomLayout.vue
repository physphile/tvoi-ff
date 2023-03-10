<script setup lang="ts">
import IrdomToolbar from './IrdomToolbar/IrdomToolbar.vue';
import { ToolbarAction, ToolbarMenuItem } from './IrdomToolbar/types';

defineProps<{
	toolbarActions?: ToolbarAction[];
	toolbarMenu?: ToolbarMenuItem[];
	backable?: boolean;
	title?: string;
}>();
</script>

<template>
	<IrdomToolbar :actions="toolbarActions" :menu-items="toolbarMenu" :backable="backable" :title="title">
		<slot name="toolbar" />
	</IrdomToolbar>

	<slot name="outer" />

	<main class="scroll" v-bind="$props">
		<div class="container main">
			<slot />
		</div>
	</main>
</template>

<style scoped></style>
