<template>
  <div>
    <el-form :inline="true" class="search-form">
      <el-form-item>
        <el-button type="primary" @click="onAddRole()">添加角色</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="roleId" label="编号" width="180" />
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="onChangeRole(scope.row)"> 修改权限 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  import { RoleData, IRoleList } from '@/type/role';
  import { getRoleList } from '@/request/api';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import 'element-plus/es/components/message/style/index';
  import { useRouter } from 'vue-router';
  export default {
    setup() {
      const roleData = reactive(new RoleData());
      const router = useRouter();
      onMounted(async () => {
        const res = await getRoleList();
        console.log(res);
        roleData.roleList = res.data;
      });

      const onAddRole = () => {
        ElMessageBox.prompt('请输入角色名称', '添加角色', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
        })
          .then(({ value }) => {
            if (value) {
              roleData.roleList.push({
                roleId: roleData.roleList.length + 1,
                authority: [],
                roleName: value,
              });
            }
            ElMessage({
              type: 'success',
              message: `${value}角色添加成功`,
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Input canceled',
            });
          });
      };

      // 修改权限
      const onChangeRole = (row: IRoleList) => {
        console.log(row);
        console.log('1');
        debugger;
        router.push({
          path: 'authority',
          query: {
            id: row.roleId,
            authority: row.authority.join(','),
          },
          // name: 'authority',
          // params: {
          //   id: row.roleId,
          //   authority: row.authority,
          // },
        });
      };
      return {
        ...toRefs(roleData),
        onAddRole,
        onChangeRole,
      };
    },
  };
</script>

<style lang="scss" scoped></style>
