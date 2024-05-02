import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  exports:[
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,

  ],
})
export class MaterialmoduleModule { }
