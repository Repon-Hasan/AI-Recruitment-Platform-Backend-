export interface ISkillInput {
  name: string;
  priority?: "high" | "medium" | "low" | string;
}

export interface ICreateJobInput {
  title: string;
  description: string;
  location?: string;
  employmentType?: string;
  requiredSkills?: ISkillInput[];
}

export interface IUpdateJobInput {
  title?: string;
  description?: string;
  location?: string;
  employmentType?: string;
  requiredSkills?: ISkillInput[];
}

export interface IJobFilterQuery {
  searchTerm?: string;
  location?: string;
  employmentType?: string;
}