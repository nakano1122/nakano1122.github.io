interface ParsedData {
  [key: string]: any;
}

export function parseMarkdown(content: string): ParsedData {
  const lines = content.split('\n');
  const result: ParsedData = {};
  let section = '';
  let subsection = '';
  let item: any = {};
  let textBuffer = '';

  const processBoldKeyValue = (text: string, key: string, value: string) => {
    if (item && Object.keys(item).length > 0) {
      if (item[key]) {
        item[key] = Array.isArray(item[key]) ? [...item[key], value] : [item[key], value];
      } else {
        item[key] = value;
      }
    } else if (section && subsection) {
      ensureObjectStructure(section, subsection);
      const target = result[section][subsection];
      target[key] = target[key] ? (Array.isArray(target[key]) ? [...target[key], value] : [target[key], value]) : value;
    } else if (section) {
      ensureSectionIsObject(section);
      const target = result[section];
      target[key] = target[key] ? (Array.isArray(target[key]) ? [...target[key], value] : [target[key], value]) : value;
    }
  };

  const ensureObjectStructure = (sec: string, subsec: string) => {
    if (Array.isArray(result[sec][subsec])) {
      result[sec][subsec] = {};
    }
    if (!result[sec][subsec]) {
      result[sec][subsec] = {};
    }
  };

  const ensureSectionIsObject = (sec: string) => {
    if (typeof result[sec] !== 'object' || Array.isArray(result[sec])) {
      result[sec] = {};
    }
  };

  const finishItem = () => {
    if (item && Object.keys(item).length > 1 && section && subsection) {
      if (!Array.isArray(result[section][subsection])) {
        result[section][subsection] = [];
      }
      result[section][subsection].push({ ...item });
      item = {};
    }
  };

  const flushTextBuffer = () => {
    if (textBuffer.trim() && section) {
      if (subsection && typeof result[section][subsection] === 'undefined') {
        result[section][subsection] = textBuffer.trim();
      } else if (!subsection) {
        result[section] = textBuffer.trim();
      }
    }
    textBuffer = '';
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('# ')) {
      flushTextBuffer();
      finishItem();
      section = trimmedLine.substring(2).trim();
      result[section] = {};
      subsection = '';
    } else if (trimmedLine.startsWith('## ')) {
      flushTextBuffer();
      finishItem();
      subsection = trimmedLine.substring(3).trim();
      if (section) {
        result[section][subsection] = [];
      }
    } else if (trimmedLine.startsWith('### ')) {
      flushTextBuffer();
      finishItem();
      item = { name: trimmedLine.substring(4).trim() };
    } else if (trimmedLine.startsWith('- ')) {
      const listContent = trimmedLine.substring(2).trim();
      const boldMatch = listContent.match(/\*\*(.*?)\*\*:\s*(.*)/);
      
      if (boldMatch) {
        processBoldKeyValue(listContent, boldMatch[1], boldMatch[2]);
      } else if (section && subsection) {
        if (typeof result[section][subsection] !== 'object' || !Array.isArray(result[section][subsection])) {
          result[section][subsection] = [];
        }
        result[section][subsection].push(listContent);
      }
    } else if (trimmedLine && !trimmedLine.startsWith('#')) {
      const boldMatch = trimmedLine.match(/\*\*(.*?)\*\*:\s*(.*)/);
      if (boldMatch) {
        processBoldKeyValue(trimmedLine, boldMatch[1], boldMatch[2]);
      } else {
        textBuffer += trimmedLine + '\n';
      }
    } else if (trimmedLine === '') {
      flushTextBuffer();
      finishItem();
    }
  }

  flushTextBuffer();
  finishItem();

  return result;
}

const fileImports = {
  '/data/personal-info.md': () => import('../../public/data/personal-info.md?raw'),
  '/data/development-experience.md': () => import('../../public/data/development-experience.md?raw'),
  '/data/research-history.md': () => import('../../public/data/research-history.md?raw'),
  '/data/internship-history.md': () => import('../../public/data/internship-history.md?raw')
} as const;

export async function loadMarkdownFile(filename: string): Promise<ParsedData> {
  try {
    const importFn = fileImports[filename as keyof typeof fileImports];
    if (!importFn) {
      console.warn(`Unknown markdown file: ${filename}`);
      return {};
    }

    const module = await importFn();
    return parseMarkdown(module.default);
  } catch (error) {
    console.warn(`Error loading ${filename}:`, error);
    return {};
  }
}