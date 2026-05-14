/**
 * ドメイン型 re-export
 */

// 共有値オブジェクト
export * from '@/types';

// Profile集約
export * from './profile/types';
export { loadProfile } from './profile/loader';

// JobHistory集約
export * from './jobHistory/types';
export { loadJobHistory } from './jobHistory/loader';

// Research集約
export * from './research/types';
export { loadResearch, loadResearchWithContent } from './research/loader';

// Development集約
export * from './development/types';
export { loadDevelopment, loadDevelopmentWithContent } from './development/loader';

// BlogArticle集約
export * from './blog/types';
export { loadAllBlogArticles, loadBlogArticlesByPlatform } from './blog/service';

// Award集約
export * from './award/types';
export { loadAwards, loadAwardsWithContent } from './award/loader';

// Certification集約
export * from './certification/types';
export { loadCertifications } from './certification/loader';

// Education集約
export * from './education/types';
export { loadEducation, loadEducationWithContent } from './education/loader';
