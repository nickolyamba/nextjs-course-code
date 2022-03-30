import { getFeaturedEvents, EVENTS_URL } from "../helpers/api-utils";
import EventList from '../components/events/event-list';

function HomePage(props) {
  const featuredEvents = props.featuredEvents;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const featuredEvents = await getFeaturedEvents(EVENTS_URL);

  return {
    props: {
      featuredEvents,
    },
    revalidate: 60,
  };
}

export default HomePage;
