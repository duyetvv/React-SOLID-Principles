import React from "react";

import { AvatarUploader } from "./components/AvatarUploader";
import { LocalStorageProvider } from "./services/LocalStorageProvider";
import { S3StorageProvider } from "./services/S3StorageProvider";

const OrchestratorUpload: React.FC = () => {
  return (
    <div>
      <AvatarUploader storage={new LocalStorageProvider()} />
      <AvatarUploader storage={new S3StorageProvider()} />
    </div>
  );
};

export default OrchestratorUpload;
