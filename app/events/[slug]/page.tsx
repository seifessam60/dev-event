import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  console.log(slug);

  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const data = await response.json();
  const event = data.event;

  if (!event) {
    return notFound();
  }
  return (
    <section id="event">
      <h1>
        Event Details: <br />
        {event.title}
      </h1>
    </section>
  );
};

export default EventDetailsPage;
