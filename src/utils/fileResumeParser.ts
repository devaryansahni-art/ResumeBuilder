import { ResumeData } from '../types/resume';

/**
 * Parses uploaded resume files (.json, .txt, .pdf, .doc, .docx) into a ResumeData structure
 * for ATS score calculation.
 */
export async function parseUploadedResumeFile(file: File): Promise<ResumeData> {
  const fileName = file.name.toLowerCase();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (fileName.endsWith('.json')) {
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          if (parsed && (parsed.personalInfo || parsed.workExperiences || parsed.sections)) {
            resolve(parsed as ResumeData);
          } else {
            reject(new Error('Invalid CraftCV JSON format. Ensure file contains personalInfo or workExperiences.'));
          }
        } catch (err) {
          reject(new Error('Failed to parse JSON file structure.'));
        }
      };
      reader.readAsText(file);
    } else if (fileName.endsWith('.pdf')) {
      // PDF File: Extract text from binary stream
      reader.onload = (e) => {
        try {
          const buffer = e.target?.result as ArrayBuffer;
          const bytes = new Uint8Array(buffer);
          let extractedText = '';

          // Extract printable ASCII text characters from binary PDF streams
          let currentWord = '';
          for (let i = 0; i < bytes.length; i++) {
            const charCode = bytes[i];
            // Printable ASCII range (space 32 to ~ 126, newlines 10/13)
            if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
              currentWord += String.fromCharCode(charCode);
            } else {
              if (currentWord.length > 2) {
                extractedText += currentWord + ' ';
              }
              currentWord = '';
            }
          }

          const resumeData = convertRawTextToResumeData(extractedText, file.name.replace(/\.[^/.]+$/, ''));
          resolve(resumeData);
        } catch (err) {
          reject(new Error('Failed to extract text from PDF file.'));
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // TXT, DOC, DOCX or fallback plain text
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const resumeData = convertRawTextToResumeData(content, file.name.replace(/\.[^/.]+$/, ''));
          resolve(resumeData);
        } catch (err) {
          reject(new Error('Failed to read text file.'));
        }
      };
      reader.readAsText(file);
    }
  });
}

/**
 * Converts raw extracted text from PDF/TXT files into a structured ResumeData object for ATS Scoring.
 */
function convertRawTextToResumeData(text: string, defaultName: string): ResumeData {
  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // Extract phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract LinkedIn
  const linkedInMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const linkedIn = linkedInMatch ? `https://${linkedInMatch[0]}` : '';

  // Extract GitHub
  const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);
  const github = githubMatch ? `https://${githubMatch[0]}` : '';

  // Extract candidate name from first few lines or filename
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  let fullName = defaultName;
  if (lines.length > 0 && lines[0].length < 40 && !lines[0].includes('@')) {
    fullName = lines[0];
  }

  // Extract bullet lines or paragraphs as experience bullets
  const bulletLines = lines.filter(line => 
    line.length > 20 && 
    !line.includes('@') && 
    !line.toLowerCase().startsWith('http')
  );

  return {
    personalInfo: {
      fullName,
      jobTitle: 'Uploaded Candidate',
      email,
      phone,
      location: '',
      website: '',
      linkedIn,
      github,
      photoUrl: '',
      showPhoto: false,
    },
    summary: text.slice(0, 400),
    workExperiences: [
      {
        id: 'uploaded-exp-1',
        jobTitle: 'Professional Experience',
        company: 'Uploaded Document',
        location: '',
        startDate: '2020',
        endDate: 'Present',
        isCurrent: true,
        bullets: bulletLines.slice(0, 10),
      }
    ],
    education: [
      {
        id: 'uploaded-edu-1',
        degree: 'Degree / Higher Education',
        institution: 'University / Institution',
        location: '',
        startDate: '2016',
        endDate: '2020',
        isCurrent: false,
        gpa: '',
        highlights: '',
      }
    ],
    skillCategories: [
      {
        id: 'uploaded-skills-1',
        category: 'Extracted Skills',
        items: text.match(/\b(react|javascript|typescript|python|java|node|aws|docker|sql|html|css|git|management|agile|leadership)\b/gi) || ['Professional Skills'],
      }
    ],
    projects: [],
    certifications: [],
    languages: [],
    customSections: [],
    sections: [
      { id: 'personal', name: 'Personal Info', enabled: true },
      { id: 'summary', name: 'Summary', enabled: true },
      { id: 'experience', name: 'Experience', enabled: true },
      { id: 'education', name: 'Education', enabled: true },
      { id: 'skills', name: 'Skills', enabled: true },
    ],
    theme: {
      template: 'minimal',
      accentColor: '#4f46e5',
      fontFamily: 'inter',
      fontSize: 'md',
      spacing: 'normal',
    },
  };
}
