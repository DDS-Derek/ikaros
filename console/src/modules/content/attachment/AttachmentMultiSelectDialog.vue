<script setup lang="ts">
import { Attachment } from '@runikaros/api-client';
import { computed, ref, onMounted } from 'vue';
import { apiClient } from '@/utils/api-client';
import { base64Encode, formatFileSize } from '@/utils/string-util';
import AttachmentFragmentUploadDrawer from './AttachmentFragmentUploadDrawer.vue';
import AttachmentDirectoryTreeSelect from '@/components/modules/content/attachment/AttachmentDirectoryTreeSelect.vue';
import moment from 'moment';
import { isImage, isVideo, isVoice } from '@/utils/file';

import {
	Upload,
	Search,
	Folder,
	Document,
	Picture,
	Headset,
	Film,
} from '@element-plus/icons-vue';
import {
	ElRow,
	ElCol,
	ElInput,
	ElPagination,
	ElButton,
	ElIcon,
	ElTable,
	ElTableColumn,
	ElDialog,
	ElFormItem,
} from 'element-plus';

const props = withDefaults(
	defineProps<{
		visible: boolean;
	}>(),
	{
		visible: false,
	}
);

const emit = defineEmits<{
	// eslint-disable-next-line no-unused-vars
	(event: 'update:visible', visible: boolean): void;
	// eslint-disable-next-line no-unused-vars
	(event: 'close'): void;
	// eslint-disable-next-line no-unused-vars
	(event: 'closeWithAttachments', attachments: Attachment[]): void;
}>();

const dialogVisible = computed({
	get() {
		return props.visible;
	},
	set(value) {
		emit('update:visible', value);
	},
});

const onClose = () => {
	emit('close');
};

const attachmentCondition = ref({
	page: 1,
	size: 10,
	total: 10,
	parentId: undefined,
	name: '',
	type: 'File',
});

const attachments = ref<Attachment[]>([]);
const fetchAttachments = async () => {
	const { data } = await apiClient.attachment.listAttachmentsByCondition({
		page: attachmentCondition.value.page,
		size: attachmentCondition.value.size,
		name: base64Encode(attachmentCondition.value.name),
		parentId: attachmentCondition.value.parentId as any as string,
		type: attachmentCondition.value.type as 'File' | 'Directory',
	});
	attachments.value = data.items;
	attachmentCondition.value.page = data.page;
	attachmentCondition.value.size = data.size;
	attachmentCondition.value.total = data.total;
};

const onCurrentPageChange = (val: number) => {
	attachmentCondition.value.page = val;
	fetchAttachments();
};

const onSizeChange = (val: number) => {
	attachmentCondition.value.size = val;
	fetchAttachments();
};

const attachmentUploadDrawerVisible = ref(false);
const onFileUploadDrawerClose = () => {
	fetchAttachments();
};

const dateFormat = (row, column) => {
	var date = row[column.property];

	if (date == undefined) {
		return '';
	}

	return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const selectionAttachments = ref<Attachment[]>([]);

const onSelectionChange = (selections) => {
	// console.log('selections', selections);
	selectionAttachments.value = selections;
};

const onConfirm = () => {
	emit('closeWithAttachments', selectionAttachments.value as Attachment[]);
	dialogVisible.value = false;
};

const onParentDirSelected = async (val) => {
	console.log('val', val);
	if (!val || val === '') {
		val = 0;
		attachmentCondition.value.parentId = undefined;
	}
	await fetchAttachments();
};

onMounted(fetchAttachments);
</script>

<template>
	<AttachmentFragmentUploadDrawer
		v-model:visible="attachmentUploadDrawerVisible"
		v-model:parentId="attachmentCondition.parentId"
		@fileUploadDrawerCloes="onFileUploadDrawerClose"
	/>

	<el-dialog
		v-model="dialogVisible"
		title="附件选择器"
		width="85%"
		@close="onClose"
	>
		<el-row>
			<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
				<el-row>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<el-button plain @click="attachmentUploadDrawerVisible = true">
							<el-icon>
								<Upload />
							</el-icon>
							上传附件
						</el-button>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<el-form-item label="父目录">
							<AttachmentDirectoryTreeSelect
								v-model:target-dirid="attachmentCondition.parentId"
								@change="onParentDirSelected"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
				<el-input
					v-model="attachmentCondition.name"
					placeholder="搜索附件，模糊匹配，回车搜查"
					clearable
					@change="fetchAttachments"
				>
					<template #append>
						<el-button :icon="Search" @click="fetchAttachments" />
					</template>
				</el-input>
			</el-col>
		</el-row>

		<br />

		<el-row v-if="attachmentCondition.total > 10">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-pagination
					v-model:page-size="attachmentCondition.size"
					v-model:current-page="attachmentCondition.page"
					background
					:total="attachmentCondition.total"
					:pager-count="5"
					layout="total, sizes, prev, pager, next, jumper"
					@current-change="onCurrentPageChange"
					@size-change="onSizeChange"
				/>
			</el-col>
		</el-row>

		<br />
		<el-row>
			<el-col :span="24">
				<el-table
					:data="attachments"
					style="width: 100%"
					row-key="id"
					@selection-change="onSelectionChange"
				>
					<el-table-column type="selection" width="60" />
					<!-- <el-table-column prop="id" label="ID" width="60" /> -->
					<el-table-column prop="name" label="名称" show-overflow-tooltip>
						<template #default="scoped">
							<el-icon
								size="25"
								style="position: relative; top: 7px; margin: 0 5px 0 0px"
							>
								<Folder v-if="'Directory' === scoped.row.type" />
								<span v-else>
									<Picture v-if="isImage(scoped.row.name)" />
									<Headset v-else-if="isVoice(scoped.row.name)" />
									<Film v-else-if="isVideo(scoped.row.name)" />
									<Document v-else />
								</span>
							</el-icon>
							<!-- &nbsp;&nbsp; -->
							<span>
								{{ scoped.row.name }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="updateTime"
						label="更新时间"
						width="160"
						:formatter="dateFormat"
					/>
					<el-table-column prop="size" label="大小" width="130">
						<template #default="scoped">
							<span v-if="scoped.row.type === 'File'">
								{{ formatFileSize(scoped.row.size) }}
							</span>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>

		<template #footer>
			<span class="dialog-footer">
				<el-button plain type="info" @click="dialogVisible = false">
					返回
				</el-button>
				<el-button plain @click="onConfirm"> 确认 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<style lang="scss" scoped></style>