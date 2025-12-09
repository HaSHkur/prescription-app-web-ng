import { Component, OnInit, inject, signal, ViewChild, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule, TooltipService } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { lastValueFrom } from 'rxjs';
import { ReportServiceService } from '../../../services/report/report-service.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'report-tooltip',
  standalone: false,
  template: `
    <div class="p-2 bg-white rounded shadow-lg border border-gray-300">
      <p class="font-bold text-sm text-gray-700">Date: {{ data?.name }}</p>
      <hr />
      <p class="mt-1 text-md text-blue-600">
        <ng-container *ngIf="data?.value > 0; else noData">
          Count: {{ data?.value }} Prescriptions
        </ng-container>
        <ng-template #noData>
          <span class="text-red-500">No Prescriptions</span>
        </ng-template>
      </p>
    </div>
  `
})
export class ReportTooltipComponent {
  @Input() data: any;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    NgxChartsModule, 
    MatIconModule, 
    MatDividerModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  providers: [TooltipService]
})

export class ReportComponent implements OnInit, AfterViewInit {
  private api = inject(ReportServiceService);
  private fb = inject(FormBuilder);

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chartData = signal<any[]>([]);
  foundCount = signal<string>('');
  chartWidth = signal<number>(0); 
  private daysToDisplay = 10;
  private totalDays = 60;

  searchForm = this.fb.group({ date: [''] });
  @HostListener('window:resize')
  onResize() {
    this.calculateWidth();
  }
  calculateWidth() {
    const parentWidth = window.innerWidth > 1280 ? 1280 : window.innerWidth - 64; 
    const singleSlotWidth = parentWidth / this.daysToDisplay;
    this.chartWidth.set(singleSlotWidth * this.totalDays);
  }
  
  async ngOnInit() {
    this.calculateWidth(); 
    await this.fetchInitialData();
  }

  ngAfterViewInit() {
    this.scrollToRecent();
  }

  async fetchInitialData() {
    try {
      const res = await lastValueFrom(this.api.countPrescriptions());
      const skeleton = this.generateDateSkeleton(this.totalDays);
      
      const dataMap = new Map(res.map((item: any) => [item.date, item.count]));
      
      const mergedData = skeleton.map(day => ({
        name: day,
        value: dataMap.get(day) || 0 
      }));
      
      this.chartData.set(mergedData);
      this.scrollToRecent();
    } catch (err) {
      console.error('Data loading failed:', err);
    }
  }

  async onGetCount() {
    const dateValue = this.searchForm.value.date;
    if (!dateValue) return;

    try {
      const res = await lastValueFrom(this.api.countPrescriptionsByDate(dateValue));
      this.foundCount.set(res?.count?.toString() ?? '0');
    } catch (err) {
      console.error('Error fetching count:', err);
      this.foundCount.set('0');
    }
  }

  private generateDateSkeleton(days: number): string[] {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]); 
    }
    return dates;
  }

  private scrollToRecent() {
    setTimeout(() => {
      if (this.chartContainer?.nativeElement) {
        this.chartContainer.nativeElement.scrollLeft = this.chartContainer.nativeElement.scrollWidth;
      }
    }, 500); 
  }
}


