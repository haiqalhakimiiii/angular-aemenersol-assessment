import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ApiService } from 'src/app/core/services/api.service';
import { ChartDataApiResponse, DashboardApiResponse, TableDataApiResponse } from 'src/app/core/interfaces/dashboard';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('donutChartCanvas') donutChartCanvas!: ElementRef;
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;

  donutChart!: Chart;
  barChart!: Chart;
  tableUsers: TableDataApiResponse[] = [];
  isLoading = true;
  errorMessage = '';
  chartData: { donut: ChartDataApiResponse[], bar: ChartDataApiResponse[] } | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    if (this.chartData) {
      this.initializeCharts();
    }
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.getDashboardData().subscribe(
      {
        next: (data: DashboardApiResponse) => {
          this.tableUsers = data.tableUsers;
          this.chartData = {
            donut: data.chartDonut,
            bar: data.chartBar
          };
          this.isLoading = false;
          setTimeout(() => this.initializeCharts(), 0);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load dashboard data. Please try again later.';
          console.error('Failed to fetch dashboard data:', error);
        }
      }
    )
  }

  private initializeCharts(): void {
    if (this.chartData) {
      this.initializeDonutChart(this.chartData.donut);
      this.initializeBarChart(this.chartData.bar);
    }
  }

  private initializeDonutChart(chartData: ChartDataApiResponse[]): void {
    const canvas = this.donutChartCanvas?.nativeElement as HTMLCanvasElement;
    if (!canvas) {
      console.warn('Donut chart canvas not found');
      return;
    }

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: chartData.map(item => item.name),
        datasets: [
          {
            label: 'Donut Chart',
            data: chartData.map(item => item.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
        }
      }
    };

    this.donutChart?.destroy();
    this.donutChart = new Chart(canvas, config);
  }

  private initializeBarChart(chartData: ChartDataApiResponse[]): void {
    const canvas = this.barChartCanvas?.nativeElement as HTMLCanvasElement;
    if (!canvas) {
      console.warn('Bar chart canvas not found');
      return;
    }

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: chartData.map(item => item.name),
        datasets: [
          {
            label: 'Bar Chart',
            data: chartData.map(item => item.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.barChart?.destroy();
    this.barChart = new Chart(canvas, config);
  }

  ngOnDestroy(): void {
    this.donutChart?.destroy();
    this.barChart?.destroy();
  }
}
