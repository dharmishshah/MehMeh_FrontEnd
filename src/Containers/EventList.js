import React, { Component } from 'react';
import EventService from "../Services/EventService";
import UserService from "../Services/UserServiceClient";
import EventRow from "../Components/EventRow"
import LocalEventRow from '../Components/LocalEventRow'
import '../style/event.css'
import {Carousel} from 'react-responsive-carousel'
import cookie from "react-cookies";

export default class EventList extends Component {
    constructor() {
        super();
        this.eventService = EventService.instance;
        this.userService = UserService.instance;

        this.findProfileByUserId();
        this.state = {
            events: [],
            localEvents: [],
            interestedEvents: []
        }
        ;


    }

    componentWillMount() {
        this.findEvents();
        this.findLocalEvents();
        this.findProfileByUserId();

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

    findProfileByUserId(){

        var userId = cookie.load('userId')

        var role = cookie.load('role');

        if("MEME_USER" == role){
            this.userService.findProfileByUserId(userId).then(profile => {
                var interestedEvents = profile.user.interestedEvents;
                this.setState({interestedEvents : interestedEvents})

            })
        }

    }

    render() {
        return(
            <div className="eventContainer">
                    <div className="row">
                    <div className="card-deck">
                        {this.state.localEvents && this.state.localEvents.map(event => {
                            return(
                                <LocalEventRow event={event} listItems = "true" key={event.id} interestedEvents={this.state.interestedEvents}/>
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