import events from './data.json';

const DUMMY_EVENTS = Object.values(events);
console.log({ DUMMY_EVENTS });

export function getFeaturedEvents(events) {
    return events.filter((event) => event.isFeatured);
}

export function getAllEvents() {
    return DUMMY_EVENTS;
}

export function getFilteredEvents(events, dateFilter) {
    const { year, month } = dateFilter;

    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export function getEventById(events, id) {
    return events.find((event) => event.id === id);
}
