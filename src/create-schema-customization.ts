export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type BlobImageAsset implements Node {
      localFile: File @link(from: "fields.localFile")
    }
  `);
};
