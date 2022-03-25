import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';
// import dataMock from '../dataMock';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    async function fetchData() {
        setIsLoading(true);

        const data = await fetch(
          "https://zz-prj-react-default-rtdb.firebaseio.com/meetups.json"
        );

        const responseJson = await data.json();

        const meetups = [];

        for (const [key, meetupObj] of Object.entries(responseJson)) {
          const meetup = {
            id: key,
            ...meetupObj,
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
    };

    fetchData();
    
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
