export const EVENTS_URL = 'https://zz-prj-react-default-rtdb.firebaseio.com/events.json';

// https://firebase.google.com/docs/database/rest/retrieve-data
// https://firebase.google.com/docs/database/security/indexing-data

export async function getFeaturedEvents(url) {
    return getEvents(`${url}?orderBy=%22isFeatured%22&equalTo=true`);
}

export async function getEventById(id) {
    // https://zz-prj-react-default-rtdb.firebaseio.com/events.json?print=pretty&orderBy=%22$key%22&equalTo=%22e2%22
    const events = await getEvents(`${EVENTS_URL}?orderBy="$key"&"&equalTo="${id}"`);
    return events[0];
}

export async function getEvents(url) {
    const response = await fetch(url);
    const eventsObj = await response.json();

    const eventsArr = Object.values(eventsObj);
    return eventsArr;
}

export async function getAllEvents(url) {
    const response = await fetch(url);
    const eventsObj = await response.json();

    const eventsArr = Object.values(eventsObj);
    return eventsArr;
}

export async function getFilteredEvents(url, dateFilter) {
    const { year, month } = dateFilter;

    const events = await getAllEvents(url);

    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}
