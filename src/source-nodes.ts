import { SourceNodesArgs, NodeInput } from "gatsby";
import { BlobImageAssetType } from "./types/BlobImageAssetNode";
import { SourceBlobImageOptions } from "./types/SourceBlobImageOptions";
import { getStorageClient, isImage } from "./util";

export const sourceNodes = async (
  gatsbyApi: SourceNodesArgs,
  {
    storageAccountName,
    storageAccountKey,
    containerName,
  }: SourceBlobImageOptions
) => {
  const { createNodeId, actions } = gatsbyApi;
  const { createNode } = actions;
  const blobServiceClient = getStorageClient(
    storageAccountName!,
    storageAccountKey!
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    if (!isImage(blob)) continue;

    const url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`;

    let md5: Uint8Array = blob.properties.contentMD5 ?? new Uint8Array([]);
    if (md5.length === 0) continue;
    const id = [...md5].map((i) => i.toString(16)).join("");

    const nodeInput: NodeInput = {
      id: createNodeId(id),
      ETag: blob.properties.etag,
      parent: null,
      internal: {
        type: BlobImageAssetType,
        mediaType: blob.properties.contentType,
        content: url,
        contentDigest: id,
      },
      blobProperties: blob.properties,
      blobUrl: url,
    };

    createNode(nodeInput);
  }
};
