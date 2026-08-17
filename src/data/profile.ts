export type RouteRole = 'cobalt' | 'green' | 'orange' | 'black';

export interface ProfileStation {
  id: 'skills' | 'background' | 'learnings' | 'target';
  label: string;
  route: RouteRole;
  summary: string;
}

export interface SkillGroup {
  title: string;
  items: readonly string[];
}

export interface BackgroundItem {
  title: string;
  meta: string;
  summary: string;
}

export interface LearningItem {
  title: string;
  summary: string;
}

export interface TargetProfile {
  heading: string;
  summary: string;
  location: string;
}

export const profileStations: readonly ProfileStation[] = [
  { id: 'skills', label: 'Skills', route: 'cobalt', summary: 'The tools and practices I can apply.' },
  { id: 'background', label: 'Background', route: 'green', summary: 'The education and work habits I bring.' },
  { id: 'learnings', label: 'Learnings', route: 'orange', summary: 'The principles I am carrying forward.' },
  { id: 'target', label: 'Target', route: 'black', summary: 'The engineering roles I am pursuing.' },
];

export const skillGroups: readonly SkillGroup[] = [
  { title: 'Backend', items: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'REST APIs', 'Repository pattern'] },
  { title: 'Frontend', items: ['Astro', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'AJAX'] },
  { title: 'Testing & quality', items: ['pytest', 'Unit testing', 'End-to-end testing', 'System testing', 'Model evaluation'] },
  { title: 'Deployment & tools', items: ['Git', 'GitHub', 'Docker', 'Render', 'Sanity CMS'] },
  { title: 'Data & ML', items: ['Image processing', 'Classification', 'Feature quality', 'Error analysis'] },
];

export const backgroundItems: readonly BackgroundItem[] = [
  {
    title: 'University of Auckland',
    meta: 'BSc Computer Science · 2023—2026',
    summary: 'Built foundations across software engineering, web development, data, and machine-learning coursework.',
  },
  {
    title: 'Woolworths Stock Assistant',
    meta: 'May 2023—June 2024',
    summary: 'Developed dependable routines, clear communication, and attention to detail in a fast-moving team environment.',
  },
];

export const learningItems: readonly LearningItem[] = [
  { title: 'Design clear boundaries', summary: 'Separating responsibilities makes systems easier to test, change, and explain.' },
  { title: 'Treat testing as delivery', summary: 'Quality work belongs throughout implementation, not only at the end.' },
  { title: 'Make ownership explicit', summary: 'Clear communication and responsibility help teams move together.' },
];

export const targetProfile: TargetProfile = {
  heading: 'Graduate and junior software engineering',
  summary: 'Seeking backend and full-stack opportunities, with data and machine learning as supporting breadth.',
  location: 'Aotearoa New Zealand',
};
