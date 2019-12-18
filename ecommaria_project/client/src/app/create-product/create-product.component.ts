import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  
  constructor(private _data: DataService, private fb: FormBuilder, private _http: HttpService, private cd: ChangeDetectorRef) { }
  private auth: string;
  private productForm: FormGroup;
  
  ngOnInit() {
    this._data.currentAuth.subscribe(auth => this.auth = auth)
    this.createFormGroup();
  }
  
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('image', this.productForm.get('image').value);
    formData.forEach((e)=>console.log("Value from OnSubmit: ", e))
    
    this._http.submitProduct(formData, this.auth).subscribe(
      (res) => {
        console.log('Response:', res)
        this.productForm.reset()
        
      },
      (err) => console.log(err)
      );
    }

    createFormGroup(){
      this.productForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        price: [''],
        description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
        image: ['', Validators.required],
      })
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

}
