import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  exports:[
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,

  ],
})
export class MaterialmoduleModule { }
