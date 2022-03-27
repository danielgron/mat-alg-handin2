import { TruthtableColumn } from "./truthtable-column";

export class TruthtableRow{

  columns: TruthtableColumn[] | undefined

  constructor() {
    this.columns = [];
  }
}
