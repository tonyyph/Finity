import type { STORAGE_KEY } from './storage.keys';

export type StorageKeyType = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY];
