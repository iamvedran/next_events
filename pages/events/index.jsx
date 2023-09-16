import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventsPage(proprs) {
    const {events} = proprs;
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        router.push(`/events/${year}/${month}`);
    }
    
    return (
        <>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find events to attend" />
                <meta name="keywords" content="events, attend" />
                <meta name="author" content="Vedran" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="en" />
                <meta name="revisit-after" content="1 days" />
            </Head>
            <EventsSearch OnSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    );
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default AllEventsPage;