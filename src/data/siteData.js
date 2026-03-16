import {
  aboutPage,
  blogs,
  currentlyConsuming,
  projects,
  suggestedQuestions
} from '../../shared/siteContent.mjs';

const aboutDocument = {
  ...aboutPage,
  keywords: aboutPage.keywords || []
};

const projectDocuments = projects.map((project) => ({
  ...project,
  keywords: project.keywords || []
}));

const blogDocuments = blogs.map((blog) => ({
  ...blog,
  keywords: blog.keywords || []
}));

const titleToSlug = (title) =>
  (title || '').toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');

const consumingDocuments = currentlyConsuming.map((item) => ({
  id: `consuming-${item.id}`,
  type: 'consuming',
  title: item.title,
  name: item.title,
  url: '',
  slug: item.slug || titleToSlug(item.title),
  icon: item.cover,
  color: '#27272a',
  date: '',
  dateAdded: '',
  summary: item.author ? `${item.title} by ${item.author}` : item.title,
  keywords: item.keywords || [],
  fullText: item.author ? `${item.title} ${item.author}` : item.title
}));

export { aboutPage, blogs, currentlyConsuming, projects, suggestedQuestions };

export const searchDocuments = [
  aboutDocument,
  ...projectDocuments,
  ...blogDocuments,
  ...consumingDocuments
];
