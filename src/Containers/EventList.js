import React, { Component } from 'react';
import EventService from "../Services/EventService";
import EventRow from "../Components/EventRow"
import '../style/event.css'

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
            <div className="eventContainer">
                <div className="row">


                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="" alt="First slide"></img>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="" alt="Second slide"></img>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="" alt="Third slide"></img>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                           data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                           data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

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