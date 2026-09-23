import { ResumeData } from '../types/resume';

export interface AtsCategoryScore {
  name: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs_work' | 'critical';
  feedback: string;
}

export interface AtsImprovement {
  id: string;
  severity: 'critical' | 'warning' | 'tip';
  title: string;
  description: string;
  tabKey?: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certs_lang' | 'sections' | 'theme';
}

export interface KeywordAnalysis {
  matchedKeywords: string[];
  missingKeywords: string[];
  matchPercentage: number;
}

export interface AtsScoreResult {
  totalScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  categories: AtsCategoryScore[];
  strengths: string[];
  improvements: AtsImprovement[];
  actionVerbCount: number;
  metricsBulletCount: number;
  keywordAnalysis?: KeywordAnalysis;
}

// Power Action Verbs recognized by major ATS systems
const ACTION_VERBS = new Set([
  'achieved', 'administered', 'analyzed', 'architected', 'automated', 'built',
  'collaborated', 'created', 'decreased', 'delivered', 'designed', 'developed',
  'directed', 'drove', 'engineered', 'enhanced', 'established', 'expanded',
  'formulated', 'generated', 'guided', 'implemented', 'improved', 'increased',
  'initiated', 'innovated', 'instituted', 'integrated', 'launched', 'led',
  'managed', 'maximized', 'migrated', 'minimized', 'modernized', 'negotiated',
  'orchestrated', 'optimized', 'overhauled', 'pioneered', 'produced', 'reduced',
  'refactored', 'restructured', 'revamped', 'scaled', 'spearheaded', 'streamlined',
  'transformed', 'upgraded'
]);

// Common technical & industry keywords to extract from job descriptions
const COMMON_STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'you', 'that', 'this', 'have', 'will', 'from',
  'your', 'are', 'work', 'team', 'experience', 'ability', 'knowledge', 'strong',
  'about', 'must', 'should', 'skills', 'role', 'looking', 'years', 'working'
]);

/**
 * Calculates a comprehensive ATS compatibility score for a given ResumeData object.
 */
