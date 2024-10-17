const { dbV3 } = require('../../config/database');

async function getUploadsRelatedIds(relatedType, fields) {
  const components = await dbV3('upload_file_morph')
    .where('related_type', relatedType)
    .whereIn('field', fields)
    .groupBy('related_id')
    .select('related_id');
  const relatedIds = components.map((component) => component.related_id);
  return new Set(relatedIds);
}

module.exports = {
  getUploadsRelatedIds,
};
