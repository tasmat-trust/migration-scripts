const { migrateComponent } = require('./helpers/component.migrator.js');
const { createMapItem } = require('./helpers/itemMigrator.factory.js');

const table = {
  v3_videos: 'components_common_videos',
  v4_videos: 'components_common_videos',
  v4_video_links: 'components_common_video_links',
};

// Tables that should not be proccessed later
const processedTables = [table.v3_videos];

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrateComponent({
    v3Table: table.v3_videos,
    v4Table: table.v4_videos,
    mapItem: createMapItem({
      isItem: (data) => data.title,
      fields: ['id', 'title', 'description'],
    }),
    uid: 'common.videos',
    relations: {
      video: {
        model: 'file',
        via: 'related',
        allowedTypes: ['videos'],
        plugin: 'upload',
        required: true,
        pluginOptions: {},
      },
      video_preview: {
        model: 'file',
        via: 'related',
        allowedTypes: ['images'],
        plugin: 'upload',
        required: true,
        pluginOptions: {},
      },
    },
  });
  await migrateComponent({
    v3Table: table.v3_videos,
    v4Table: table.v4_video_links,
    mapItem: createMapItem({
      isItem: (data) => !data.title,
      fields: ['id', 'externalUrl'],
    }),
    uid: 'common.video_link',
    relations: {
      cover: {
        model: 'file',
        via: 'related',
        allowedTypes: ['images'],
        plugin: 'upload',
        required: true,
        pluginOptions: {},
      },
    },
  });
}

module.exports = {
  processedTables,
  migrateTables,
};
