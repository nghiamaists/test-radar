import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

import { Coordinator } from './models/coordinator.model';
import { MOCK_DATA } from './constants/mock';
import { ChartData, RadarChartDataModel } from './models/radar-chart-data.model';

@Component({
  selector: 'app-radar-chart',
  template: '',
  styleUrls: ['./radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadarChartComponent implements AfterViewInit {
  private readonly chartPadding = 16;
  private readonly radian = Math.PI * 2;
  private levelStep = 10;

  private chartWidth!: number;
  private chartHeight!: number;
  private d3ChartSelected!: d3.Selection<
    d3.BaseType,
    unknown,
    HTMLElement,
    unknown
  >;
  private chartMaxValue!: number;
  private levels!: number;
  private primaryRadius!: number;
  private secondaryRadius!: number;
  private innerRadarChartData!: RadarChartDataModel;


  @Input() public chartData: RadarChartDataModel = MOCK_DATA;

  public constructor(
    private elementRef: ElementRef<HTMLElement>,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit() {
    this.calculateChartInformation();

    this.changeDetector.detectChanges();
    this.createChartContainer();
    this.drawLevelArea();
    this.drawDataArea();
    this.drawCircleLevel();
  }

  private createChartContainer(): void {
    d3.select('app-radar-chart')
      .append('svg')
      .classed('radar-chart', true)
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
    this.d3ChartSelected = d3.select('app-radar-chart').select('svg');
    this.changeDetector.detectChanges();
  }

  private calculateChartInformation(): void {
    const elementBounding =
      this.elementRef.nativeElement.getBoundingClientRect();

    this.chartWidth = elementBounding.width - this.chartPadding * 2;
    this.chartHeight = elementBounding.height - this.chartPadding * 2;

    this.primaryRadius = Math.min(this.chartWidth / 2, this.chartHeight / 2);
    this.secondaryRadius = Math.min(this.chartWidth / 2, this.chartWidth / 2);
    this.chartMaxValue = <number>d3.max(this.chartData.datasets, item => d3.max(item.data, it => it.value)) + 5;
    this.levels = Math.ceil(this.chartMaxValue / this.levelStep);

    this.innerRadarChartData = {
      ...this.chartData,
      datasets: this.chartData.datasets.map((item) => {
        return {
          ...item,
          data: item.data.map((it, i) => ({
            ...it,
            coordinator: this.getDataCoordinators(it.value, i, this.secondaryRadius)
          }))
        };
      })
    };
  }

  private drawCircleLevel(): void {
    if (this.innerRadarChartData && this.innerRadarChartData.datasets) {
      const circleGroups = this.d3ChartSelected
        .selectAll('g.circle-group')
        .data(this.innerRadarChartData.datasets)
        .enter()
        .append('g')
        .attr('class', 'circle-group');

      circleGroups
        .selectAll('.circle')
        .data((it) => it.data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('fill', d => d.pointBackgroundColor ?? 'black')
        .attr('stroke', d => d.pointBorderColor ?? 'black')
        .attr('r', d => d.pointerRadius)
        .attr('cx', d => d.coordinator!.x)
        .attr('cy', d => d.coordinator!.y);
    }
  }

  private drawLevelArea(): void {
    const allAxes = this.chartData.labels;
    const levelFactors = d3.range(0, this.levels).map((level) => {
      return this.primaryRadius * ((level + 1) / this.levels);
    }).reverse();


    this.d3ChartSelected.append('path')
      .attr('class', 'backdrop')
      .attr('d', () => {
        const backdropCoordinators: [number, number][] = this.chartData.labels.map((_, i) => {
          const val = this.getDataCoordinators(this.chartMaxValue, i, this.primaryRadius);
          return [val.x, val.y];
        });
        return d3.line()([backdropCoordinators, [backdropCoordinators[0]]].flat());
      })
      .attr('fill', '#D8DEE7')
      .attr('stroke-opacity', 1);

    const levelGroups = this.d3ChartSelected.selectAll('g.level-group').data(levelFactors).enter().append('g');

    levelGroups.attr('class', (_, i) => 'level-group level-group-' + i);

    levelGroups.exit().remove();

    const levelLine = levelGroups.selectAll('.level').data(function(levelFactor) {
      return d3.range(0, allAxes.length).map(function() {
        return levelFactor;
      });
    }).enter().append('line');

    levelLine.exit().remove();

    levelLine
      .attr('class', 'level')
      .attr('stroke', (d) => d === levelFactors[0] ? 'none' : '#002760')
      .attr('x1', (levelFactor, i) => this.getPosition(i, levelFactor, 'horizontal'))
      .attr('y1', (levelFactor, i) => this.getPosition(i, levelFactor, 'vertical'))
      .attr('x2', (levelFactor, i) => this.getPosition(i + 1, levelFactor, 'horizontal'))
      .attr('y2', (levelFactor, i) => this.getPosition(i + 1, levelFactor, 'vertical'))
      .attr('transform', (levelFactor) => 'translate(' + (this.chartWidth / 2 - levelFactor) + ', ' + (this.chartHeight / 2 - levelFactor) + ')');


    let axis = this.d3ChartSelected.selectAll('.axis').data(allAxes);

    let newAxis = axis.enter().append('g').attr('class', 'axis');

    newAxis
      .append('line').attr('x1', this.chartWidth / 2)
      .attr('stroke', '#002760')
      .attr('y1', this.chartHeight / 2)
      .attr('x2', (_, i) => {
        return (this.chartWidth / 2 - this.secondaryRadius) + this.getPosition(i, this.secondaryRadius, 'horizontal');
      })
      .attr('y2', (_, i) => {
        return (this.chartHeight / 2 - this.secondaryRadius) + this.getPosition(i, this.secondaryRadius, 'vertical');
      });
    // if (this.chartConfig.axisText) {
    //   newAxis.append('text').attr('class', (_, i) => {
    //     const p = this.getPosition(i, 0.5, 'horizontal');
    //
    //     return 'legend ' +
    //       ((p < 0.4) ? 'left' : ((p > 0.6) ? 'right' : 'middle'));
    //   })
    //     .attr('dy', (_, i) => {
    //       const p = this.getPosition(i, 0.5, 'vertical');
    //       return ((p < 0.1) ? '1em' : ((p > 0.9) ? '0' : '0.5em'));
    //     })
    //     .text((d) => d)
    //     .attr('x', (_, i) => {
    //       return (this.chartWidth / 2 - this.secondaryRadius) + this.getPosition(i, this.secondaryRadius, 'horizontal', this.chartConfig.factorLegend);
    //     })
    //     .attr('y', (_, i) => {
    //       return (this.chartHeight / 2 - this.secondaryRadius) + this.getPosition(i, this.secondaryRadius, 'vertical', this.chartConfig.factorLegend);
    //     });
    // }
  }

  private getPosition(
    index: number,
    range: number,
    type: 'horizontal' | 'vertical',
    factor: number = 1
  ): number {
    const value = (index * this.radian) / this.chartData.labels.length;
    const trigonometryFunction = type === 'vertical' ? Math.cos : Math.sin;

    return range * (1 - factor * trigonometryFunction(value));
  }


  private drawDataArea(): void {
    // const polygon = this.d3ChartSelected
    //   .selectAll('.area')
    //   .data(dataForDrawing,
    //     (d, i) => (d as RadarChartDataModel).serialName.split(' ').join('-') || i
    //   )
    //   .enter()
    //   .append('polygon')
    //   .style('stroke', d => d.strokeColor)
    //   .style('stroke-linejoin', 'round')
    //   .style('stroke-width', 3)
    //   .style('stroke-dasharray', '5, 5')
    //   .style('fill', d => d.fillColor)
    //   .attr('points', (d) => d.data.map(function(p) {
    //     return [p.coordinator!.x, p.coordinator!.y].join(',');
    //   }).join(' '));

    if (this.innerRadarChartData && this.innerRadarChartData.datasets.length) {
      this.d3ChartSelected
        .selectAll('path:not(.backdrop)')
        .data(this.innerRadarChartData.datasets)
        .join((enter) =>
          enter
            .append('path')
            .attr('d', (dataset) => {
              const coordinators: [number, number][] = dataset.data.map(
                (d) => ([d.coordinator!.x, d.coordinator!.y]));
              return d3.line().curve(d3.curveCatmullRom.alpha(1))([coordinators, [coordinators[0]]].flat());
            })
            .attr('stroke-width', 3)
            .attr('stroke', (d) => d.borderColor)
            .attr('stroke-dasharray', d => d.borderDash ? [5] : 'none')
            .attr('fill', (d) => d.backgroundColor)
            .attr('stroke-opacity', 1)
            .attr('fill-opacity', d => d.backgroundOpacity)
        );
    }
  }

  private getDataCoordinators(value: number, currentIndex: number, radius: number): Coordinator {
    return {
      x: (this.chartWidth / 2 - radius) + this.getPosition(currentIndex, radius, 'horizontal', (Math.max(value, 0) / this.chartMaxValue)),
      y: (this.chartHeight / 2 - radius) + this.getPosition(currentIndex, radius, 'vertical', (Math.max(value, 0) / this.chartMaxValue))
    };
  }
}
