import { Fragment } from 'react';

import { getEventById, getFeaturedEvents, EVENTS_URL } from "../../helpers/api-utils";
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const featuredEvents = await getFeaturedEvents(EVENTS_URL);
  const eventPaths = featuredEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: eventPaths,
    // if set to false, will return 404 for any path not in paths
    fallback: true,
  };
}

export const getStaticProps = async (ctx) => {
  const { eventId } = ctx.params;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
};

export default EventDetailPage;
