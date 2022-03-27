import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { Truthtable } from '../truthtable';
import { TruthtableColumn } from '../truthtable-column';
import { TruthtableRow } from '../truthtable-row';

@Component({
  selector: 'app-truthtable',
  templateUrl: './truthtable.component.html',
  styleUrls: ['./truthtable.component.css'],
})
export class TruthtableComponent implements OnInit {
  constructor() {
    this.input = '';
    this.output = '';
    this.test = '';
    this.table = new Truthtable();
    this.table.rows = [];
  }

  input: string;
  output: string;
  test: string;

  table: Truthtable;

  ngOnInit(): void {}

  onTest(event: any) {
    this.test = String(this.solve(event.target.value));
  }

  onKey(event: any) {
    this.output = event.target.value;

    // clean / check inputs
    this.removeWhiteSpace(this.output);

    // Create table
    var rows: TruthtableRow[] = [];
    let unique = this.output
      .split('')
      .filter((item, i, ar) => ar.indexOf(item) === i);
    unique = unique.filter((item, i, arr) => item.match(/[a-zAZ]/));

    var totalrows = Math.floor(2 ** unique.length);

    if (totalrows > 512) {
      this.output = 'too many params!';
      return;
    }

    if (this.output.match(/[a-zA-Z]{2}/)) {
      this.output = 'Only single chars allowed - are you missing && or || ?';
      return;
    }

    if (!this.output.match(/->/)) {
      this.output = "Missing '->' thus making for a boring expression";
      return;
    }

    if (!this.output.match(/->./)) {
      this.output = "Missing right hand side.";
      return;
    }

    var currentGap = totalrows;
    var bools: boolean[] = unique.map((u) => false);
    var gaps: number[] = unique.map((u) => (currentGap /= 2) | 0);
    var currentGaps: number[] = unique.map((u, i) => gaps[i] | 0);

    var left = this.output.split('->')[0];
    var right = this.output.split('->')[1];

    for (let i = 0; i < totalrows; i++) {
      var r = new TruthtableRow();

      for (let index = 0; index < unique.length; index++) {
        var element = unique[index];

        if (currentGaps[index] == i) {
          bools[index] = !bools[index];
          currentGaps[index] = i + gaps[index];
        }

        var column = new TruthtableColumn(element, bools[index]);

        r.columns?.push(column);
      }

      var convertedLhs = this.convert(left, r);
      var reducedLhs = this.solve(convertedLhs);
      var convertedRhs = this.convert(right, r);
      var reducedRhs = this.solve(convertedRhs);

      var column = new TruthtableColumn(
        this.output,
        this.getResult(reducedLhs, reducedRhs)
      );
      var columnLhs = new TruthtableColumn('Left hand side', reducedLhs);
      //r.columns?.push(columnLhs);
      r.columns?.push(column);

      rows.push(r);
    }

    this.table = new Truthtable();
    this.table.rows = rows;
  }

  // The end result when we have the
  getResult(left: boolean, right: boolean): boolean {
    if (!left && !right) return true;

    if (!left && right) return true;

    if (left && !right) return false;

    if (left && right) return true;
    throw new Error();
  }

  // Convert from statement in letter form to true/false values from a row of the table
  convert(toConvert: string, row: TruthtableRow) {
    //Wrap the
    toConvert = toConvert.replaceAll(
      /[a-zA-Z]/gi,
      (match) => '{' + match + '}'
    );

    row.columns!.forEach((element) => {
      toConvert = toConvert.replace(
        '{' + element.name + '}',
        String(element.value)
      );
    });
    return toConvert;
  }

  // recursively reduce expression
  /*
  If we can reduce the expression to the form of p->q we are down to 4 possible outcomes.
  Therefore by solving each inner part recursively, we can get to an exit clause where we only have to evaluate
  if a statement is true or false.

  The order of operations is as follows:
  Resolve all parenthesis starting with the deepest nested first.
  Resolve &&
  Resolve || 
  Resolve true/false
  */

  solve(exprString: string): boolean {
    if (exprString == 'true' || exprString == '!false') return true;
    if (exprString == 'false' || exprString == '!true') return false;

    // paranthesis without nested parenthesises -> replace with solve()
    // Regex for parenthesis with no starting parenthesis inside and only containing letters, & | and !

    var innerParenthesis = exprString.match(/[(][a-zA-Z&|!]*[^(][^)][)]/);
    if (innerParenthesis) {
      var toResolve = innerParenthesis![0].substring(
        1,
        innerParenthesis![0].length - 1
      );
      return this.solve(
        exprString.replace(
          /[(][a-zA-Z&!|]*[^(][^)][)]/,
          String(this.solve(toResolve))
        )
      );
    }

    if (exprString.includes('&&')) {
      var split = exprString.split('&&');
      return this.solve(split[0]) && this.solve(split.slice(1).join('&&'));
    }

    if (exprString.includes('||')) {
      var split = exprString.split('||');
      return this.solve(split[0]) || this.solve(split.slice(1).join('||'));
    }

    return false;
  }

  removeWhiteSpace(str: string) {
    this.output = str.replace(/\s/g, '');
  }
}
