import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StarWarsModule } from 'src/app/star-wars/star-wars.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, StarWarsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
