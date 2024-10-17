const { migrate } = require('../migrate/helpers/migrate.js');
const { createMapItem } = require('./helpers/itemMigratorFactory.js');
const { getUploadsRelatedIds } = require('./helpers/uploadHelpers.js');

const v3Table = 'components_common_videos';

// Tables that should not be proccessed later
const processedTables = [v3Table];

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrateTable({
    v4Table: 'components_common_videos',
    mapFields: ['id', 'title', 'description'],
    uploadFields: ['video', 'video_preview'],
  });
  await migrateTable({
    v4Table: 'components_common_video_items',
    mapFields: ['id', 'externalUrl'],
    uploadFields: ['cover'],
  });
}

async function migrateTable({ v4Table, mapFields, uploadFields }) {
  const relatedIds = await getUploadsRelatedIds(v3Table, uploadFields);
  await migrate(
    v3Table,
    v4Table,
    createMapItem({
      isItem: (data) => relatedIds.has(data.id),
      fields: mapFields,
    })
  );
}

module.exports = {
  processedTables,
  migrateTables,
};
