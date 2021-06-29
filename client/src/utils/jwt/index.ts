const JWT_ITEM_NAME = 'mkmind_jwt_token';

const get = (): string | null => localStorage.getItem(JWT_ITEM_NAME);

const set = (token: string): void => localStorage.setItem(JWT_ITEM_NAME, token);

const remove = (): void => localStorage.removeItem(JWT_ITEM_NAME);

const has = (): boolean => !!get();

const $jwt = {
  get,
  set,
  remove,
  has
};

export default $jwt;
