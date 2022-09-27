<template>
  <div>
    <el-tree
      :data="authorityList"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="authority"
      ref="tree_ref"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script>
  import { reactive, toRefs, onMounted } from 'vue';
  import { AuthorityData } from '@/type/authority';
  import { getAuthorityList } from '@/request/api';
  import { useRoute } from 'vue-router';
  export default {
    setup() {
      onMounted(async () => {
        let res = await getAuthorityList();
        authorityData.authorityList = res.data;
      });
      const route = useRoute();
      console.log(route);

      const query = route.query;
      console.log(query);
      const authorityData = reactive(new AuthorityData(query.id, query.authority.split(',')));

      const changeAuthority = () => {
        console.log(
          authorityData.tree_ref.getCheckedKeys().sort((a, b) => {
            return a - b;
          }),
        );
        // 传给后台, 后台去进行修改
      };
      return {
        ...toRefs(authorityData),
        changeAuthority,
      };
    },
  };
</script>

<style lang="scss" scoped></style>
