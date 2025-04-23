import { requestClient } from '#/api/request_test';

/**
 * 获取用户所有菜单
 */
export async function getUsers() {
  return await requestClient.get<any>('/users');
}

/**
 * 更新用户
 */
export async function modifyUsers(id: number) {
  return await requestClient.put<any>('/users/', id);
}
