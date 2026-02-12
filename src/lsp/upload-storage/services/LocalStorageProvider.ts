import type { StorageProvider } from "../types/storage.types";

export class LocalStorageProvider implements StorageProvider {
  async upload(file: File): Promise<string> {
    console.log('Saving locally:', file.name);
    return Promise.resolve(`/uploads/${file.name}`);
  }
}