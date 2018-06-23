import React, { Component } from 'react';
import EventService from "../Services/EventService";
import EventRow from "../Components/EventRow"
import LocalEventRow from '../Components/LocalEventRow'
import '../style/event.css'
import {Carousel} from 'react-responsive-carousel'

export default class EventList extends Component {
    constructor() {
        super();
        this.state = {
            events:[],
            localEvents:[]
        };
        this.eventService = EventService.instance;
        this

    }

    componentDidMount() {
        this.findEvents();
        this.findLocalEvents();
    }

    findEvents() {
        this.eventService.findEvents().then(events => {
            this.setState({events: events.events})
        });
    }

    findLocalEvents() {
        this.eventService.findAllLocalEvents()
            .then(events => {
                this.setState({localEvents : events.events})
            })
    }

    render() {
        return(
            <div className="eventContainer">
                    <div className="row">
                    <div className="card-deck">
                        {this.state.localEvents.map(event => {
                            return(
                                <LocalEventRow event={event} listItems = "true" key={event.id}/>
                            )
                        })}
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