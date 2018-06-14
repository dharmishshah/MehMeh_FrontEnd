import React, { Component } from 'react';
import EventService from "../Services/EventService";
import EventRow from "../Components/EventRow"

export default class EventList extends Component {
    constructor() {
        super();
        this.state = {
            events:[]
        };
        this.eventService = EventService.instance;
    }

    componentDidMount() {
        this.findEvents();
    }

    findEvents() {
        this.eventService.findEvents().then(events => {
            this.setState({events: events.events})
        });
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="card-deck">
                        {this.state.events.map(event => {
                           return(
                               <EventRow event={event} key={event.id}/>
                           )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}