import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  resumeService = inject(ResumeService);
  geminiService = inject(GeminiService);
  resume = this.resumeService.resumeState.asReadonly();
  generatingDescriptionIndex = signal<number | null>(null);

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

  async generateExperienceDescription(index: number) {
    if (this.generatingDescriptionIndex() !== null) {
      return;
    }
    
    this.generatingDescriptionIndex.set(index);
    const experience = this.resume().experience[index];

    try {
      const description = await this.geminiService.generateExperienceDescription(experience.title, experience.company);
      // To properly trigger the change detection for the textarea, we update the service and also manually update the input value.
      this.resumeService.updateExperience(index, 'description', description);
    } catch (error) {
      console.error('Failed to generate description with AI', error);
      // Optionally, set an error state to show in the UI
    } finally {
      this.generatingDescriptionIndex.set(null);
    }
  }
}
