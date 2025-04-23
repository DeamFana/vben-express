<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElButton, ElMessage } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getUsers } from '#/api/core/franztestApi';

// import DocButton from '../doc-button.vue';

const res = ref([]);

interface RowType {
  id: number;
  name: string;
  email: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'email' },
  ],
  data: res.value,
  pagerConfig: {
    enabled: false,
  },
  sortConfig: {
    multiple: true,
  },
};

const gridEvents: VxeGridListeners<RowType> = {
  cellClick: ({ row }) => {
    ElMessage.info(`cell-click: ${row.name}`);
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridEvents, gridOptions });

const showBorder = gridApi.useStore((state) => state.gridOptions?.border);
const showStripe = gridApi.useStore((state) => state.gridOptions?.stripe);

onMounted(async () => {
  try {
    const response = await getUsers();
    response.forEach((item: any) => res.value.push(item));
  } catch (error) {
    console.error('请求失败:', error);
  } finally {
    // loading.value = false;
  }
});

function changeBorder() {
  gridApi.setGridOptions({
    border: !showBorder.value,
  });
}

function changeStripe() {
  gridApi.setGridOptions({
    stripe: !showStripe.value,
  });
}

function changeLoading() {
  gridApi.setLoading(true);
  setTimeout(() => {
    gridApi.setLoading(false);
  }, 2000);
}
</script>

<template>
  <Page
    description="表格组件常用于快速开发数据展示与交互界面，示例数据为静态数据。该组件是对vxe-table进行简单的二次封装，大部分属性与方法与vxe-table保持一致。"
    title="表格基础示例"
  >
    <template #extra>
      <DocButton path="/components/common-ui/vben-vxe-table" />
    </template>
    <Grid table-title="基础列表" table-title-help="提示">
      <!-- <template #toolbar-actions>
        <Button class="mr-2" type="primary">左侧插槽</Button>
      </template> -->
      <template #toolbar-tools>
        <ElButton class="mr-2" type="primary" @click="changeBorder">
          {{ showBorder ? '隐藏' : '显示' }}边框
        </ElButton>
        <ElButton class="mr-2" type="primary" @click="changeLoading">
          显示loading
        </ElButton>
        <ElButton type="primary" @click="changeStripe">
          {{ showStripe ? '隐藏' : '显示' }}斑马纹
        </ElButton>
      </template>
    </Grid>
  </Page>
</template>
