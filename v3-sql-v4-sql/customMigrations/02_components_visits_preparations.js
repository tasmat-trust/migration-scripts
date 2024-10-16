const { migrateComponent } = require('./helpers/component.migrator.js');
const { createMapItem } = require('./helpers/itemMigrator.factory.js');

const table = {
  v3_preparations: 'components_visits_preparations',
  v4_preparations: 'components_visits_preparations',
  v4_preparation_details: 'components_visits_preparation_details',
};

// Tables that should not be proccessed later
const processedTables = [table.v3_preparations];

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrateComponent({
    v3Table: table.v3_preparations,
    v4Table: table.v4_preparation_details,
    mapItem: createMapItem({
      isItem: (data) => data.description,
      fields: ['id', 'title', 'description', 'url'],
    }),
    uid: 'visits.preparation-detail',
    relations: {
      image: {
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
    v3Table: table.v3_preparations,
    v4Table: table.v4_preparations,
    mapItem: createMapItem({
      isItem: (data) => !data.description,
      fields: ['id', 'title'],
    }),
    uid: 'visits.preparations',
  });
}

module.exports = {
  processedTables,
  migrateTables,
};
