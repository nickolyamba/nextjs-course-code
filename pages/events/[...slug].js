import { Fragment } from 'react';

import { getFilteredEvents, EVENTS_URL } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function getErrorUi(errorMsg) {
    return (
        <Fragment>
            <ErrorAlert>
                <p>{errorMsg}</p>
            </ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    );
}

function FilteredEventsPage(props) {
    const { events, dateObj, isFilterError } = props;

    if (isFilterError) {
        return getErrorUi(props.errorMsg);
    }

    if (!events || events.length === 0) {
        return getErrorUi('No events found for the chosen filter!');
    }

    const date = new Date(dateObj.year, dateObj.month - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={events} />
        </Fragment>
    );
}

export const getServerSideProps = async (ctx) => {
    const filterParams = ctx.params.slug;

    if (!filterParams || filterParams.length !== 2) {
        return {
            notFound: true,
        };
    }

    const filteredYear = filterParams[0];
    const filteredMonth = filterParams[1];

    const year = +filteredYear;
    const month = +filteredMonth;

    if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
        return {
            props: {
                events: null,
                isError: true,
                errorMsg: 'Invalid filter. Please adjust your values!',
            },
        };
    }

    const dateObj = { year, month };
    const filteredEvents = await getFilteredEvents(EVENTS_URL, dateObj);

    return {
        props: {
            events: filteredEvents,
            dateObj,
        },
    };
};

export default FilteredEventsPage;
