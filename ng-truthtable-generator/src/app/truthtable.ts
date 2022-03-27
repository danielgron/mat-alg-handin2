import { TruthtableRow } from "./truthtable-row";

export class Truthtable{

  rows: TruthtableRow[] | undefined


  constructor(init?: Partial<Truthtable>) {
      Object.assign(this, init);
  }
}
