
import { Injectable, signal } from '@angular/core';

declare var html2canvas: any;
declare var jspdf: any;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  isGenerating = signal(false);

  async generatePdf(elementId: string, fileName: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found.`);
      return;
    }
    
    this.isGenerating.set(true);

    try {
      const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better quality
          useCORS: true, 
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;

      // A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const ratio = canvasWidth / pdfWidth;
      const imgHeight = canvasHeight / ratio;

      let position = 0;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
        this.isGenerating.set(false);
    }
  }
}
