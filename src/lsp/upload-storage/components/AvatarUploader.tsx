// AvatarUploader.tsx
import type { StorageProvider } from "../types/storage.types";

interface AvatarUploaderProps {
  storage: StorageProvider;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({ storage }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const url = await storage.upload(file);
    console.log("Uploaded to:", url);
  };

  return <input type="file" onChange={handleUpload} />;
};
