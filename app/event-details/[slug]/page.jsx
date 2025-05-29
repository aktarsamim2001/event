import EventDetails from "../../page/EventDetails/EventDetails.jsx";

export default function EventDetailsPage({ params }) {
  // You can pass the slug as a prop if needed
  return <EventDetails slug={params.slug} />;
}
