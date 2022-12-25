import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StarWarsModule } from 'src/app/star-wars/star-wars.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, StarWarsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
