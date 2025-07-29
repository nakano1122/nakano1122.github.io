import { readFileSync } from "fs";
import { join } from "path";

export interface PersonalData {
  name: string;
  affiliation: string;
  grade: string;
  github: string;
  atcoder: string;
  toeic: number;
}

export interface Award {
  title: string;
  event: string;
  date: string;
  rank?: string;
}

export interface TechCategory {
  category: string;
  items: string[];
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string;
  metrics: string;
}

export function parsePersonalInfo(content: string): PersonalData {
  const lines = content.split("\n");
  const personalData: PersonalData = {
    name: "",
    affiliation: "",
    grade: "",
    github: "",
    atcoder: "",
    toeic: 0,
  };

  lines.forEach((line) => {
    if (line.includes("**氏名**:")) {
      personalData.name = line.replace("- **氏名**:", "").trim();
    }
    if (line.includes("**所属**:")) {
      personalData.affiliation = line.replace("- **所属**:", "").trim();
    }
    if (line.includes("**学年**:")) {
      personalData.grade = line.replace("- **学年**:", "").trim();
    }
    if (line.includes("**GitHub**:")) {
      const match = line.match(/\[@(.*?)\]/);
      if (match) {
        personalData.github = match[1];
      }
    }
    if (line.includes("**AtCoder**:")) {
      const match = line.match(/\[@(.*?)\]/);
      if (match) {
        personalData.atcoder = match[1];
      }
    }
    if (line.includes("**TOEIC**:")) {
      const match = line.match(/(\d+)\s*点/);
      if (match) {
        personalData.toeic = parseInt(match[1]);
      }
    }
  });

  return personalData;
}

export function parseDevelopmentExperience(content: string): {
  awards: Award[];
  technologies: TechCategory[];
} {
  const lines = content.split("\n");
  const awards: Award[] = [];
  const technologies: TechCategory[] = [];

  let currentSection = "";

  lines.forEach((line) => {
    if (line.includes("## 受賞歴")) {
      currentSection = "awards";
    } else if (line.includes("## 技術")) {
      currentSection = "tech";
    } else if (line.includes("## 個人開発")) {
      currentSection = "projects";
    } else if (
      currentSection === "awards" &&
      line.trim().startsWith("- **")
    ) {
      // 受賞歴の形式: - **TechSummerCamp2024**: 最優秀賞 (2024 年 9 月)
      const match = line.match(/- \*\*(.*?)\*\*:\s*(.*?)\s*\((.*?)\)/);
      if (match) {
        awards.push({
          title: match[1],
          event: match[2],
          date: match[3],
        });
      }
    } else if (
      currentSection === "tech" &&
      line.trim().startsWith("- **")
    ) {
      const match = line.match(/- \*\*(.*?)\*\*:\s*(.*)/);
      if (match) {
        const category = match[1];
        const items = match[2].split(",").map((t) => t.trim());
        let color = "#8b7cf6";

        if (category.includes("フロントエンド")) color = "#61dafb";
        else if (category.includes("バックエンド")) color = "#68d391";
        else if (category.includes("インフラ")) color = "#fbb6ce";
        else if (category.includes("モバイル")) color = "#a78bfa";

        technologies.push({
          category,
          items,
          color,
        });
      }
    }
  });

  return { awards, technologies };
}

export function parseResearchHistory(content: string) {
  const lines = content.split('\n');
  const publications = [];
  
  let currentSection = '';
  
  lines.forEach(line => {
    if (line.includes('## 発表論文')) {
      currentSection = 'publications';
    } else if (currentSection === 'publications' && line.trim().match(/^\d+\./)) {
      // 論文の形式: 1. **"論文タイトル"**
      const match = line.match(/\d+\.\s*\*\*"(.*?)"\*\*/);
      if (match) {
        publications.push({
          title: match[1],
          date: '2025年3月' // デフォルト値、後で詳細解析可能
        });
      }
    }
  });
  
  return publications;
}

