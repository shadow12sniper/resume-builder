
import { Injectable, signal } from '@angular/core';
import { Resume, Experience, Education, Skill, Profile } from '../models/resume.model';

const initialResume: Resume = {
  profile: {
    name: 'Jane Doe',
    title: 'Senior Frontend Developer',
    email: 'jane.doe@example.com',
    phone: '(123) 456-7890',
    website: 'janedoe.dev',
    summary: 'A passionate and creative frontend developer with 8+ years of experience in building modern, responsive, and user-friendly web applications using Angular, TypeScript, and Tailwind CSS. Proven ability to lead projects and mentor junior developers.',
  },
  experience: [
    {
      company: 'Tech Solutions Inc.',
      title: 'Senior Frontend Developer',
      startDate: '2020-01-01',
      endDate: 'Present',
      description: '- Led the development of a large-scale enterprise application, improving performance by 30%.\n- Mentored a team of 4 junior developers.\n- Implemented a new design system using Angular and Tailwind CSS.'
    },
    {
      company: 'Web Innovators',
      title: 'Frontend Developer',
      startDate: '2016-06-01',
      endDate: '2019-12-31',
      description: '- Developed and maintained client-facing websites and applications.\n- Collaborated with designers and backend developers to deliver high-quality products.'
    }
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: '2012-09-01',
      endDate: '2016-05-31',
      description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.'
    }
  ],
  skills: [
    { name: 'Angular' },
    { name: 'TypeScript' },
    { name: 'JavaScript' },
    { name: 'Tailwind CSS' },
    { name: 'RxJS' },
    { name: 'State Management (Signals)' },
    { name: 'Git' }
  ]
};

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  resumeState = signal<Resume>(initialResume);

  updateProfile(field: keyof Profile, value: string) {
    this.resumeState.update(resume => ({
      ...resume,
      profile: { ...resume.profile, [field]: value },
    }));
  }

  addExperience() {
    this.resumeState.update(resume => ({
      ...resume,
      experience: [...resume.experience, { company: '', title: '', startDate: '', endDate: '', description: '' }],
    }));
  }

  updateExperience(index: number, field: keyof Experience, value: string) {
    this.resumeState.update(resume => {
      const newExperience = [...resume.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...resume, experience: newExperience };
    });
  }
  
  removeExperience(index: number) {
    this.resumeState.update(resume => ({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index),
    }));
  }

  addEducation() {
    this.resumeState.update(resume => ({
      ...resume,
      education: [...resume.education, { institution: '', degree: '', startDate: '', endDate: '', description: '' }],
    }));
  }

  updateEducation(index: number, field: keyof Education, value: string) {
    this.resumeState.update(resume => {
      const newEducation = [...resume.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...resume, education: newEducation };
    });
  }

  removeEducation(index: number) {
    this.resumeState.update(resume => ({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    }));
  }
  
  addSkill() {
    this.resumeState.update(resume => ({
      ...resume,
      skills: [...resume.skills, { name: '' }],
    }));
  }

  updateSkill(index: number, value: string) {
    this.resumeState.update(resume => {
      const newSkills = [...resume.skills];
      newSkills[index] = { name: value };
      return { ...resume, skills: newSkills };
    });
  }

  removeSkill(index: number) {
    this.resumeState.update(resume => ({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    }));
  }
}
