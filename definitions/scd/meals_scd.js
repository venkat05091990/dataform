const scd = require("dataform-scd");

/**
 * Create an SCD table on top of the table defined in source_data.sqlx.
 */
const { updates, view } = scd("source_data_meals_scd", {
  // A unique identifier for rows in the table.
  uniqueKey: "meal_id",
  // A field that stores a timestamp or date of when the row was last changed.
  timestamp: "date",
  // The source table to build slowly changing dimensions from.
  source: {
    schema: "raw",
    name: "meals",
  },
  // Documentation of table columns
  columns: {meal_id: "Meal ID", calories: "KCals", updated_at: "Timestamp for updates"},
  // Configuration parameters to apply to the incremental table that will be created.
  incrementalConfig: {
    bigquery: {
      partitionBy: "date",
    },
  },
});