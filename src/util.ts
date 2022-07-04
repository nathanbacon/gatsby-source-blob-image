import {
  StorageSharedKeyCredential,
  BlobServiceClient,
} from "@azure/storage-blob";
import { BlobItem } from "@azure/storage-blob";

export const isImage = (blob: BlobItem) => {
  return blob.properties.contentType?.startsWith("image");
};

export const getStorageClient = (
  storageAccountName: string,
  storageAccountKey: string
) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    storageAccountName,
    storageAccountKey
  );

  const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  return blobServiceClient;
};
