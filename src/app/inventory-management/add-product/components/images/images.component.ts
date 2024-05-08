import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FileService } from "src/app/shared/services/file.service";
import Swal from "sweetalert2";

@Component({
  selector: "vex-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.scss"],
})
export class ImagesComponent implements OnInit {
  images: any[] = [];
  image: any;
  @Output() imagesChanged: EventEmitter<any> = new EventEmitter();
  @Output() mainImageChanged: EventEmitter<any> = new EventEmitter();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  onSelectPhotos(images: any[]) {
    this.images = images;
  }


  onFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        //this.image = reader.result;
        //console.log(this.image);
        var img = new Image();
        img.src = reader.result as string;
        img.addEventListener("load", () => {
          let width = img.width;
          let height = img.height;
          console.log(width, height);
          if (width <300 || height < 300)
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "error",
              title: "الحد الأدنى للحجم 300 بكسل",
              timer: 2500,
            });
          else {
            this.image = reader.result;
            this.mainImageChanged.emit(this.image);
          }
        });
      }
    };

    reader.readAsDataURL(files[0]);
  }

  onFileInputAdd(files: FileList, index) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.images[index] = reader.result;
      }
    };
    reader.readAsDataURL(files[0]);
    this.imagesChanged.emit(this.images);
  }
}
