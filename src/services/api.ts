import { ResumeData } from '../types/resume';

const TOKEN_KEY = 'craftcv_auth_token';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ResumeSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeDetail extends ResumeSummary {
  data: ResumeData;
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth API
  async register(email: string, password: string, name: string) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    setToken(data.token);
    return data;
  },

  async login(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    setToken(data.token);
    return data;
  },

  async getMe() {
    const token = getToken();
    if (!token) return null;

    try {
      const res = await fetch('/api/auth/me', {
        headers: authHeaders(),
      });

      if (!res.ok) {
        removeToken();
        return null;
      }

      const data = await res.json();
      return data.user as User;
    } catch (err) {
      console.warn('Backend Auth Check Failed (Server offline or unreachable):', err);
      return null;
    }
  },

  logout() {
    removeToken();
  },

  // Resumes API
  async getResumes(): Promise<ResumeSummary[]> {
    const res = await fetch('/api/resumes', {
      headers: authHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch saved resumes');
    }

    return data.resumes;
  },

  async getResume(id: string): Promise<ResumeDetail> {
    const res = await fetch(`/api/resumes/${id}`, {
      headers: authHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch resume');
    }

    return data;
  },

  async createResume(title: string, resumeData: ResumeData): Promise<ResumeDetail> {
    const res = await fetch('/api/resumes', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ title, data: resumeData }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to save resume');
    }

    return data;
  },

  async updateResume(id: string, title: string, resumeData: ResumeData): Promise<ResumeDetail> {
    const res = await fetch(`/api/resumes/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ title, data: resumeData }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update resume');
    }

    return data;
  },

  async deleteResume(id: string): Promise<void> {
    const res = await fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete resume');
    }
  },
};
