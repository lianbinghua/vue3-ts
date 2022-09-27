<template>
  <div>
    <el-form :inline="true" :model="queryData" class="search-form">
      <el-form-item label="用户昵称">
        <el-input v-model="queryData.nickName" placeholder="请输入用户昵称" />
      </el-form-item>

      <el-form-item label="用户角色">
        <el-select v-model="queryData.role" class="m-2" size="large">
          <el-option :key="0" label="全部" :value="0" />
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearchUser()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="nickName" label="用户昵称" width="180" />
      <el-table-column prop="role" label="用户角色">
        <template #default="scope">
          <el-button link type="primary" size="small" v-for="item in scope.row.role" :key="item.role">
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEditUser(scope.row)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户的弹出窗-->
    <el-dialog v-model="editShow" title="编辑用户信息">
      <el-form :model="editUser">
        <el-form-item label="用户昵称" label-width="120px">
          <el-input v-model="editUser.nickName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="用户角色" label-width="120px">
          <el-select multiple v-model="editUser.role" class="m-2" size="large" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
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
  import { reactive, toRefs, onMounted, watch } from 'vue';
  import { UserData, IUser, IUserEdit } from '@/type/user';
  import { getUserList, getRoleList } from '@/request/api';
  import { IRole } from '@/type/role';
  import { makeDestructurable } from '@vueuse/core';
  export default {
    setup() {
      const userData = reactive(new UserData());
      onMounted(() => {
        getUserData();
        getRoleData();
      });

      const getUserData = async () => {
        const res = await getUserList();
        userData.userList = res.data;
      };
      const getRoleData = async () => {
        const res = await getRoleList();
        userData.roleList = res.data;
      };

      // 点击查询用户按钮时触发
      const onSearchUser = () => {
        let queryRes: IUser[] = []; // 接受查询用户的结果
        const { nickName, role } = userData.queryData;
        if (nickName) {
          queryRes = userData.userList.filter((value: IUser) => value.nickName.indexOf(nickName) !== -1);
        } else if (role) {
          queryRes = nickName ? queryRes : userData.userList;
          queryRes = queryRes.filter((value) => value.role.find((item) => item.role === role));
        } else {
          queryRes = userData.userList;
        }
        userData.userList = queryRes;
      };
      // watch 监听
      watch([() => userData.queryData.nickName, () => userData.queryData.role], () => {
        if (!userData.queryData.nickName && !userData.queryData.role) {
          getUserList();
        }
      });
      // 编辑用户弹窗
      const handleEditUser = (row: IUser) => {
        userData.editShow = true;
        userData.editUser = {
          id: row.id,
          nickName: row.nickName,
          role: row.role.map((value) => value.role),
          userName: '',
        };
      };

      const ensureEditUser = () => {
        userData.editShow = false;
        let obj: any = userData.userList.find((value: IUser) => value.id === userData.editUser.id);
        obj.nickName = userData.editUser.nickName;
        obj.role.splice(0, obj.role.length); // 清除角色
        for (let item of userData.roleList) {
          if (userData.editUser.role.find((value: any) => value === item.roleId)) {
            obj.role.push({
              role: item.roleId, // 角色id
              roleName: item.roleName, // 角色名称
            });
          }
        }
      };
      return {
        ...toRefs(userData),
        ensureEditUser,
        handleEditUser,
        onSearchUser,
      };
    },
  };
</script>

<style lang="scss" scoped></style>
