import { ILoginData } from '@/type/login';
import http from './http';
export function login(data: ILoginData) {
  return http({
    url: '/login',
    method: 'POST',
    data,
  });
}

export function getGoodsList() {
  return http({
    url: '/getGoodsList',
    method: 'GET',
  });
}

export function getUserList() {
  return http({
    url: '/getUserList',
    method: 'GET',
  });
}

export function getRoleList() {
  return http({
    url: '/getRoleList',
    method: 'GET',
  });
}

export function getAuthorityList() {
  return http({
    url: '/getAuthorityList',
    method: 'GET',
  });
}
