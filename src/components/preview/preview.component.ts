
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { PdfService } from '../../services/pdf.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PreviewComponent {
  resumeService = inject(ResumeService);
  pdfService = inject(PdfService);
  resume = this.resumeService.resumeState.asReadonly();
  isGenerating = this.pdfService.isGenerating.asReadonly();

  downloadPdf() {
    const fileName = this.resume().profile.name.replace(' ', '_') + '_Resume';
    this.pdfService.generatePdf('resume-preview-content', fileName);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch(e) {
        return dateString;
    }
  }

  getDescriptions(description: string): string[] {
    return description.split('\n').map(line => line.replace(/^-/, '').trim()).filter(line => line.length > 0);
  }
}
