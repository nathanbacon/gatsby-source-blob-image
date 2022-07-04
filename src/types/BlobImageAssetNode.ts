import { BlobProperties } from "@azure/storage-blob";

export const BlobImageAssetType = "BlobImageAsset";
export type BlobImageAssetBlobProperties = BlobProperties;

export interface BlobImageAssetNode {
  id: string;
  blobProperties: BlobImageAssetBlobProperties;
  ETag: string;
  internal: {
    type: string;
    content: string;
    contentDigest: string;
    mediaType: string;
  };
}
