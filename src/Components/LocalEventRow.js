import React from 'react'
import $ from 'jquery'
import '../App.css'
import '../style/advertisement.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import '../style/event.css'

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class LocalAdRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event : this.props.event,
            listEvents : this.props.listItems? this.props.listItems: "false"
        }



    }


    render() {


        if(this.state.listEvents == "false"){
            return(
                <div className="w3-container w3-card w3-white w3-round w3-margin"><br/>
                    <h4><span className="float-left badge customBadge"> EVENT </span> {this.state.event.eventName} </h4><br/>
                    <hr className="w3-clear"/>


                    <img src={this.state.event.eventImage} style={{width:'70%',marginLeft:100}}
                         className="w3-margin-bottom"/>

                    <p>{this.state.event.eventDescription}</p>
                    <p>Date - {this.state.event.eventFromDate}  {this.state.event.eventFromDate}</p>
                </div>
            )

        }else{
            return(
                <div className ="col-sm-3" >
                    <Card className="eventCard">
                        <CardImg className="eventImage" top width="100%" src={this.state.event.eventImage} alt="Card image cap" />
                        <CardBody className="eventBody">
                            <CardTitle className="eventTitle">{this.state.event.eventName}</CardTitle>
                            <CardSubtitle>{this.state.event.eventFromDate} {this.state.event.eventToDate}</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            )
        }

    }
}

export default LocalAdRow;

