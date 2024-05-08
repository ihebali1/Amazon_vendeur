import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vex-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() length = 3;
  @Output() photos = new EventEmitter();
  imageList = [];
  images = [];
  showLengthWarning: boolean;

  constructor() {}

  ngOnInit(): void {}

  onFileInput(files: FileList) {
    let length = this.length;
    let currentLength = this.images.length + files.length;
    if (currentLength > this.length) {
      this.showLengthWarning = true;
      setTimeout(() => {
        this.showLengthWarning = false;
      }, 6000);
      if (this.images.length < this.length) {
        length = this.length - this.images.length;
      } else {
        return;
      }
    }

    for (let i = 0; i < length; i++) {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imageList.push(reader.result);
          this.images.push(files[i]);
          this.photos.emit(this.images);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImg(index: number) {
    this.imageList = this.imageList.filter((item, i) => i !== index);
    this.images = this.images.filter((item, i) => i !== index);
  }

}
