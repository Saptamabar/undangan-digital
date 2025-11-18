import { db, type Guest } from '@/lib/db'; 
import WeddingPage from '@/app/components/WeddingPage'; 
import { notFound } from 'next/navigation';
import { getGuestbookEntries, type GuestbookEntry } from '@/app/actions';

type PageProps = {
  params: Promise<{
    slug: string;
  }>
};

async function getGuestBySlug(slug: string): Promise<Guest | null> {
  try {
    const result = await db`SELECT * FROM Guest WHERE slug = ${slug}`;

    if (result.length === 0) {
      return null;
    }
    const guest = result[0] as Guest;
    return guest;

  } catch (error) {
    console.error("Database query failed:", error);
    return null;
  }
}

export default async function InvitationPage(props: PageProps) {
  
  const { slug } = await props.params; 

  const [guest, entries] = await Promise.all([
    getGuestBySlug(slug),
    getGuestbookEntries(3) 
  ]);

  if (!guest) {
    notFound();
  }

  return (
    <WeddingPage 
      guestName={guest.name} 
      slug={slug}
      initialEntries={entries}
    />
  );
}

export async function generateMetadata(props: PageProps) {
  
  const { slug } = await props.params; 
  
  const guest = await getGuestBySlug(slug);

  return {
    title: `The Wedding of M & R - Undangan untuk ${guest?.name || 'Tamu'}`,
    description: 'Kami mengundang Anda untuk hadir di pernikahan kami.',
  };
}