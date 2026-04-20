export { cn } from './lib/cn';

export {
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonVariantProps,
} from './components/button';

export { Field, type FieldProps } from './components/field';
export { Label, type LabelProps } from './components/label';
export {
  Input,
  Textarea,
  Select,
  inputVariants,
  type InputProps,
  type TextareaProps,
  type SelectProps,
  type InputVariantProps,
} from './components/input';

export { Card, cardVariants, type CardProps } from './components/card';
export { Tag, tagVariants, type TagProps } from './components/tag';
export { Badge, badgeVariants, type BadgeProps } from './components/badge';
export {
  Avatar,
  avatarVariants,
  type AvatarProps,
} from './components/avatar';

export {
  Header,
  HeaderInner,
  HeaderLeft,
  HeaderLogo,
  HeaderLogoIcon,
  HeaderNav,
  HeaderNavLink,
  HeaderRight,
  type HeaderNavLinkProps,
} from './components/header';
export { SearchBar, type SearchBarProps } from './components/search-bar';

export { PostCard, type PostCardProps } from './components/post-card';
export { Upvote, type UpvoteProps } from './components/upvote';
export { Comment, type CommentProps } from './components/comment';
export {
  LeaderboardRow,
  LeaderboardStat,
  type LeaderboardRowProps,
} from './components/leaderboard-row';
export {
  ProfileCard,
  ProfileStat,
  type ProfileCardProps,
} from './components/profile-card';
export { CourseCard, type CourseCardProps } from './components/course-card';
export { StatsCard, type StatsCardProps } from './components/stats-card';

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './components/dialog';
export { Toaster, type ToasterProps } from './components/toaster';
export { toast } from 'sonner';

export {
  ChartShell,
  ThemedLineChart,
  type ChartShellProps,
  type ThemedLineChartDatum,
  type ThemedLineChartProps,
} from './components/chart-shell';

/** Library version (npm); bump with releases. */
export const ROAR_UI_VERSION = '0.5.1';
