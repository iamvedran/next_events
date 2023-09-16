import { useState } from 'react';
import { useRouter } from "next/router";
import useSWR from 'swr';
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import { useEffect } from "react";
import Head from 'next/head';

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filterData = router.query.slug;

    const { data, error } = useSWR(
        'https://nextevents-f9f8b-default-rtdb.europe-west1.firebasedatabase.app/events.json',
        (url) => fetch(url).then(res => res.json())
    );

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }

            setLoadedEvents(events);
        }
    }, [data]);

    let pageHeaderData = <Head>
        <title>Filtered events</title>
        <meta name='description' />
        <meta content='A list of filtered events' />
    </Head>


    if (!loadedEvents) {
        return (
            <>
                {pageHeaderData}
                <p className='center'>Loading...</p>;
            </>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeaderData = (
        <Head>
            <title>Filtered events</title>
            <meta name='description' />
            <meta name='author' content='Vedran' />
            <meta content={`All events for ${numMonth}/${numYear}`} />
        </Head>
    );

    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error) {
        return (
            <>
                {pageHeaderData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>

                <div className='center'>
                    <Button className='btn' link={'/events'}>Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                {pageHeaderData}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>

                <div className='center'>
                    <Button className='btn' link={'/events'}>Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            {pageHeaderData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents}></EventList>
        </>
    );
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterData = params.slug;

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ) {
//         return {
//             props: { hasError: true },
//             // notFound: true,
//             // redirect: {
//             //   destination: '/error'
//             // }
//         };
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth,
//             },
//         },
//     };
// }

export default FilteredEventsPage;