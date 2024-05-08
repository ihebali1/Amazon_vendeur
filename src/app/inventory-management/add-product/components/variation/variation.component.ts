import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "vex-variation",
  templateUrl: "./variation.component.html",
  styleUrls: ["./variation.component.scss"],
})
export class VariationComponent implements OnInit {
  @Output() productListChanged: EventEmitter<any> = new EventEmitter();
  @Output() variationThemeChanged: EventEmitter<any> = new EventEmitter();
  addOrUpdateTextButton = "إضافة أشكال المنتجات";
  isParent = false;
  @Input() childCategory: any;
  selectedVariationTheme: any;
  rowSample = { variationPrice: 0, variationQuantity: 0, condition: "NEW" };
  productList = [];
  variations = [];

  productVariations = [{}];
  tableColumns = [
    {
      columnDef: "productId",
      header: "معرف المنتج",
      cell: (element: any) => `${element.productId}`,
    },
    {
      columnDef: "productIdType",
      header: "نوع المعرف",
      cell: (element: any) => `${element.productIdType}`,
    },
    {
      columnDef: "variationPrice",
      header: "السعر",
      cell: (element: any) => `${element.variationPrice}`,
    },
    {
      columnDef: "variationQuantity",
      header: "الكمية",
      cell: (element: any) => `${element.variationQuantity}`,
    },
    {
      columnDef: "condition",
      header: "الحالة",
      cell: (element: any) => `${element.condition}`,
    },
  ];

  displayedColumns = this.tableColumns.map((c) => c.columnDef);

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onChangeValue(event) {
    this.tableColumns = [
      {
        columnDef: "productId",
        header: "معرف المنتج",
        cell: (element: any) => `${element.productId}`,
      },
      {
        columnDef: "productIdType",
        header: "نوع المعرف",
        cell: (element: any) => `${element.productIdType}`,
      },
      {
        columnDef: "variationPrice",
        header: "السعر",
        cell: (element: any) => `${element.variationPrice}`,
      },
      {
        columnDef: "variationQuantity",
        header: "الكمية",
        cell: (element: any) => `${element.variationQuantity}`,
      },
      {
        columnDef: "condition",
        header: "الحالة",
        cell: (element: any) => `${element.condition}`,
      },
    ];

    this.productList = [];
    this.productListChanged.emit(this.productList);
    this.variationThemeChanged.emit(this.selectedVariationTheme);
    let row = [];
    this.productVariations = [];
    this.selectedVariationTheme.attributes.forEach((attribute) => {
      let subRow = {};
      (subRow["value"] = ""), (subRow["attribute"] = attribute);
      row.push(subRow);
      this.tableColumns.push({
        columnDef: attribute.key,
        header: attribute.arKey,
        cell: (element: any) => `${element[attribute.key]}`,
      });
    });
    this.variations = [];
    this.variations.push(row);
    console.log(this.variations);
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    this.ref.detectChanges();
  }

  onInputChange(searchValue: string): void {
    console.log(this.productList);
    this.productListChanged.emit(this.productList);
    this.variationThemeChanged.emit(this.selectedVariationTheme);
  }

  onSelectChange(searchValue: string): void {
    console.log(this.productList);
    this.productListChanged.emit(this.productList);
    this.variationThemeChanged.emit(this.selectedVariationTheme);
  }

  increaseProductCount() {
    let row = [];

    this.selectedVariationTheme.attributes.forEach((attribute) => {
      let subRow = {};
      (subRow["value"] = ""), (subRow["attribute"] = attribute);
      row.push(subRow);
    });
    this.variations.push(row);
    console.log(this.variations);
  }

  decreaseProductCount(index) {
    this.variations.splice(index, 1);
    if (index == 0) {
      this.productList = [];
    }
    console.log(this.variations);
    this.productListChanged.emit(this.productList);
  }

  addVariations() {
    this.addOrUpdateTextButton = "تحديث أشكال المنتجات";
    this.productList = [];
    let variations = this.variations;
    console.log(this.variations);
    for (let pv of variations) {
      console.log(pv);
      pv["productId"] = "";
      pv["productIdType"] = "";
      pv["variationPrice"] = 0;
      pv["variationQuantity"] = 0;
      pv["condition"] = "NEW";
      this.productList.push(pv);
    }
    this.productList.pop();
    this.productListChanged.emit(this.productList);
    console.log(this.productList);
  }
}
