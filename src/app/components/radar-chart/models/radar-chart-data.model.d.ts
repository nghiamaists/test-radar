import { Coordinator } from './coordinator.model';

interface ChartData {
  value: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  pointerRadius: number;
  coordinator?: Coordinator;
}

export interface ChartDataset {
  label: string;
  data: Array<ChartData>;
  backgroundColor: string;
  borderColor: string;
  borderDash: boolean;
  tension: number;
  backgroundOpacity: number;
}

export interface RadarChartDataModel {
  labels: Array<string>;
  datasets: Array<ChartDataset>;
}
