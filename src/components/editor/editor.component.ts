
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  resumeService = inject(ResumeService);
  resume = this.resumeService.resumeState.asReadonly();

  updateProfile(field: 'name' | 'title' | 'email' | 'phone' | 'website' | 'summary', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.resumeService.updateProfile(field, value);
  }

  updateExperience(index: number, field: 'company' | 'title' | 'startDate' | 'endDate' | 'description', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.resumeService.updateExperience(index, field, value);
  }

  updateEducation(index: number, field: 'institution' | 'degree' | 'startDate' | 'endDate' | 'description', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.resumeService.updateEducation(index, field, value);
  }
  
  updateSkill(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.resumeService.updateSkill(index, value);
  }
}
