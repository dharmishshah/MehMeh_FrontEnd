import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../Style/event.css'

export default class EventRow extends Component{

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event
        }
    }

    getTime() {
        var dt = new Date(this.state.event.start.local);
        var eventMonth = dt.getMonth();
        var eventdate = dt.getDate();
        var eventday = dt.getDay();
        var day;
        switch (eventday) {
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
                break;
            case 0:
                day = "Sunday";
                break;
        }
        var month;
        switch (eventMonth) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
        }
        var st = day + ", " + eventdate + " " + month;
        return st;
    }

    render() {
        return(
            <div className ="col-sm-3" style={{}}>
                <Card className="eventCard">
                    <CardImg className="eventImage" top width="100%" src={this.state.event.logo.url} alt="Card image cap" />
                    <CardBody className="eventBody">
                        <CardTitle className="eventTitle">{this.state.event.name.text}</CardTitle>
                        <CardSubtitle>{this.getTime()}</CardSubtitle>
                        {/*<Button><i className="fa fa-plus"></i></Button>*/}
                    </CardBody>
                </Card>
            </div>
        )
    }

}