import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { DataService } from '../data.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private product: any;
  private product_id: any;
  private productForm: FormGroup;
  private auth: any;
  private errors = [];
  private categories = [];

  constructor(private fb: FormBuilder, private _data: DataService, private _http: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._data.currentAuth.subscribe(auth => {
      this.auth = auth
    })
    this.getProduct()
  }

  getProduct(){
    this._route.params.subscribe((params: Params) => {
      this.product_id = params["id"]
      let tempObservable = this._http.getProduct(params["id"])
      tempObservable.subscribe((res) => {
        console.log(res)
        this._http.getCategoriesByProduct(params["id"]).subscribe((categories) => {
          this.categories = categories;
          this.categories.forEach((c)=>{
            c["id"] = c["url"].replace('http://localhost:8000/api/category/', '').replace('/','')
          })
          this.createFormGroup();
          },
          (err) => console.log(err)
          )
          this.product = res
        },
      (err) => console.log(err)
      );
  })
}

createFormGroup(){
  this.productForm = this.fb.group({
    name: [this.product["name"], [Validators.required, Validators.minLength(4)]],
    price: [this.product["price"]],
    description: [this.product["description"], [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
    image: [null],
  })
}

onSubmit() {
  const formData = new FormData();

  if(this.productForm.get('name').value != this.product["name"]){
    formData.append('name', this.productForm.get('name').value);
  }
  if(this.productForm.get('price').value != this.product["price"]){
    formData.append('price', this.productForm.get('price').value);
  }
  if(this.productForm.get('description').value != this.product["description"]){
    formData.append('description', this.productForm.get('description').value);
  }
  if(this.productForm.get('image').value != null){
    formData.append('image', this.productForm.get('image').value);
  }
  formData.forEach((e)=>console.log("Value from OnSubmit: ", e))
  
  this._http.submitProductUpdate(formData, this.auth, this.product_id).subscribe(
    (res) => {
      console.log('Response:', res)
      this.productForm.reset()
      
    },
    (err) => console.log(err)
    );
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

  get image() {
    return this.productForm.get('image');
  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image').setValue(file);
    }
  }

  removeCategory(index){
    let c_id = this.categories[index]["id"]
    this._http.removeProductFromCategory(c_id, this.product_id, this.auth).subscribe((resp)=>{
      if(resp["status"] == true){
        console.log("Success")
        this.categories.splice(index, 1)
      }
      else {
        console.log("Failure, feel bad.")
      }
    })
  }

}
