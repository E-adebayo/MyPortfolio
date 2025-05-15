import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(private profileService: ProfileService) {}

  async generateCV(cvElement: HTMLElement): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('CV_Adebayo_Eudes_dALMEIDA.pdf');
  }
}
