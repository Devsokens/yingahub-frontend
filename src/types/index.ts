export type UserRole = 'administrateur' | 'utilisateur' | 'university';
export type SubscriptionStatus = 'none' | 'self' | 'full';

export interface User {
  id: string;
  full_name?: string;
  email: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export type EducationLevel = 'baccalauréat' | 'licence' | 'master' | 'doctorat';

export interface Student {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  nationality?: string;
  country_of_residence?: string;
  phone?: string;
  education_level?: EducationLevel;
  field_of_study?: string;
  created_at: string;
  updated_at: string;
}

export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface Document {
  id: string;
  student_id: string;
  name: string;
  type: string;
  url: string;
  status: DocumentStatus;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export type ApplicationStatus = 'projet' | 'soumis' | 'accepté' | 'rejeté';

export interface Application {
  id: string;
  student_id: string;
  university_id: string;
  program_id: string;
  status: ApplicationStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AIProfile {
  id: string;
  student_id: string;
  autonomy: number; // 1-5
  authority: number; // 1-5
  solitude: number; // 1-5
  adaptability: number; // 1-5
  stress: number; // 1-5
  global_score: number; // 1-25
  analysis: string;
  recommended_universities: string[];
  recommended_cities: string[];
  created_at: string;
}

export interface University {
  id: string;
  name: string;
  city: string;
  rank?: number;
  fees?: string;
  scholarships_available: boolean;
  programs: string[];
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name: string;
  cost_of_living: 'low' | 'medium' | 'high';
  safety: 'low' | 'medium' | 'high';
  transport: 'low' | 'medium' | 'high';
  climate: string;
  created_at: string;
  updated_at: string;
}

export interface FinancialProfile {
  id: string;
  parent_id: string;
  student_id: string;
  budget_range: 'economique' | 'standard' | 'premium';
  answers: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  student_id: string;
  admin_id?: string;
  last_message?: string;
  updated_at: string;
}
