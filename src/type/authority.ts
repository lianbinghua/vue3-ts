export interface IAuthority {
  name: string;
  roleId: number;
  roleList?: IAuthority[];
  viewRole?: string;
}

export class AuthorityData {
  id: number;
  authority: number[];
  authorityList: IAuthority[] = [];
  constructor(id: number, authority: number[]) {
    this.id = id;
    this.authority = authority;
  }
  tree_ref: any;
}
