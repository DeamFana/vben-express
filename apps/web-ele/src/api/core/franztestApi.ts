import { requestClient } from '#/api/request_test';

/**
 * 获取用户所有菜单
 */
export async function getUsers() {
  return await requestClient.get<any>('/users');
}
