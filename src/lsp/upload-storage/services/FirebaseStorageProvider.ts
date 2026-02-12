import type { StorageProvider } from "../types/storage.types";

export class FirebaseStorageProvider implements StorageProvider {
  async upload(file: File): Promise<string> {
    console.log("Uploading to Firebase:", file.name);
    return Promise.resolve(`https://firebase.storage/${file.name}`);
  }
}