export function calculateAtsScore(
  resume: ResumeData, 
  jobDescription: string = ''
): AtsScoreResult {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, theme } = resume;

  const improvements: AtsImprovement[] = [];
  const strengths: string[] = [];

  // -------------------------------------------------------------
  // 1. SECTION COMPLETENESS (25 pts max)
  // -------------------------------------------------------------
  let completenessScore = 0;
  
  // Contact Info (7 pts)
  let contactPoints = 0;
  if (personalInfo.fullName.trim()) contactPoints += 2;
  if (personalInfo.email.trim()) contactPoints += 2;
  if (personalInfo.phone.trim()) contactPoints += 1;
  if (personalInfo.location.trim()) contactPoints += 1;
  if (personalInfo.linkedIn.trim() || personalInfo.github.trim()) contactPoints += 1;
  completenessScore += contactPoints;

  if (!personalInfo.email.trim() || !personalInfo.phone.trim()) {
    improvements.push({
      id: 'missing-contact',
      severity: 'critical',
      title: 'Missing Essential Contact Details',
      description: 'Ensure both email and phone number are clearly provided for recruiters to reach out.',
      tabKey: 'personal'
    });
  } else {
    strengths.push('Complete contact information with email & phone.');
  }

  // Professional Summary (5 pts)
  const summaryLength = summary.trim().length;
  if (summaryLength >= 100 && summaryLength <= 500) {
    completenessScore += 5;
    strengths.push('Well-proportioned professional summary statement.');
  } else if (summaryLength > 0) {
    completenessScore += 3;
    improvements.push({
      id: 'summary-length',
      severity: 'warning',
      title: 'Short Summary Statement',
      description: 'Expand your summary to 2-4 sentences highlighting key competencies and years of experience.',
      tabKey: 'summary'
    });
  } else {
    improvements.push({
      id: 'missing-summary',
      severity: 'critical',
      title: 'Missing Summary Statement',
      description: 'Add an executive summary at the top to highlight your primary career value.',
      tabKey: 'summary'
    });
  }

  // Work Experience (7 pts)
  if (workExperiences.length >= 2) {
    completenessScore += 7;
    strengths.push(`Rich work history listed (${workExperiences.length} positions).`);
  } else if (workExperiences.length === 1) {
    completenessScore += 4;
  } else {
    improvements.push({
      id: 'missing-experience',
      severity: 'critical',
      title: 'No Work Experience Listed',
      description: 'Add at least one professional role or project experience entry.',
      tabKey: 'experience'
    });
  }

  // Education (3 pts)
  if (education.length > 0) {
    completenessScore += 3;
    strengths.push('Academic qualifications included.');
  } else {
    improvements.push({
      id: 'missing-education',
      severity: 'warning',
      title: 'No Education Entry Provided',
      description: 'Add your degree, university, or academic certifications.',
      tabKey: 'education'
    });
  }

  // Skills (3 pts)
  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  if (totalSkillsCount >= 8) {
    completenessScore += 3;
    strengths.push(`Solid skills matrix with ${totalSkillsCount} individual competencies.`);
  } else if (totalSkillsCount > 0) {
    completenessScore += 2;
    improvements.push({
      id: 'low-skills-count',
      severity: 'tip',
      title: 'Add More Core Skills',
      description: 'Aim for 8-15 total technical or industry skills across your categories.',
      tabKey: 'skills'
    });
  } else {
    improvements.push({
      id: 'missing-skills',
      severity: 'critical',
      title: 'No Skills Listed',
      description: 'ATS parsers rely heavily on skill keywords to rank candidates.',
      tabKey: 'skills'
    });
  }

  // -------------------------------------------------------------
  // 2. ACTION VERBS & POWER WORDS (25 pts max)
  // -------------------------------------------------------------
  let actionVerbCount = 0;
  let totalBullets = 0;
  
  workExperiences.forEach(exp => {
    (exp.bullets || []).forEach(bullet => {
      totalBullets++;
      const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
      if (firstWord && ACTION_VERBS.has(firstWord)) {
        actionVerbCount++;
      }
    });
  });

  projects.forEach(proj => {
    if (proj.description) {
      const firstWord = proj.description.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
      if (firstWord && ACTION_VERBS.has(firstWord)) {
        actionVerbCount++;
      }
    }
  });

  let actionWordScore = 0;
  if (actionVerbCount >= 6) {
    actionWordScore = 25;
    strengths.push(`Strong active phrasing: ${actionVerbCount} power action verbs detected.`);
  } else if (actionVerbCount >= 3) {
    actionWordScore = 15;
    improvements.push({
      id: 'more-action-verbs',
      severity: 'warning',
      title: 'Use More Strong Action Verbs',
      description: 'Start experience bullet points with verbs like "Spearheaded", "Engineered", "Optimized", or "Increased".',
      tabKey: 'experience'
    });
  } else {
    actionWordScore = 5;
    improvements.push({
      id: 'lack-action-verbs',
      severity: 'critical',
      title: 'Weak Bullet Phrasing',
      description: 'Begin each achievement bullet with strong action verbs to catch recruiter attention.',
      tabKey: 'experience'
    });
  }

  // -------------------------------------------------------------
  // 3. QUANTIFIABLE METRICS & RESULTS (25 pts max)
  // -------------------------------------------------------------
  let metricsBulletCount = 0;
  const metricRegex = /\b(\d+%\b|\$\d+|\d+\+|\d+k\b|\d+x\b|increased|decreased|reduced|saved|generated|scaled|improved by)/i;

  workExperiences.forEach(exp => {
    (exp.bullets || []).forEach(bullet => {
      if (metricRegex.test(bullet)) {
        metricsBulletCount++;
      }
    });
  });

  let metricsScore = 0;
  if (metricsBulletCount >= 4) {
    metricsScore = 25;
    strengths.push(`Data-driven resume: ${metricsBulletCount} bullets contain metrics, percentages, or figures.`);
  } else if (metricsBulletCount >= 2) {
    metricsScore = 15;
    improvements.push({
      id: 'add-more-metrics',
      severity: 'warning',
      title: 'Quantify Your Accomplishments',
      description: 'Include concrete numbers (e.g. "Increased revenue by 25%", "Reduced latency by 150ms").',
      tabKey: 'experience'
    });
  } else {
    metricsScore = 5;
    improvements.push({
      id: 'missing-metrics',
      severity: 'critical',
      title: 'No Measurable Impact Found',
      description: 'Resumes with numerical metrics receive 40% higher response rates from recruiters.',
      tabKey: 'experience'
    });
  }

  // -------------------------------------------------------------
  // 4. ATS FORMATTING & TEMPLATE SAFETY (15 pts max)
  // -------------------------------------------------------------
  let formatScore = 15;
  const safeTemplates = ['minimal', 'classic', 'compact', 'technical', 'academic'];
  
  if (!safeTemplates.includes(theme.template)) {
    formatScore -= 3;
    improvements.push({
      id: 'template-ats-safety',
      severity: 'tip',
      title: 'Consider Ultra-Safe ATS Layout',
      description: 'Templates like "Minimal Clean" or "Executive Classic" offer 100% linear ATS parsing safety.',
      tabKey: 'theme'
    });
  } else {
    strengths.push(`Layout template "${theme.template}" is highly ATS compliant.`);
  }

  // -------------------------------------------------------------
  // 5. JOB DESCRIPTION KEYWORD MATCH (10 pts max)
  // -------------------------------------------------------------
  let keywordAnalysis: KeywordAnalysis | undefined = undefined;
  let keywordScore = 10;

  if (jobDescription && jobDescription.trim().length > 30) {
    const jdWords = jobDescription
      .toLowerCase()
      .replace(/[^a-z0-9\s#+.-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !COMMON_STOP_WORDS.has(w));

    // Extract unique keywords from JD
    const jdFreqMap = new Map<string, number>();
    jdWords.forEach(w => jdFreqMap.set(w, (jdFreqMap.get(w) || 0) + 1));

    // Top keywords appearing 2+ times
    const topJdKeywords = Array.from(jdFreqMap.entries())
      .filter(([_, count]) => count >= 1)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word)
      .slice(0, 15);

    // Full text of user resume
    const fullResumeText = [
      personalInfo.jobTitle,
      summary,
      ...workExperiences.flatMap(e => [e.jobTitle, e.company, ...(e.bullets || [])]),
      ...skillCategories.flatMap(s => [s.category, ...s.items]),
      ...projects.flatMap(p => [p.name, p.description, ...(p.technologies || [])])
    ].join(' ').toLowerCase();

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    topJdKeywords.forEach(kw => {
      if (fullResumeText.includes(kw)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const matchRatio = topJdKeywords.length > 0 ? matchedKeywords.length / topJdKeywords.length : 1;
    keywordScore = Math.round(matchRatio * 10);

    keywordAnalysis = {
      matchedKeywords,
      missingKeywords,
      matchPercentage: Math.round(matchRatio * 100)
    };

    if (missingKeywords.length > 0) {
      improvements.push({
        id: 'missing-jd-keywords',
        severity: 'warning',
        title: `Missing Job Keywords (${missingKeywords.length})`,
        description: `Consider adding missing target keywords: ${missingKeywords.slice(0, 5).join(', ')}.`,
        tabKey: 'skills'
      });
    }
  }

  // Calculate overall score (0-100)
  const rawTotal = completenessScore + actionWordScore + metricsScore + formatScore + keywordScore;
  const totalScore = Math.min(100, Math.max(0, rawTotal));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 60) grade = 'C';

  const categories: AtsCategoryScore[] = [
    {
      name: 'Section Completeness',
      score: completenessScore,
      maxScore: 25,
      status: completenessScore >= 20 ? 'excellent' : completenessScore >= 15 ? 'good' : 'needs_work',
      feedback: `${completenessScore}/25 pts — Essential contact, summary, experience, and education headers.`
    },
    {
      name: 'Power Action Verbs',
      score: actionWordScore,
      maxScore: 25,
      status: actionWordScore >= 20 ? 'excellent' : actionWordScore >= 12 ? 'good' : 'needs_work',
      feedback: `${actionVerbCount} power action verbs detected at start of bullets.`
    },
    {
      name: 'Quantifiable Metrics & Results',
      score: metricsScore,
      maxScore: 25,
      status: metricsScore >= 20 ? 'excellent' : metricsScore >= 12 ? 'good' : 'needs_work',
      feedback: `${metricsBulletCount} bullet points feature numbers, percentages, or metrics.`
    },
    {
      name: 'Format & ATS Safety',
      score: formatScore,
      maxScore: 15,
      status: formatScore >= 12 ? 'excellent' : 'good',
      feedback: `${theme.template.toUpperCase()} layout template compatibility.`
    },
    {
      name: 'Target Job Keyword Alignment',
      score: keywordScore,
      maxScore: 10,
      status: keywordScore >= 8 ? 'excellent' : keywordScore >= 5 ? 'good' : 'needs_work',
      feedback: keywordAnalysis ? `${keywordAnalysis.matchPercentage}% keyword match with target job.` : 'Paste a Job Description to enable keyword matching.'
    }
  ];

  return {
    totalScore,
    grade,
    categories,
    strengths,
    improvements,
    actionVerbCount,
    metricsBulletCount,
    keywordAnalysis
  };
}
