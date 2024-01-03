import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadarChartComponent } from './radar-chart.component';

@NgModule({
  declarations: [RadarChartComponent],
  imports: [CommonModule],
  exports: [RadarChartComponent],
})
export class RadarChartModule {}
