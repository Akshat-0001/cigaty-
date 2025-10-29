import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const authHelpers = {
  // Sign up new user
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: undefined, // Disable email confirmation redirect
        },
      });
      
      if (error) throw error;
      
      // Verify user was created
      if (!data.user) {
        throw new Error('User creation failed - no user returned');
      }
      
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Sign in existing user
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  },
};

// Database helper functions
export const dbHelpers = {
  // Insert user profile
  async insertProfile(userId: string, profileData: {
    first_name: string;
    middle_name?: string;
    last_name: string;
    position?: string;
    primary_phone: string;
    secondary_phone?: string;
    preferred_contact?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ id: userId, ...profileData }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Insert company details
  async insertCompany(userId: string, companyData: {
    company_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    zip_code?: string;
    country: string;
    registration_number: string;
    vat_number?: string;
    director_name?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([{ user_id: userId, ...companyData }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Insert document record
  async insertDocument(userId: string, docType: 'photo_id' | 'company_registration_doc' | 'proof_of_address' | 'vat_certificate', filePath: string) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([{
          user_id: userId,
          doc_type: docType,
          file_path: filePath,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};

// Storage helper functions
export const storageHelpers = {
  // Upload document to company-docs bucket
  async uploadDocument(userId: string, file: File, docType: string) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${docType}_${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('company-docs')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      return { data: { path: fileName }, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Get document URL
  getDocumentUrl(path: string) {
    const { data } = supabase.storage
      .from('company-docs')
      .getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete document
  async deleteDocument(path: string) {
    try {
      const { error } = await supabase.storage
        .from('company-docs')
        .remove([path]);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },
};

