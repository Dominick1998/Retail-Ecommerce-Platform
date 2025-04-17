import { Component } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product: any = {};
  selectedFile!: File;

  constructor(private uploadService: UploadService, private productService: ProductService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadAndSaveProduct() {
    if (this.selectedFile) {
      this.uploadService.uploadImage(this.selectedFile).subscribe(response => {
        this.product.imageUrl = response.secure_url; // Set returned Cloudinary URL
        this.saveProduct();
      });
    } else {
      this.saveProduct();
    }
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe(response => {
      console.log('Product saved successfully');
    });
  }
}
