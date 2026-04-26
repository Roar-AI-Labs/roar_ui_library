export const themes = ['light', 'dark'] as const;
export const palettes = ['neutral', 'slate', 'teal', 'violet', 'amber', 'rose'] as const;

export type Theme = (typeof themes)[number];
export type Palette = (typeof palettes)[number];
export type Page =
  | 'components'
  | 'forms'
  | 'display'
  | 'layout'
  | 'product'
  | 'overlays'
  | 'charts'
  | 'dashboard';

export type ComponentLink = {
  label: string;
  href: string;
};

export type ComponentGroup = {
  label: string;
  page: Page;
  href: string;
  description: string;
  links: ComponentLink[];
};

export const componentGroups: ComponentGroup[] = [
  {
    label: 'Actions',
    page: 'components',
    href: './index.html',
    description: 'Command controls and button states.',
    links: [{ label: 'Button', href: './index.html#button' }],
  },
  {
    label: 'Forms',
    page: 'forms',
    href: './forms.html',
    description: 'Inputs, labels, helper text, and validation states.',
    links: [
      { label: 'Field', href: './forms.html#field' },
      { label: 'Label', href: './forms.html#label' },
      { label: 'Input', href: './forms.html#input' },
      { label: 'Select', href: './forms.html#select' },
      { label: 'Textarea', href: './forms.html#textarea' },
    ],
  },
  {
    label: 'Display',
    page: 'display',
    href: './display.html',
    description: 'Cards, tags, badges, and identity marks.',
    links: [
      { label: 'Card', href: './display.html#card' },
      { label: 'Tag', href: './display.html#tag' },
      { label: 'Badge', href: './display.html#badge' },
      { label: 'Avatar', href: './display.html#avatar' },
    ],
  },
  {
    label: 'Layout',
    page: 'layout',
    href: './layout.html',
    description: 'Header and search structure.',
    links: [
      { label: 'Header', href: './layout.html#header' },
      { label: 'SearchBar', href: './layout.html#search-bar' },
    ],
  },
  {
    label: 'Product',
    page: 'product',
    href: './product.html',
    description: 'Roar-specific app blocks.',
    links: [
      { label: 'PostCard', href: './product.html#post-card' },
      { label: 'Upvote', href: './product.html#upvote' },
      { label: 'Comment', href: './product.html#comment' },
      { label: 'LeaderboardRow', href: './product.html#leaderboard-row' },
      { label: 'ProfileCard', href: './product.html#profile-card' },
      { label: 'CourseCard', href: './product.html#course-card' },
      { label: 'StatsCard', href: './product.html#stats-card' },
    ],
  },
  {
    label: 'Overlays',
    page: 'overlays',
    href: './overlays.html',
    description: 'Dialog and toast feedback.',
    links: [
      { label: 'Dialog', href: './overlays.html#dialog' },
      { label: 'Toaster', href: './overlays.html#toaster' },
      { label: 'toast', href: './overlays.html#toast' },
    ],
  },
  {
    label: 'Charts',
    page: 'charts',
    href: './charts.html',
    description: 'Chart shells and token-aware line charts.',
    links: [
      { label: 'ChartShell', href: './charts.html#chart-shell' },
      { label: 'ThemedLineChart', href: './charts.html#themed-line-chart' },
    ],
  },
];

export const trafficData = [
  { name: 'Mon', value: 240 },
  { name: 'Tue', value: 310 },
  { name: 'Wed', value: 290 },
  { name: 'Thu', value: 420 },
  { name: 'Fri', value: 380 },
  { name: 'Sat', value: 450 },
  { name: 'Sun', value: 520 },
];

export const retentionData = [
  { name: 'Jan', value: 72 },
  { name: 'Feb', value: 74 },
  { name: 'Mar', value: 77 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 84 },
  { name: 'Jun', value: 86 },
];

export const revenueData = [
  { name: 'Q1', value: 48 },
  { name: 'Q2', value: 56 },
  { name: 'Q3', value: 64 },
  { name: 'Q4', value: 73 },
];
