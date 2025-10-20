import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ChartConfig, ChartData, ChartDataset, ChartOptions, ChartResponse } from '../../shared/domain/chartDataset';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private platformId = inject(PLATFORM_ID);

  /**
   * Devuelve una configuración genérica de gráfico (data + options)
   */
  getChartConfig({
    labels = [],
    datasets = [],
    type = 'bar',
    stacked = true,
  }: ChartConfig):ChartResponse | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const docStyle = getComputedStyle(document.documentElement);
    const textColor = docStyle.getPropertyValue('--p-text-color');
    const textMuted = docStyle.getPropertyValue('--p-text-muted-color');
    const borderColor = docStyle.getPropertyValue('--p-content-border-color');

    const formattedDatasets = datasets.map(ds => ({
      type: ds.type || type,
      label: ds.label,
      backgroundColor: this.resolveColor(ds.color, docStyle),
      borderColor: this.resolveColor(ds.color, docStyle),
      data: ds.data
    }));

    const data:ChartData = { labels, datasets: formattedDatasets };

    const options:ChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: { mode: 'index', intersect: false },
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: {
          stacked,
          ticks: { color: textMuted },
          grid: { color: borderColor, drawBorder: false }
        },
        y: {
          stacked,
          ticks: { color: textMuted },
          grid: { color: borderColor, drawBorder: false }
        }
      }
    };

    return { data, options };
  }

  /**
   * Permite usar variables CSS (--p-color) o colores directos (#fff, rgb(), etc.)
   */
  private resolveColor(color: string | undefined, docStyle: CSSStyleDeclaration): string {
    if (!color) return docStyle.getPropertyValue('--p-primary-500');
    if (color.startsWith('--')) {
      return docStyle.getPropertyValue(color);
    }
    return color;
  }
}
