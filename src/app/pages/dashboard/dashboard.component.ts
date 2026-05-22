import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ApiService } from 'src/app/core/services/api.service';
import { DashboardApiResponse, TableDataApiResponse } from 'src/app/core/interfaces/dashboard';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  donutChart!: Chart;
  barChart!: Chart;
  tableUsers: TableDataApiResponse[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getDashboardData().subscribe(
      {
        next: (data: DashboardApiResponse) => {
          this.tableUsers = data.tableUsers;
          this.initializeDonutChart(data.chartDonut);
          this.initializeBarChart(data.chartBar);
        },
        error: (error) => {
          console.error('Failed to fetch dashboard data:', error);
        }
      }
    )
  }

  private initializeDonutChart(chartData: any[]): void {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    if (!ctx) return;

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
            position: 'top'
          },
          title: {
            display: true,
            text: 'Donut Chart'
          }
        }
      }
    };

    this.donutChart = new Chart(ctx, config);
  }

  private initializeBarChart(chartData: any[]): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (!ctx) return;

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
            position: 'top'
          },
          title: {
            display: true,
            text: 'Bar Chart'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.barChart = new Chart(ctx, config);
  }
}
