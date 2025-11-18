import type { UserProfile } from '@/types/content';
import { notFound } from 'next/navigation';

// Mock user data
const mockUsers: UserProfile[] = [
  {
    id: '1',
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Full-stack developer | Open source enthusiast | Building cool stuff with React & Next.js',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    email: 'john@example.com',
    website: 'https://johndoe.dev',
    location: 'San Francisco, CA',
    joinedAt: '2022-01-15T00:00:00Z',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    stats: {
      followers: 1234,
      following: 567,
      posts: 89,
    },
  },
  {
    id: '2',
    username: 'janesmith',
    name: 'Jane Smith',
    bio: 'UI/UX Designer & Frontend Developer | Making the web beautiful one pixel at a time',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    website: 'https://janesmith.design',
    location: 'New York, NY',
    joinedAt: '2021-06-10T00:00:00Z',
    socialLinks: {
      twitter: 'https://twitter.com/janesmith',
      github: 'https://github.com/janesmith',
    },
    stats: {
      followers: 2456,
      following: 432,
      posts: 156,
    },
  },
  {
    id: '3',
    username: 'mikejohnson',
    name: 'Mike Johnson',
    bio: 'Backend Engineer | Node.js & Go enthusiast | Cloud architecture expert',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    location: 'Seattle, WA',
    joinedAt: '2020-03-20T00:00:00Z',
    socialLinks: {
      github: 'https://github.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson',
    },
    stats: {
      followers: 3421,
      following: 890,
      posts: 234,
    },
  },
];

/**
 * Get all users
 */
export async function getUsers(options?: { limit?: number }): Promise<UserProfile[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let users = [...mockUsers];

  if (options?.limit) {
    users = users.slice(0, options.limit);
  }

  return users;
}

/**
 * Get a single user by username
 */
export async function getUser(username: string): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const user = mockUsers.find((u) => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    notFound();
  }

  return user;
}

/**
 * Get all usernames for static generation
 */
export async function getUsernames(): Promise<string[]> {
  return mockUsers.map((u) => u.username);
}
