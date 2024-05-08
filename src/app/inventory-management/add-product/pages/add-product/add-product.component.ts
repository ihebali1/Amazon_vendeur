import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ChildCategoryService } from "src/app/inventory-management/services/child-category.service";
import { ProductServiceService } from "src/app/inventory-management/services/product-service.service";
import { FileService } from "src/app/shared/services/file.service";
import Swal from "sweetalert2";

@Component({
  selector: "vex-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  loading = false;
  id: string;
  childCategory: any;
  isWithVatiations: boolean = false;
  productVariations: any = [];
  productVitalInfo = {
    productId: null,
    productIdType: null,
    name: null,
    brand: null,
    manufacturer: null,
    manufactureSerial: null,
    arName: null,
    customBrand: null,
  };
  productKeyword = {
    searchTerms: null,
    platinumKeywords: null,
  };
  productOfferInfo: any;
  productImages: any = [];
  variationTheme: any;
  productAttributesValues: any = [];
  offerInfo = {
    price: null,
    quantity: null,
    condition: null,
  };
  productDescription = {
    description: null,
    features: null,
    productLegal: null,
    warning: null,
  };

  images: any[] = [];
  image: any;
  imageIds: any[] = [];
  specifications: any = [];

  constructor(
    private chilCategoryService: ChildCategoryService,
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private fileService: FileService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.getChildCategory();
  }
  getChildCategory() {
    this.chilCategoryService.getChildCategory(this.id).subscribe((res) => {
      //console.log(res);
      this.childCategory = res;
    });
  }

  uploadFiles() {
    if (
      (this.productVitalInfo.productId == null ||
        this.productVitalInfo.productId.length == 0) &&
      this.isWithVatiations == false
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال معرف المنتج ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productVitalInfo.name == null ||
      this.productVitalInfo.name.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال اسم المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      (this.productVitalInfo.brand == null ||
      this.productVitalInfo.brand.length == 0) && 
      (this.productVitalInfo.customBrand == null ||
        this.productVitalInfo.customBrand.length == 0)
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال ماركة المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      (this.offerInfo.price == null || this.offerInfo.price.length == 0) &&
      this.isWithVatiations == false
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال سعر المنتج ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      (this.offerInfo.quantity == null ||
        this.offerInfo.quantity.length == 0) &&
      this.isWithVatiations == false
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال كمية المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      (this.offerInfo.condition == null ||
        this.offerInfo.condition.length == 0) &&
      this.isWithVatiations == false
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال حالة المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productVitalInfo.manufacturer == null ||
      this.productVitalInfo.manufacturer.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال الشركة المصنعة للمنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productVitalInfo.manufactureSerial == null ||
      this.productVitalInfo.manufactureSerial.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال الرقم التسلسلي لتصنيع المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productVitalInfo.arName == null ||
      this.productVitalInfo.arName.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال اسم المنتج باللغة العربية",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productVitalInfo.name == null ||
      this.productVitalInfo.name.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال اسم المنتج باللغة الإنجليزية",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productDescription.description == null ||
      this.productDescription.description.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال وصف المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productDescription.features == null ||
      this.productDescription.features.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال ميزات المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productDescription.productLegal == null ||
      this.productDescription.productLegal.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال المعلومات القانونية للمنتج الخاص بك",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productDescription.warning == null ||
      this.productDescription.warning.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال تحذيرات المنتج",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productKeyword.searchTerms == null ||
      this.productKeyword.searchTerms.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال كلمات البحث الخاصة بك",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      this.productKeyword.platinumKeywords == null ||
      this.productKeyword.platinumKeywords.length == 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال كلمات المنتج البلاتينية",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    for (let variation of this.productVariations) {
      if (
        (variation.productId == null || variation.productId.length == 0) &&
        this.isWithVatiations == true
      ) {
        return Swal.fire({
          icon: "error",
          title: "الرجاء إدخال معرف المنتج للاختلافات",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (
        variation.productIdType == null ||
        variation.productIdType.length == 0
      ) {
        return Swal.fire({
          icon: "error",
          title: "الرجاء إدخال نوع المنتج الخاص بالاختلافات",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (variation.variationPrice == 0) {
        return Swal.fire({
          icon: "error",
          title: "الرجاء إدخال سعر المنتج الخاص بالاختلاف",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (variation.condition == null || variation.condition.length == 0) {
        return Swal.fire({
          icon: "error",
          title: "الرجاء إدخال حالة المنتج الخاص بالاختلاف",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    if (this.images.length == 0) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال الصور",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (this.image == null) {
      return Swal.fire({
        icon: "error",
        title: "الرجاء إدخال الصورة الأساسية",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    this.loading = true;
    this.fileService
      .uploadMultipleFile(this.images)
      .subscribe(async (response: any) => {
        this.loading = false;

        this.imageIds = [];
        if (response && response.length) {
          await response.forEach((res) => {
            this.imageIds.push(res?.id);
          });
        }

        // console.log(this.imageIds);
        this.loading = true;
        this.fileService.uploadFile(this.image).subscribe((res: any) => {
          this.loading = false;
          this.submitProduct(this.imageIds, res.id);
        });
      });
  }

  ProductListChangedHandler(productList: any) {
    this.productVariations = productList;
    if (this.productVariations.length > 0) this.isWithVatiations = true;
    else this.isWithVatiations = false;
    console.log(this.productVariations);
    console.log(this.isWithVatiations);
  }
  specListChangedHandler(specifications: any) {
    this.specifications = specifications;
  }
  OfferChangedHandler(offer: any) {
    this.offerInfo = offer;
  }
  variationThemeChangedHandler(variationTheme: any) {
    this.variationTheme = variationTheme;
    console.log(this.variationTheme);
  }

  vitalInfoChangedHandler(vitalInfo: any) {
    this.productVitalInfo = vitalInfo;
    console.log(this.productVitalInfo);
  }

  descriptionChangedHandler(description: any) {
    this.productDescription = description;
    console.log(this.productDescription);
  }
  keywordsChangedHandler(keyword: any) {
    this.productKeyword = keyword;
    console.log(this.productKeyword);
  }

  imagesChangedHandler(images: any) {
    this.images = images;
  }

  mainImageChangedHandler(image: any) {
    this.image = image;
  }

  attributeValuesChangedHandler(attributeValues: any) {
    this.productAttributesValues = attributeValues;
    // console.log(this.productAttributesValues)
  }

  submitProduct(images, mainImage) {
    let values = [];
    let choices = [];
    let variations = [];
    this.productVariations.forEach((variation) => {
      let v = {};
      v["variationPrice"] = variation["variationPrice"];
      v["variationQuantity"] = variation["variationQuantity"];
      v["variationCondition"] = variation["condition"];
      v["productId"] = variation["productId"];
      v["productIdType"] = variation["productIdType"];
      let attributeValues = [];
      let attributechoices = [];
      variation.forEach((element) => {
        if (element.attribute.type == "MULTIPLE_CHOICES") {
          attributechoices.push(element.value.id);
        }
        if (element.attribute.type == "SINGLE_CHOICE") {
          attributeValues.push({
            attribute: element.attribute.id,
            value: element.value,
          });
        }
      });
      if (attributeValues.length > 0) v["attributeValues"] = attributeValues;

      if (attributechoices.length > 0) v["attributeChoices"] = attributechoices;
      variations.push(v);
    });
    this.productAttributesValues.forEach((attributeValue) => {
      if (attributeValue.attribute.type == "MULTIPLE_CHOICES") {
        choices.push(attributeValue.value);
      }
      if (attributeValue.attribute.type == "SINGLE_CHOICE") {
        values.push({
          attribute: attributeValue.attribute.id,
          value: attributeValue.value,
        });
      }
    });
    //console.log('values: ',values);
    //console.log('choices: ',choices);
    //console.log(variations);
    if (this.isWithVatiations) {
      delete this.productVitalInfo.productId;
      delete this.productVitalInfo.productIdType;
      if (
        this.productVitalInfo.name == null ||
        this.productVitalInfo.name.length == 0
      ) {
        return Swal.fire({
          icon: "error",
          title: "please enter product name",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      const product = {
        name: this.productVitalInfo.name,
        manufacturer: this.productVitalInfo.manufacturer,
        manufactureSerial: this.productVitalInfo.manufactureSerial,
        arName: this.productVitalInfo.arName,
        childCategory: this.id,
        isWithVariations: this.isWithVatiations,
        variationTheme: this.variationTheme?.id,
        attributeValues: values,
        attributeChoices: choices,
        variations: variations,
        images: images,
        primaryImage: mainImage,
        searchTerms: this.productKeyword.searchTerms,
        keyWords: this.productKeyword.platinumKeywords,
        features: this.productDescription.features,
        description: this.productDescription.description,
        legalDisclaimer: this.productDescription.productLegal,
        warnings: this.productDescription.warning,
      };
      product.attributeValues = product.attributeValues.filter(attributeValue=>attributeValue.value != "");
      product.attributeChoices = product.attributeChoices.filter(attributeChoice=>attributeChoice != "");
      console.log(product.attributeValues)
      if (this.specifications && this.specifications?.length > 0) {
        product["specifications"] = this.specifications;
      }
      if (this.productVitalInfo.customBrand)
        product["customBrand"] = this.productVitalInfo.customBrand;

      if (this.productVitalInfo.brand)
        product["brand"] = this.productVitalInfo.brand;
      this.productService.addProduct(product).subscribe((res) =>
        Swal.fire({
          icon: "success",
          title: "تم حفظ المنتج الخاص بك",
          showConfirmButton: false,
          timer: 1500,
        })
      );
    } else {
      const product = {
        productId: this.productVitalInfo.productId,
        productIdType: this.productVitalInfo.productIdType,
        name: this.productVitalInfo.name,
        price: this.offerInfo.price,
        quantity: this.offerInfo.quantity,
        manufacturer: this.productVitalInfo.manufacturer,
        manufactureSerial: this.productVitalInfo.manufactureSerial,
        arName: this.productVitalInfo.arName,
        childCategory: this.id,
        isWithVariations: this.isWithVatiations,
        variationTheme: this.variationTheme?.id,
        attributeValues: values,
        attributeChoices: choices,
        condition: this.offerInfo.condition,
        images: images,
        primaryImage: mainImage,
        searchTerms: this.productKeyword.searchTerms,
        keyWords: this.productKeyword.platinumKeywords,
        features: this.productDescription.features,
        description: this.productDescription.description,
        legalDisclaimer: this.productDescription.productLegal,
        warnings: this.productDescription.warning,
      };
 
      product.attributeValues = product.attributeValues.filter(attributeValue=>attributeValue.value != "");
      product.attributeChoices = product.attributeChoices.filter(attributeChoice=>attributeChoice != "");
      console.log(product.attributeValues)
      if (this.specifications && this.specifications?.length > 0) {
        product["specifications"] = this.specifications;
      }
      if (this.productVitalInfo.customBrand)
        product["customBrand"] = this.productVitalInfo.customBrand;

      if (this.productVitalInfo.brand)
        product["brand"] = this.productVitalInfo.brand;

      this.loading = true;
      this.productService.addProduct(product).subscribe(
        (res) => {
          this.loading = false;
          Swal.fire({
            icon: "success",
            title: "تم حفظ المنتج الخاص بك",
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(["/manage-inventory/catalog/list"]);
        },
        (err) => (this.loading = false)
      );
    }
  }
}
