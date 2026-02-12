import type { StorageProvider } from "../types/storage.types";

export class S3StorageProvider implements StorageProvider {
  async upload(file: File): Promise<string> {
    console.log("Uploading to S3:", file.name);
    return Promise.resolve(`https://s3.amazonaws.com/bucket/${file.name}`);
  }
}
