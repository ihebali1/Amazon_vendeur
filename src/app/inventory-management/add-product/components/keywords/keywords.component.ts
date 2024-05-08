import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
export interface Term {
  name: string;
}

@Component({
  selector: "vex-keywords",
  templateUrl: "./keywords.component.html",
  styleUrls: ["./keywords.component.scss"],
})
export class KeywordsComponent implements OnInit {
  @Output() keywordsChanged: EventEmitter<any> = new EventEmitter();
  keywordDetails = {};
  platinumKeywords: string[] = [];

  constructor() {
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  searchTerms: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.searchTerms.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.onInputChange();
  }

  addPlat(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.platinumKeywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.onInputChange();
  }

  remove(fruit: string): void {
    const index = this.searchTerms.indexOf(fruit);

    if (index >= 0) {
      this.searchTerms.splice(index, 1);
    }
    this.onInputChange();
  }

  removeInput() {
    this.platinumKeywords.pop();
    this.onInputChange();
  }
  ngOnInit(): void {}
  onInputChange() {
    this.keywordDetails["searchTerms"] = this.searchTerms;
    this.keywordDetails["platinumKeywords"] = this.platinumKeywords;
    this.keywordsChanged.emit(this.keywordDetails);
  }
}
