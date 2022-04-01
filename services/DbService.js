function DbService(dbObj) {
    const db = dbObj;
    const eventsTable = 'events';

    return {
        async getComments(eventId) {
            return Promise.resolve(Object.values(db[eventsTable][eventId].comments));
        },

        async addComment(eventId, data) {
            if (!db[eventsTable]) {
                db[eventsTable] = {};

                if (!db[eventsTable][eventId]) {
                    db[eventsTable][eventId] = {
                        comments: {},
                    };
                }
            }

            db[eventsTable][eventId].comments[data.id] = data;

            return Promise.resolve(data);
        },
    };
}

const initObj = {
    events: {
        e2: {
            comments: {
                2345: {
                    id: '2345',
                    email: 'nick@gmail.com',
                    name: 'nick nick',
                    text: 'dsfdsfds',
                },
            },
        },
    },
};

export default DbService(initObj);
