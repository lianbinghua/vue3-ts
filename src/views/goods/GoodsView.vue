<template>
  <div>
    <el-form :inline="true" :model="queryData" class="search-form">
      <el-form-item label="商品名称">
        <el-input v-model="queryData.title" placeholder="请输入商品名称" />
      </el-form-item>

      <el-form-item label="商品详情">
        <el-input v-model="queryData.introduce" placeholder="请输入商品详情" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearchGoods()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="compDataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="商品名称" width="180" />
      <el-table-column prop="introduce" label="商品详情" />
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="queryData.total"
      :page-size="queryData.pageSize"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
    <!-- 编辑用户的弹出窗-->
    <el-dialog v-model="editShow" title="编辑用户信息">
      <el-form :model="editUser">
        <el-form-item label="用户昵称" label-width="120px">
          <el-input v-model="editUser.nickName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="用户角色" label-width="120px">
          <el-select multiple v-model="editUser.role" class="m-2" size="large" placeholder="请选择角色">
            <el-option
              v-for="item in role_with_auth_list"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editShow = false">取消</el-button>
          <el-button type="primary" @click="ensureEditUser">修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs, onMounted, computed, watch } from 'vue';
  import { GoodsData, IGoods } from '@/type/goods';
  import { getGoodsList } from '@/request/api';
  import { reactify } from '@vueuse/core';
  export default {
    setup() {
      const goodsData = reactive(new GoodsData());
      const getGoodsData = async () => {
        const res = await getGoodsList();
        goodsData.goodList = res.data;
        goodsData.queryData.total = res.data.length;
      };
      onMounted(() => {
        getGoodsData();
      });

      const onSearchGoods = () => {
        let queryRes: IGoods[] = [];
        const { title, introduce } = goodsData.queryData;
        if (title && !introduce) {
          queryRes = goodsData.goodList.filter((value: IGoods) => value.title.indexOf(title) !== -1);
        } else if (introduce && !title) {
          queryRes = goodsData.goodList.filter((value: IGoods) => value.introduce.indexOf(introduce) !== -1);
        } else if (title && introduce) {
          queryRes = goodsData.goodList.filter(
            (value: IGoods) => value.title.indexOf(title) !== -1 && value.introduce.indexOf(introduce) !== -1,
          );
        } else {
          queryRes = goodsData.goodList;
        }
        goodsData.goodList = queryRes;
        goodsData.queryData.total = queryRes.length;
      };
      const compDataList = reactive({
        comList: computed(() => {
          const { pageNo, pageSize } = goodsData.queryData;
          return goodsData.goodList.slice((pageNo - 1) * pageSize, pageNo * pageSize);
        }),
      });

      const currentChange = (pageNo: number) => {
        goodsData.queryData.pageNo = pageNo;
      };
      const sizeChange = (pageSize: number) => {
        goodsData.queryData.pageSize = pageSize;
      };
      watch([() => goodsData.queryData.title, () => goodsData.queryData.introduce], () => {
        const { title, introduce } = goodsData.queryData;
        if (!title && !introduce) {
          getGoodsData();
        }
      });
      return {
        ...toRefs(goodsData),
        compDataList,
        onSearchGoods,
        currentChange,
        sizeChange,
      };
    },
  };
</script>

<style lang="scss" scoped></style>
