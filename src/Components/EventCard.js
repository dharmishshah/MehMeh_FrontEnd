import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/event.css'
import AdminServiceClient from "../Services/AdminServiceClient";

export default class EventCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event
        }
    }

    render() {
        return(
            <div className ="col-sm-3" >
                <Card className="eventCard">
                    <CardImg className="eventImage" top width="100%" src={this.state.event.eventImage} alt="Card image cap" />
                    <CardBody className="eventBody">
                        {/*<CardTitle className="eventTitle"></CardTitle>*/}
                        <CardTitle>{this.state.event.eventName}</CardTitle>
                        <CardSubtitle>{this.state.event.eventDescription}</CardSubtitle>
                        {/*<Button><i className="fa fa-plus"></i></Button>*/}
                    </CardBody>
                    <a className="btn btn-danger" onClick={() => {this.props.deleteEvent(this.state.event.id)}}>Delete Event</a>
                </Card>
            </div>
        )
    }
}