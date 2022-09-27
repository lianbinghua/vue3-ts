export interface IGoods {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}

export interface IQueryGoods extends IGoods, IPagination {}

export class GoodsData {
  queryData: IQueryGoods = {
    userId: 0,
    id: 0,
    title: '',
    introduce: '',
    pageNo: 1,
    total: 0,
    pageSize: 5,
  };
  goodList: IGoods[] = [];
}
