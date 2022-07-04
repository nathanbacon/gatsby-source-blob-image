import { CreateNodeArgs } from "gatsby";
import { createRemoteFileNode, FileSystemNode } from "gatsby-source-filesystem";
import { BlobImageAssetType } from "./types/BlobImageAssetNode";

export async function onCreateNode({
  node,
  actions,
  createNodeId,
  getCache,
}: CreateNodeArgs) {
  if (node.internal.type !== BlobImageAssetType) return;
  const { createNodeField, createNode } = actions;
  const fileNode: FileSystemNode = await createRemoteFileNode({
    url: node.blobUrl as string,
    parentNodeId: node.id,
    createNode,
    createNodeId,
    getCache,
  });

  if (fileNode) {
    createNodeField({ node, name: "localFile", value: fileNode.id });
  }
}
