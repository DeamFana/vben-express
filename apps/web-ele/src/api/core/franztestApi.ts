import type { User } from '../../../../../packages/types/src/franztest-users';

import { requestClient } from '#/api/request_test';

/**
 * 获取用户所有菜单
 */
export async function getUsers() {
  return requestClient.get<User>('/users');
}
