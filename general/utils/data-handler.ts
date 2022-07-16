export class FilterOptions {
  dateField?: string;
  entityFields: string[];
  fields?: string;
  filter?: string;
  limit?: number;
  page?: number;
  searchString?: string;
  order?: "DESC" | "ASC";
  whereClause?: string;

  constructor() {
    if(this.filter) {
      this.whereClause = JSON.parse(this.filter)
    }
  }
}
