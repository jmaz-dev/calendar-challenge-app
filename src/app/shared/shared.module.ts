import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { RegisterPipe } from './pipes/register.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    RegisterPipe,
  ],
  imports: [CommonModule, AppMaterialModule, RouterModule],
  exports: [AppMaterialModule, LayoutComponent, RouterModule, RegisterPipe],
})
export class SharedModule {}
