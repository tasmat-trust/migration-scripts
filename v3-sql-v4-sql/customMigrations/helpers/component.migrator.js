const { migrate } = require('../../migrate/helpers/migrate.js');
const { processRelation, migrateRelations } = require('../../migrate/helpers/relationHelpers.js');

async function migrateComponent({ v3Table, v4Table, mapItem, uid, relations }) {
  await migrate(v3Table, v4Table, mapItem);
  if (relations) {
    await migrateComponentRelations(v3Table, v4Table, uid, relations);
  }
}

async function migrateComponentRelations(v3Table, v4Table, uid, relations) {
  const processedRelations = [];
  for (const [key, value] of Object.entries(relations)) {
    processRelation(
      {
        key,
        value,
        collectionName: v4Table,
        uid,
        isComponent: true,
      },
      processedRelations
    );
  }
  await migrateRelations([v3Table], processedRelations);
}

module.exports = {
  migrateComponent,
};
