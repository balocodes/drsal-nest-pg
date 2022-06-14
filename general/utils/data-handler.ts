export class FilterOptions {
  dateField?: string;
  entityFields: string[];
  fields?: string;
  filter?: string;
  limit?: number;
  page?: number;
  searchString?: string;
  order?: "DESC" | "ASC";
}
