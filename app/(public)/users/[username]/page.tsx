import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  Users,
  FileText,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { getUser, getUsernames } from '@/lib/data/users';
import { generateMetadata as genMeta, buildPersonJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

/**
 * Generate metadata for user profile page (SEO)
 */
export async function generateMetadata({ params }: UserProfilePageProps): Promise<Metadata> {
  const { username } = await params;

  try {
    const user = await getUser(username);

    return genMeta({
      title: `${user.name} (@${user.username})`,
      description: user.bio || `View ${user.name}'s profile and contributions`,
      path: `/users/${username}`,
      imageUrl: user.avatar,
      imageAlt: user.name,
      type: 'website',
    });
  } catch {
    return {
      title: 'User Not Found',
    };
  }
}

/**
 * Generate static params for all users (SSG)
 */
export async function generateStaticParams() {
  const usernames = await getUsernames();

  return usernames.map((username) => ({
    username,
  }));
}

/**
 * User profile page component
 */
export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params;

  let user;
  try {
    user = await getUser(username);
  } catch {
    notFound();
  }

  // JSON-LD structured data for SEO
  const personJsonLd = buildPersonJsonLd({
    name: user.name,
    url: user.website,
    imageUrl: user.avatar,
    description: user.bio,
    email: user.email,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Users', path: '/users' },
    { name: user.name, path: `/users/${username}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Cover Image */}
        {user.coverImage && (
          <div className="mb-6 -mt-10 overflow-hidden rounded-lg">
            <Image
              src={user.coverImage}
              alt={`${user.name}'s cover`}
              width={1200}
              height={256}
              className="h-64 w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Profile Header */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {/* Avatar */}
            {user.avatar && (
              <Image
                src={user.avatar}
                alt={user.name}
                width={128}
                height={128}
                className="h-32 w-32 rounded-full border-4 border-background"
                priority
              />
            )}

            {/* User Info */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>

              {/* Bio */}
              {user.bio && <p className="mb-4 text-muted-foreground">{user.bio}</p>}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{user.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                {user.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined{' '}
                    {new Date(user.joinedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              {user.socialLinks && (
                <div className="mt-4 flex gap-3">
                  {user.socialLinks.github && (
                    <a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-secondary p-2 transition-colors hover:bg-secondary/80"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {user.socialLinks.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-secondary p-2 transition-colors hover:bg-secondary/80"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {user.socialLinks.linkedin && (
                    <a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-secondary p-2 transition-colors hover:bg-secondary/80"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{user.stats.posts}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{user.stats.followers.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{user.stats.following.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </div>

        {/* User Activity / Content */}
        <div className="mt-8">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
            <p className="text-muted-foreground">
              No recent activity to display. Check back later!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
