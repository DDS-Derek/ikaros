<script setup lang="ts">
import type { Plugin } from '@runikaros/api-client';
import { ErrorResponse } from '@uppy/core';
import { computed, ref, watch } from 'vue';
import { ElMessage, ElDrawer } from 'element-plus';
import UppyUpload from '@/components/upload/UppyUpload.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = withDefaults(
	defineProps<{
		visible: boolean;
		upgradePlugin?: Plugin;
	}>(),
	{
		visible: false,
		upgradePlugin: undefined,
	}
);

const emit = defineEmits<{
	// eslint-disable-next-line no-unused-vars
	(event: 'update:visible', visible: boolean): void;
	// eslint-disable-next-line no-unused-vars
	(event: 'update:upgradePlugin', plugin: Plugin): void;
	// eslint-disable-next-line no-unused-vars
	(event: 'close'): void;
}>();

const uploadVisible = ref(false);
const drawerVisible = ref(false);

const modalTitle = computed(() => {
	return props.upgradePlugin && props.upgradePlugin.name
		? t('module.plugin.upload_modal.titles.upgrade', {
				display_name: props.upgradePlugin.displayName
					? props.upgradePlugin.displayName
					: props.upgradePlugin.name,
		  })
		: t('module.plugin.upload_modal.titles.install');
});

const handleVisibleChange = (visible: boolean) => {
	emit('update:visible', visible);
	if (!visible) {
		emit('close');
	}
};

const endpoint = computed(() => {
	if (props.upgradePlugin && props.upgradePlugin.name) {
		return `/api/v1alpha1/plugin/upgrade/file/${props.upgradePlugin.name}`;
	}
	return '/api/v1alpha1/plugin/install/file';
});

watch(
	() => props.visible,
	(newValue) => {
		if (newValue) {
			uploadVisible.value = true;
			drawerVisible.value = props.visible;
		} else {
			const uploadVisibleTimer = setTimeout(() => {
				uploadVisible.value = false;
				drawerVisible.value = false;
				clearTimeout(uploadVisibleTimer);
			}, 200);
		}
	}
);

const handleClose = (done: () => void) => {
	done();
	handleVisibleChange(false);
};

const onUploaded = async () => {
	if (props.upgradePlugin && props.upgradePlugin.name) {
		ElMessage.success(t('module.plugin.upload_modal.message.operate.upgrade'));
		window.location.reload();
		return;
	}

	handleVisibleChange(false);
};

const onError = (file, response: ErrorResponse) => {
	const body = response.body;
	ElMessage.error(body.message);
	console.error(body);
};
</script>

<template>
	<el-drawer
		v-model="drawerVisible"
		:title="modalTitle"
		direction="ttb"
		:before-close="handleClose"
		size="80%"
	>
		<template #header>
			<div align="center">
				<h4>{{ modalTitle }}</h4>
			</div>
		</template>
		<template #default>
			<div align="center">
				<UppyUpload
					v-if="uploadVisible"
					style="width: 100%"
					:restrictions="{
						maxNumberOfFiles: 1,
						allowedFileTypes: ['.jar'],
					}"
					:endpoint="endpoint"
					auto-proceed
					@uploaded="onUploaded"
					@error="onError"
				/>
			</div>
		</template>
	</el-drawer>
</template>

<style lang="scss" scoped></style>
