import React from 'react';
import '../../style/profile.css'
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


class InterestedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance
        this.state = {
            profile : this.props.profile,
            events:[]
        }


    }

    componentWillMount() {
    this.findProfileByUserId()

    }

    findProfileByUserId(){

        var userId = cookie.load('userId')

        this.userService.findProfileByUserId(userId).then(profile => {
            var profile1 = profile.user;
            this.setState({profile : profile1, events: profile1.interestedEvents})

        })

    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="interestedEvents">
                <div className="user-profile-content">
                    <div className="w3-container w3-margin">
                        <h5><strong>INTERESTED EVENTS</strong></h5>
                        <div className="row">
                            {this.state.events.map((event) =>(
                                <div className ="col-sm-6" >

                                    <Card className="eventCard">
                                        <CardImg className="eventImage" top width="100%" src={event.eventImage}/>
                                        <CardBody className="eventBody">
                                            <CardTitle className="eventTitle">{event.eventName} </CardTitle>
                                            <CardSubtitle>{event.eventDescription}</CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}

                        </div>
                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default InterestedEvents