export function parseInternshipHistory(content: string) {
  const lines = content.split('\n');
  const internships = [];
  
  let currentInternship = null;
  
  lines.forEach(line => {
    if (line.match(/^## \d+\./)) {
      // インターンシップの開始: ## 1. 会社名
      const match = line.match(/^## \d+\.\s*(.*)/);
      if (match) {
        if (currentInternship) {
          internships.push(currentInternship);
        }
        currentInternship = {
          company: match[1],
          period: '',
          description: ''
        };
      }
    } else if (currentInternship && line.includes('**期間**:')) {
      // 期間の抽出
      const match = line.match(/\*\*期間\*\*:\s*(.*)/);
      if (match) {
        currentInternship.period = match[1];
      }
    }
  });
  
  // 最後のインターンシップを追加
  if (currentInternship) {
    internships.push(currentInternship);
  }
  
  return internships;
}

export function parseMarkdownSections(content: string): {
  awards: Award[];
  technologies: TechCategory[];
  projects: Project[];
} {
  const sections = content.split("## ");
  const awards: Award[] = [];
  const technologies: TechCategory[] = [];
  const projects: Project[] = [];

  sections.forEach((section) => {
    if (section.includes("受賞歴")) {
      const lines = section
        .split("\n")
        .filter((line) => line.trim().startsWith("-"));
      lines.forEach((line) => {
        const match = line.match(/\*\*(.*?)\*\*:\s*(.*?)\s*\((.*?)\)/);
        if (match) {
          awards.push({
            title: match[1],
            event: match[2],
            date: match[3],
            rank: match[2].includes("最優秀")
              ? "1st"
              : match[2].includes("企業")
              ? "Special"
              : "1st",
          });
        }
      });
    }

    if (section.includes("技術スタック")) {
      const lines = section
        .split("\n")
        .filter((line) => line.trim().startsWith("-"));
      lines.forEach((line) => {
        const match = line.match(/\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          const category = match[1];
          const items = match[2].split(",").map((item) => item.trim());
          let color = "#8b7cf6";

          if (category.includes("フロントエンド")) color = "#61dafb";
          else if (category.includes("バックエンド")) color = "#68d391";
          else if (category.includes("インフラ")) color = "#fbb6ce";
          else if (category.includes("モバイル")) color = "#a78bfa";

          technologies.push({
            category,
            items,
            color,
          });
        }
      });
    }

    if (section.includes("個人開発プロジェクト")) {
      const projectMatches = section.match(
        /\d+\.\s*\*\*(.*?)\*\*\s*-\s*(.*?)(?=\n|$)/g
      );
      if (projectMatches) {
        projectMatches.forEach((match) => {
          const parts = match.match(/\d+\.\s*\*\*(.*?)\*\*\s*-\s*(.*)/);
          if (parts) {
            projects.push({
              name: parts[1],
              description: parts[2],
              tech: "詳細は準備中",
              metrics: "準備中",
            });
          }
        });
      }
    }
  });

  return { awards, technologies, projects };
}


export function parseLastUpdated(content: string): string {
  const lines = content.split("\n");
  let lastUpdated = "";

  lines.forEach((line) => {
    if (line.includes("最終更新日:")) {
      lastUpdated = line.replace("最終更新日:", "").trim();
    }
  });

  return lastUpdated || "2024年7月28日";
}

export function parsePersonalName(content: string): string {
  const lines = content.split("\n");
  let name = "中野暁登";

  lines.forEach((line) => {
    if (line.includes("**氏名**:")) {
      name = line.replace("- **氏名**:", "").trim();
    }
  });

  return name;
}

export function loadMarkdownData() {
  const personalInfoPath = join(process.cwd(), "src/data/personal-info.md");
  const developmentExperiencePath = join(
    process.cwd(),
    "src/data/development-experience.md"
  );
  const researchHistoryPath = join(
    process.cwd(),
    "src/data/research-history.md"
  );
  const internshipHistoryPath = join(
    process.cwd(),
    "src/data/internship-history.md"
  );
  const lastUpdatedPath = join(process.cwd(), "src/data/last-updated.md");

  return {
    personalInfo: readFileSync(personalInfoPath, "utf-8"),
    developmentExperience: readFileSync(developmentExperiencePath, "utf-8"),
    researchHistory: readFileSync(researchHistoryPath, "utf-8"),
    internshipHistory: readFileSync(internshipHistoryPath, "utf-8"),
    lastUpdated: readFileSync(lastUpdatedPath, "utf-8"),
  };
}
