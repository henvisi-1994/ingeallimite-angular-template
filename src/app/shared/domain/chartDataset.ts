export interface ChartDataset {
  type?: string;
  label: string;
  data: number[];
  color?: string; // Nombre de la variable CSS o color plano (#fff, rgb(), etc.)
}
export interface ChartConfig {
  labels: string[];
  datasets: ChartDataset[];
  type?: string;
  stacked?: boolean;
}
export interface ChartResponse {
  data: ChartData;
  options: ChartOptions;
}

export interface ChartData {
  labels: string[]; // Ejes X o categorías
  datasets: ChartDataset[]; // Conjunto de series
}
export interface ChartOptions {
  maintainAspectRatio?: boolean;
  aspectRatio?: number;
  plugins?: {
    tooltip?: {
      mode?: string;
      intersect?: boolean;
    };
    legend?: {
      labels?: {
        color?: string;
      };
    };
  };
  scales?: {
    x?: ChartScaleOptions;
    y?: ChartScaleOptions;
  };
}

export interface ChartScaleOptions {
  stacked?: boolean;
  ticks?: {
    color?: string;
  };
  grid?: {
    color?: string;
    drawBorder?: boolean;
  };
}
