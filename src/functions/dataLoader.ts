import { loadMarkdownFile } from './markdownParser';

interface PersonalInfo {
  name: string;
  affiliation: {
    university: string;
    faculty: string;
    lab: {
      name: string;
      url: string;
    };
  };
  year: string;
  contact: {
    email: string;
    github: {
      username: string;
      url: string;
    };
  };
  toeic: number;
  certifications: string[];
}

interface TechEvent {
  name: string;
  award: string;
  date: {
    year: number;
    month: number;
  };
}

interface TechStack {
  frontend: string[];
  backend: string[];
  mobile: string[];
  infrastructure: string[];
  database: string[];
  other: string[];
}

interface Project {
  title: string;
}

interface DevelopmentExperience {
  events: TechEvent[];
  techStack: TechStack;
  projects: Project[];
}

interface Paper {
  title: string;
  authors: string;
  conference: string;
  abstract: string;
}

interface ResearchHistory {
  keywords: string[];
  papers: Paper[];
  researchContent?: string;
}

interface Internship {
  company: string;
  period: string;
  position: string;
  content?: string;
  techStack?: string[];
  endDate: string;
}

const extractLinkInfo = (text: string) => {
  const match = text?.match(/\[(.*?)\]\((.*?)\)/);
  return match ? { name: match[1], url: match[2] } : { name: text || '', url: '' };
};

const extractGitHubInfo = (text: string) => {
  const match = text?.match(/\[@(.*?)\]\((.*?)\)/);
  return match ? { username: `@${match[1]}`, url: match[2] } : { username: text || '', url: '' };
};

const normalizeArray = (value: any): string[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export async function loadPersonalInfo(): Promise<PersonalInfo> {
  const data = await loadMarkdownFile('/data/personal-info.md');
  const info = data['基本情報'] || {};
  
  const lab = extractLinkInfo(info['研究室']);
  const github = extractGitHubInfo(info['GitHub']);

  return {
    name: info['氏名'] || '',
    affiliation: {
      university: info['大学'] || '',
      faculty: info['学部・学科'] || '',
      lab
    },
    year: info['学年'] || '',
    contact: {
      email: info['メール'] || '',
      github
    },
    toeic: parseInt(info['TOEIC']?.replace('点', '') || '0'),
    certifications: normalizeArray(info['資格'])
  };
}

const parseTechEvent = (name: string, details: string): TechEvent | null => {
  const match = details.match(/(.*?)\s*\((\d{4})年(\d{1,2})月\)/);
  return match ? {
    name,
    award: match[1],
    date: { year: parseInt(match[2]), month: parseInt(match[3]) }
  } : null;
};

const techCategoryMap: Record<string, keyof TechStack> = {
  'フロントエンド': 'frontend',
  'バックエンド': 'backend',
  'モバイル': 'mobile',
  'インフラ': 'infrastructure',
  'データベース': 'database',
  'その他': 'other'
};

const parseTechStackData = (stackData: any): TechStack => {
  const result: TechStack = {
    frontend: [],
    backend: [],
    mobile: [],
    infrastructure: [],
    database: [],
    other: []
  };

  for (const [category, techs] of Object.entries(stackData)) {
    if (typeof techs === 'string') {
      const mappedCategory = techCategoryMap[category];
      if (mappedCategory) {
        result[mappedCategory] = techs.split(/[,、]\s*/).map((tech: string) => tech.trim());
      }
    }
  }

  return result;
};

const parseProjects = (projectData: any): Project[] => {
  const projects: Project[] = [];

  if (typeof projectData === 'object' && !Array.isArray(projectData)) {
    for (const projectName of Object.keys(projectData)) {
      projects.push({ title: projectName });
    }
  } else if (Array.isArray(projectData)) {
    for (const item of projectData) {
      if (typeof item === 'string') {
        const title = item.replace(/^-\s*/, '').trim();
        if (title) {
          projects.push({ title });
        }
      }
    }
  }

  return projects;
};

export async function loadDevelopmentExperience(): Promise<DevelopmentExperience> {
  const data = await loadMarkdownFile('/data/development-experience.md');
  const appDev = data['アプリ開発経験'] || {};

  const events = Object.entries(appDev['技術系イベント受賞歴'] || {})
    .map(([name, details]) => typeof details === 'string' ? parseTechEvent(name, details) : null)
    .filter((event): event is TechEvent => event !== null);

  return {
    events,
    techStack: parseTechStackData(appDev['技術スタック'] || {}),
    projects: parseProjects(appDev['個人開発プロジェクト'] || {})
  };
}

const parseKeywords = (keywordsList: any[]): string[] => {
  return keywordsList
    .filter(keyword => typeof keyword === 'string')
    .map(keyword => keyword.replace(/^-\s*/, ''));
};

const parsePaper = (publication: any): Paper | null => {
  if (typeof publication !== 'object' || !publication.発表会議) {
    return null;
  }

  return {
    title: publication.name?.replace(/^\d+\.\s*"?(.+?)"?$/, '$1') || publication.name || '',
    authors: publication.著者 || '',
    conference: publication.発表会議 || '',
    abstract: publication.アブストラクト || ''
  };
};

export async function loadResearchHistory(): Promise<ResearchHistory> {
  const data = await loadMarkdownFile('/data/research-history.md');
  const research = data['研究内容'] || {};

  const keywords = parseKeywords(research['研究キーワード'] || []);
  const papers = (research['発表済み論文'] || [])
    .map(parsePaper)
    .filter((paper): paper is Paper => paper !== null);

  return {
    keywords,
    papers,
    researchContent: research['研究概要'] || ''
  };
}

const parseEndDate = (period: string): string => {
  if (period?.includes('現在')) {
    return '9999-12-31';
  }
  
  const match = period?.match(/(\d{4})年(\d{1,2})月$/);
  if (match) {
    const year = match[1];
    const month = match[2].padStart(2, '0');
    return `${year}-${month}-31`;
  }
  
  return '0000-00-00';
};

const parseInternshipTechStack = (techData: any): string[] | undefined => {
  if (!techData) return undefined;
  
  const techs = Array.isArray(techData) 
    ? techData 
    : typeof techData === 'string' 
      ? techData.split(/[,、]\s*/) 
      : [];
      
  return techs.length > 0 ? techs : undefined;
};

const parseInternshipData = (data: any): any => {
  if (typeof data === 'object' && !Array.isArray(data)) {
    return data;
  }
  
  if (Array.isArray(data)) {
    const result: any = {};
    for (const item of data) {
      if (typeof item === 'string') {
        const match = item.match(/\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          result[match[1]] = match[2];
        }
      }
    }
    return result;
  }
  
  return {};
};

export async function loadInternshipHistory(): Promise<Internship[]> {
  const data = await loadMarkdownFile('/data/internship-history.md');
  const internshipSection = data['インターンシップ歴'] || {};

  const internships: Internship[] = [];
  
  for (const [companyName, internshipData] of Object.entries(internshipSection)) {
    const info = parseInternshipData(internshipData);
    
    if (info.期間) {
      internships.push({
        company: companyName.replace(/^\d+\.\s*/, '') || '',
        period: info.期間 || '',
        position: info.役職 || '',
        content: info.業務内容,
        techStack: parseInternshipTechStack(info.使用技術),
        endDate: parseEndDate(info.期間)
      });
    }
  }

  return internships.sort((a, b) => b.endDate.localeCompare(a.endDate));
}