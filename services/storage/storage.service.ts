import { MMKV } from 'react-native-mmkv';
import uuid from 'react-native-uuid';
import type { StorageKeyType } from './types';
import { WHITE_LIST_STORAGE_KEY } from './storage.keys';

const STORAGE_NAME = 'HDB_STORAGE';

class Storage {
  encryptionKey: string = '';
  localInstance: MMKV = new MMKV({ id: STORAGE_NAME });

  init() {
    if (!this.encryptionKey) {
      this.encryptionKey = uuid.v4().toString();
    }

    this.localInstance = new MMKV({
      id: STORAGE_NAME,
      encryptionKey: this.encryptionKey,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(key: StorageKeyType, value: any) {
    const jsonString = JSON.stringify(value);
    this.localInstance.set(key, jsonString);
  }

  retrieve(key: StorageKeyType) {
    const localData = this.localInstance.getString(key);

    if (localData) {
      return JSON.parse(localData);
    }

    return undefined;
  }

  clear(key: StorageKeyType) {
    this.localInstance.delete(key);
  }

  clearLocal() {
    this.localInstance.clearAll();
  }

  clearAll() {
    const whiteList = WHITE_LIST_STORAGE_KEY.map((key) => {
      return {
        key,
        value: this.retrieve(key),
      };
    });

    this.clearLocal();

    if (whiteList?.length) {
      whiteList?.forEach((data) => {
        if (data.value) {
          this.save(data.key, data.value);
        }
      });
    }
  }

  async reset() {
    this.clearAll();
    await this.init();
  }
}

const instance = new Storage();

export { instance as Storage };
