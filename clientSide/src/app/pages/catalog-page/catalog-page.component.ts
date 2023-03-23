import { demoprodact, prodact } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { Component, OnInit, Inject } from '@angular/core';
import { iproduct } from 'src/app/page tample/homepage';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
  categories = [
    {
      id: 0,
      name: "people",
      url: "../../../assets/demo/people.png"
    },{
      id: 1,
      name: "fruits",
      url: "../../../assets/demo/fruits.png"
    },{
      id: 2,
      name: "places",
      url: "../../../assets/demo/places.png"
    },{
      id: 3,
      name: "professions",
      url: "../../../assets/demo/places.png"
    },
  ];
  demoproducts: demoprodact[] =  [
    {
      prodactId: 1,
      pordactName: "noa",
      prodactImage: "../../../assets/demo/Noa.jpg",
      typeSize: 1,
      category: 0
    },{
      prodactId: 2,
      pordactName: "rome",
      prodactImage: "../../../assets/demo/rome.png",
      typeSize: 2,
      category: 2
    },{
      prodactId: 3,
      pordactName: "apple",
      prodactImage: "../../../assets/demo/apple.webp",
      typeSize: 1,
      category: 1
    },{
      prodactId: 4,
      pordactName: "pear",
      prodactImage: "../../../assets/demo/pear.avif",
      typeSize: 1,
      category: 1
    },
  ];
  chosenCategory: number = -1;






  products: prodact[]  = [];
  cart: iproduct[] = [];
  sizes: [][] = [[]];
  search: string = "";
  currProduct?: prodact;
  // categories = [
  //   {
  //     title: "women",
  //     src: "../../../assets/img/women.jpg"
  //   },{
  //     title: "women",
  //     src: "../../../assets/img/women.jpg"
  //   }
  // ];

  constructor(private reqestService: ReqestService) {
  }

  ngOnInit(): void {
    this.reqestService.getProdacts().subscribe(element=>this.products = element );

    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cart = JSON.parse(storedArray || '{}');
    }
  }

  onClick(product: prodact){
    this.currProduct = product;
  }

  changeCategory(newCategory: number) {
    this.chosenCategory = newCategory;
  }

  closeDialog(){
    this.currProduct = undefined;
  }

  addToCart(addedProduct: any){
    if (this.cart.find(c => c.pordactId === addedProduct.pordactId)) {
      var foundIndex = this.cart.findIndex(x => x.pordactId == addedProduct.pordactId);
      this.cart.splice(foundIndex, 1);
      this.cart.unshift(addedProduct);
    } else {
      this.cart.unshift(addedProduct);
    }
    sessionStorage.setItem("cartItemsArray", JSON.stringify(this.cart));
    sessionStorage.setItem(`cartItemsArray${addedProduct.pordactId}`, JSON.stringify(Array.from(addedProduct.sizes.entries())));
  }
}
