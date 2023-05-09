import { Component, Input, EventEmitter, Output } from '@angular/core';
import { prodact } from '../../page tample/prodactTemplete';
import { sizes } from '../../page tample/popup-product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iproduct } from 'src/app/page tample/homepage';

@Component({
  selector: 'app-selected-product',
  templateUrl: './selected-product.component.html',
  styleUrls: ['./selected-product.component.scss']
})

//icon color #8A8A8A
export class SelectedProductComponent {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<iproduct> = new EventEmitter();
  @Input() product: prodact = {prodactId: 1, prodactImage: "", pordactName: "", typeSize: 1, categoryId: 0};
  sizes = sizes ;
  // chosenSize: string | undefined;
  addedSizes: Map<string, number> = new Map<string,number>();

  productForm = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    chosenSize: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    //Getting the addedSizes from session storage.
    if (sessionStorage.getItem(`addedSizes${String(this.product.prodactId)}`) != null) {
      var storedAddedSizes = sessionStorage.getItem(`addedSizes${String(this.product.prodactId)}`);
      this.addedSizes = new Map(JSON.parse(storedAddedSizes || '{}'));
    }
  }

  //Saving the addedSizes at the last moment
  ngOnDestroy() {
    sessionStorage.setItem(`addedSizes${String(this.product.prodactId)}`, JSON.stringify(Array.from(this.addedSizes.entries())));
  }

  chooseSize(event: any) {
    this.productForm.controls["chosenSize"].setValue(event.target.innerText);
  }

  quantityHandling(value: number) {
    let n = this.productForm.controls["quantity"].value;
    if(n && n + value > 0)
      this.productForm.controls["quantity"].setValue(n + value);
  }

  close() {
    this.onClose.emit();
  }

  addToCart() {
    if (this.productForm.valid) {
      console.log("valid, sent");
      this.addedSizes.set(this.chosenSize, this.productForm.controls["quantity"].value || 0);
      console.table(this.addedSizes);

      this.sortAddedSizes();
      var addedProduct: iproduct = {
        pordactId: this.product.prodactId,
        pordactName: this.product.pordactName,
        prodactImage: this.product.prodactImage,
        sizes: this.addedSizes
      };
      this.onAddToCart.emit(addedProduct);
      setTimeout(() => {
        this.onClose.emit();
      }, 1200);
    }
  }

  sortAddedSizes() {
  }
}
