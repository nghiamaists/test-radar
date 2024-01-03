import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RadarChartModule } from './components/radar-chart/radar-chart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RadarChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
