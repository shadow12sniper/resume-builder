
export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
}

export interface Resume {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}
