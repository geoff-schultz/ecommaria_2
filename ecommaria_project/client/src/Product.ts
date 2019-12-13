import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class Product {
    constructor(
      public name: string = '',
      public description: string = '',
      public price: number = 0,
      public imageUrl: string = '',
    ){}
  }