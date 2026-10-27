import type { ContentKey } from '../data/content';

export type Field =
{ name: string; label: string; type: 'text' | 'textarea' | 'url' | 'media' | 'checkbox'; hint?: string; } |
{ name: string; label: string; type: 'select'; options: string[]; } |
{ name: string; label: string; type: 'tags' | 'strings'; hint?: string; } |
{ name: string; label: string; type: 'list'; fields: Field[]; itemTitle: string; };

export type Section = {
  key: ContentKey;
  title: string;
  group: string;
  description?: string;
} & (
{ kind: 'object'; fields: Field[]; } |
{ kind: 'list'; fields: Field[]; itemTitle: string; } |
{ kind: 'strings'; });

const text = (name: string, label: string, hint?: string): Field => ({ name, label, type: 'text', hint });
const area = (name: string, label: string): Field => ({ name, label, type: 'textarea' });
const url = (name: string, label: string): Field => ({ name, label, type: 'url' });
const media = (name: string, label: string, hint?: string): Field => ({ name, label, type: 'media', hint });

export const sections: Section[] = [
{
  key: 'profile', title: 'Profile & contact', group: 'General', kind: 'object',
  description: 'Your name, role and contact links used across the whole site.',
  fields: [
  text('name', 'Full name'), text('firstName', 'First name'), text('role', 'Role / title'), area('bio', 'Short bio'),
  text('email', 'Email'), text('location', 'Location'), url('github', 'GitHub URL'), url('linkedin', 'LinkedIn URL'), url('resumeUrl', 'CV / resume link')]

},
{
  key: 'images', title: 'Photos & videos', group: 'General', kind: 'object',
  fields: [
  media('profile', 'Profile photo', 'Shown in About and Contact'), media('showreel', 'Showreel video', 'Hero and "How it’s built" sections'),
  media('heroBg', 'Hero poster image'), media('heroPortrait', 'Showreel poster image'), media('podcast', '"How it’s built" poster image'),
  media('devices', 'Services section image')]

},
{
  key: 'hero', title: 'Hero', group: 'Home', kind: 'object',
  fields: [
  { name: 'lines', label: 'Headline lines', type: 'list', itemTitle: 'text', fields: [text('text', 'White text'), text('accent', 'Orange word')] },
  { name: 'subtitle', label: 'Subtitle lines', type: 'strings' }]

},
{ key: 'ghostWords', title: 'Rotating hero words', group: 'Home', kind: 'strings', description: 'The big faded words that cycle at the bottom of the hero.' },
{
  key: 'techStack', title: 'Tech marquee', group: 'Home', kind: 'list', itemTitle: 'name',
  fields: [text('name', 'Name'), text('className', 'Style classes', 'Advanced: Tailwind classes for the logo text')]
},
{ key: 'whatIBuild', title: 'Who I work with', group: 'Home', kind: 'strings' },
{
  key: 'workWithMe', title: 'Not for everyone', group: 'Home', kind: 'list', itemTitle: 'text',
  fields: [text('text', 'Line'), text('link', 'Link text'), text('href', 'Link target', 'e.g. #contact'), { name: 'tone', label: 'Colour', type: 'select', options: ['brand', 'ink'] }]
},
{
  key: 'story', title: 'About story', group: 'About', kind: 'object',
  fields: [
  { name: 'kicker', label: 'Opening lines', type: 'strings', hint: 'Alternate black / orange' },
  { name: 'lines', label: 'Story lines', type: 'strings' },
  text('statsLead', 'Highlighted words in “From a … to:”'),
  { name: 'today', label: 'Closing lines', type: 'strings' }]

},
{
  key: 'stats', title: 'Milestones', group: 'About', kind: 'list', itemTitle: 'text',
  fields: [text('text', 'Text'), { name: 'icon', label: 'Icon', type: 'select', options: ['rocket', 'globe', 'trophy', 'store', 'users'] }, { name: 'highlight', label: 'Highlight in orange', type: 'checkbox' }]
},
{ key: 'thenCameTags', title: '“Then came” tags', group: 'About', kind: 'strings' },
{
  key: 'education', title: 'Education', group: 'About', kind: 'list', itemTitle: 'degree',
  fields: [text('degree', 'Degree'), text('institution', 'Institution'), text('period', 'Period'), text('status', 'Status')]
},
{
  key: 'startup', title: 'Startup', group: 'Startup', kind: 'object',
  fields: [
  text('name', 'Company name'), text('category', 'Category'), media('logo', 'Logo'), url('url', 'Website'),
  area('description', 'Description'), area('mission', 'Mission'),
  { name: 'vitals', label: 'Company vitals', type: 'list', itemTitle: 'label', fields: [text('label', 'Label'), text('value', 'Value')] }]

},
{
  key: 'startupProjects', title: 'Startup projects', group: 'Startup', kind: 'list', itemTitle: 'title',
  fields: [text('title', 'Title'), text('tag', 'Short description'), media('image', 'Image'), text('group', 'Filter group', 'e.g. Client work'), text('client', 'Client badge', 'Optional, e.g. SLIIT')]
},
{
  key: 'projects', title: 'Projects', group: 'Work', kind: 'list', itemTitle: 'name',
  fields: [
  text('id', 'ID', 'Unique, no spaces'), text('name', 'Name'), text('category', 'Category'), text('type', 'Type', 'e.g. Client project'), text('year', 'Year (optional)'),
  area('description', 'Description'), media('media', 'Image or video'), { name: 'stack', label: 'Tech stack', type: 'tags' },
  url('liveUrl', 'Live demo URL'), url('githubUrl', 'GitHub URL'), url('figmaUrl', 'Figma URL')]

},
{
  key: 'experience', title: 'Work experience', group: 'Work', kind: 'list', itemTitle: 'position',
  description: 'Roles with highlights also appear in the rotating About card.',
  fields: [
  text('position', 'Position'), text('company', 'Company'), text('location', 'Location'), text('period', 'Period'), text('initials', 'Initials', '2 letters for the badge'),
  area('description', 'Summary'), { name: 'highlights', label: 'Highlights', type: 'strings' }]

},
{
  key: 'certifications', title: 'Certifications', group: 'Work', kind: 'list', itemTitle: 'name',
  fields: [text('name', 'Name'), text('issuer', 'Issuer'), text('year', 'Year'), url('url', 'Credential URL')]
},
{
  key: 'services', title: 'Services', group: 'Work', kind: 'list', itemTitle: 'title',
  fields: [text('title', 'Title'), text('desc', 'Description')]
},
{ key: 'keySkills', title: 'Key skills', group: 'Skills', kind: 'strings' },
{
  key: 'skillGroups', title: 'Skill groups', group: 'Skills', kind: 'list', itemTitle: 'category',
  fields: [text('category', 'Category'), { name: 'skills', label: 'Skills', type: 'tags' }]
}];


/** A blank item for a list, with every field present so the form starts complete. */
export function emptyItem(fields: Field[]): Record<string, unknown> {
  const item: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === 'checkbox') item[f.name] = false;else
    if (f.type === 'tags' || f.type === 'strings' || f.type === 'list') item[f.name] = [];else
    if (f.type === 'select') item[f.name] = f.options[0];else
    item[f.name] = f.name === 'id' ? `item-${Date.now().toString(36)}` : '';
  }
  return item;
}
