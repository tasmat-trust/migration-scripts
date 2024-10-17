const { migrateItem } = require('../../migrate/helpers/migrateFields.js');

function createMapItem({ isItem, fields }) {
  return (data) => {
    if (!isItem(data)) {
      return undefined;
    }
    const mappedData = mapFields(data, fields);
    return migrateItem(mappedData);
  };
}

function mapFields(data, fields) {
  const entries = Object.entries(data);
  const filteredEntries = entries.filter(([key]) => fields.includes(key));
  return Object.fromEntries(filteredEntries);
}

module.exports = {
  createMapItem,
};
