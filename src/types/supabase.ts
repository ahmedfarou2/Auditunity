export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name_ar: string
          name_en: string
          type: 'FIRM' | 'COMPANY'
          registration_number: string
          subdomain: string
          admin_id: string
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          created_at: string
          updated_at: string
          allowed_email_domain: string | null
          global_network: string | null
          license_number: string | null
          registration_type: 'PARTNER' | 'EMPLOYEE' | null
          registered_by: Json | null
          verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED' | null
          verification_date: string | null
          agreement_accepted: boolean | null
          agreement_date: string | null
        }
        Insert: {
          id?: string
          name_ar: string
          name_en: string
          type: 'FIRM' | 'COMPANY'
          registration_number: string
          subdomain: string
          admin_id: string
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          created_at?: string
          updated_at?: string
          allowed_email_domain?: string | null
          global_network?: string | null
          license_number?: string | null
          registration_type?: 'PARTNER' | 'EMPLOYEE' | null
          registered_by?: Json | null
          verification_status?: 'PENDING' | 'VERIFIED' | 'REJECTED' | null
          verification_date?: string | null
          agreement_accepted?: boolean | null
          agreement_date?: string | null
        }
        Update: {
          id?: string
          name_ar?: string
          name_en?: string
          type?: 'FIRM' | 'COMPANY'
          registration_number?: string
          subdomain?: string
          admin_id?: string
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          created_at?: string
          updated_at?: string
          allowed_email_domain?: string | null
          global_network?: string | null
          license_number?: string | null
          registration_type?: 'PARTNER' | 'EMPLOYEE' | null
          registered_by?: Json | null
          verification_status?: 'PENDING' | 'VERIFIED' | 'REJECTED' | null
          verification_date?: string | null
          agreement_accepted?: boolean | null
          agreement_date?: string | null
        }
      }
      organization_members: {
        Row: {
          id: string
          user_id: string
          organization_id: string
          role: 'ADMIN' | 'MEMBER'
          permissions: string[]
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          joined_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id: string
          role?: 'ADMIN' | 'MEMBER'
          permissions?: string[]
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          joined_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string
          role?: 'ADMIN' | 'MEMBER'
          permissions?: string[]
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          joined_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      join_requests: {
        Row: {
          id: string
          user_id: string
          organization_id: string
          status: 'PENDING' | 'APPROVED' | 'REJECTED'
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id: string
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string
          status?: 'PENDING' | 'APPROVED' | 'REJECTED'
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          path: string
          type: string
          category: 'NATIONAL_ID' | 'COMMERCIAL_REGISTER' | 'SOCPA_LICENSE' | 'OTHER'
          documentable_id: string
          documentable_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          path: string
          type: string
          category: 'NATIONAL_ID' | 'COMMERCIAL_REGISTER' | 'SOCPA_LICENSE' | 'OTHER'
          documentable_id: string
          documentable_type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          path?: string
          type?: string
          category?: 'NATIONAL_ID' | 'COMMERCIAL_REGISTER' | 'SOCPA_LICENSE' | 'OTHER'
          documentable_id?: string
          documentable_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      audit_engagements: {
        Row: {
          id: string
          client_id: string
          firm_id: string
          type: 'ANNUAL' | 'SEMI_ANNUAL' | 'QUARTERLY' | 'MONTHLY' | 'SPECIAL_PURPOSE'
          status: 'DRAFT' | 'PENDING_REVIEW' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
          start_date: string
          end_date: string
          fiscal_year_end: string
          assigned_team: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          firm_id: string
          type: 'ANNUAL' | 'SEMI_ANNUAL' | 'QUARTERLY' | 'MONTHLY' | 'SPECIAL_PURPOSE'
          status?: 'DRAFT' | 'PENDING_REVIEW' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
          start_date: string
          end_date: string
          fiscal_year_end: string
          assigned_team?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          firm_id?: string
          type?: 'ANNUAL' | 'SEMI_ANNUAL' | 'QUARTERLY' | 'MONTHLY' | 'SPECIAL_PURPOSE'
          status?: 'DRAFT' | 'PENDING_REVIEW' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
          start_date?: string
          end_date?: string
          fiscal_year_end?: string
          assigned_team?: Json
          created_at?: string
          updated_at?: string
        }
      }
      workpapers: {
        Row: {
          id: string
          engagement_id: string
          title: string
          section: string
          prepared_by: string
          reviewed_by: string | null
          status: 'DRAFT' | 'PENDING_REVIEW' | 'REVIEWED' | 'REJECTED'
          content: Json
          attachments: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          engagement_id: string
          title: string
          section: string
          prepared_by: string
          reviewed_by?: string | null
          status?: 'DRAFT' | 'PENDING_REVIEW' | 'REVIEWED' | 'REJECTED'
          content?: Json
          attachments?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          engagement_id?: string
          title?: string
          section?: string
          prepared_by?: string
          reviewed_by?: string | null
          status?: 'DRAFT' | 'PENDING_REVIEW' | 'REVIEWED' | 'REJECTED'
          content?: Json
          attachments?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      trial_balances: {
        Row: {
          id: string
          organization_id: string
          period: string
          accounts: Json
          uploaded_at: string
          processed_at: string | null
          status: 'PENDING' | 'PROCESSED' | 'ERROR'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          period: string
          accounts?: Json
          uploaded_at?: string
          processed_at?: string | null
          status?: 'PENDING' | 'PROCESSED' | 'ERROR'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          period?: string
          accounts?: Json
          uploaded_at?: string
          processed_at?: string | null
          status?: 'PENDING' | 'PROCESSED' | 'ERROR'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}