import React from 'react'
import UpcomingEvents from './UpcomingEvents';
import CompletedEvents from './CompletedEvents';
import "./Events.css";

const Events = () => {
  return (
    <div className='events-box'>
        <UpcomingEvents/>
        <CompletedEvents/>
    </div>
  )
}
export default Events;