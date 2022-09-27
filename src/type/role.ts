// 角色接口
export interface IRole {
  role: number; // 角色id
  roleName: string; // 角色名称
}
// 有权限的角色接口
export interface IRoleList {
  roleName: string;
  roleId: number;
  authority: [];
}
// 展示角色数据
export class RoleData {
  roleList: IRoleList[] = [];
}
