import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../Product';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  private productForm: FormGroup;
  private product: Product;
  private auth: string;

  constructor(private _data: DataService, private fb: FormBuilder, private _http: HttpService) { }

  ngOnInit() {
    this._data.currentAuth.subscribe(auth => this.auth = auth)
    this.productForm = this.fb.group({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ]),
      price: new FormControl(''),
      description: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(500)
      ])
    });
  }

  onSubmit(form: FormGroup) {
    this.product = new Product();
    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Price', form.value.price);
    // console.log('Description', form.value.description);
    this.product["name"] = form.value.name;
    this.product["price"] = form.value.price;
    this.product["description"] = form.value.description;
    console.log(this.product)
    this._http.submitProduct(this.product, this.auth).toPromise()
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err))
  }

  get name() {
    return this.productForm.get('name');
  }
  
  get price() {
    return this.productForm.get('price');
  }

  get description() {
    return this.productForm.get('description');
  }

}
