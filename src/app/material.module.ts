import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


const MATERIAL = [
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL,
  ],
  exports: [
    MATERIAL
  ],
})
export class MaterialModule { }
