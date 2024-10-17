const { migrate } = require('../migrate/helpers/migrate.js');
const { createMapItem } = require('./helpers/itemMigratorFactory.js');

const v3Table = 'components_visits_preparations';

// Tables that should not be proccessed later
const processedTables = [v3Table];

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate(
    v3Table,
    'components_visits_preparations',
    createMapItem({
      isItem: (data) => !data.description,
      fields: ['id', 'title'],
    })
  );
  await migrate(
    v3Table,
    'components_visits_preparation_items',
    createMapItem({
      isItem: (data) => data.description,
      fields: ['id', 'title', 'description', 'url'],
    })
  );
}

module.exports = {
  processedTables,
  migrateTables,
};
