import React from 'react';
import '../../style/profile.css'
import Dropzone from 'react-dropzone'
import EventService from '../../Services/EventService'

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";


class MyEventsProfile extends React.Component {
    constructor(props) {
        super(props);
        this.eventService = EventService.instance
        this.userService = UserService.instance;
        this.state = {
            profile:this.props.profile,
            events:[]
        }

        console.log(this.props.profile)

        this.dropHandler = this.dropHandler.bind(this)
        this.uploadEventImage = this.uploadEventImage.bind(this)

    }

    componentWillMount() {
        this.findProfileByUserId();

    }

    componentWillReceiveProps(newProps){
        this.setState({profileObj:newProps.profile})

    }

    dropHandler(file) {

        console.log(file)
        var photo = new FormData();
        photo.append('photo', file[0]);
        this.setState({file : file})

    }

    findProfileByUserId(){

        var userId = cookie.load('userId')

        var role = cookie.load('role');

        if("EVENT_USER" == role){
            this.userService.findProfileByUserId(userId).then(profile => {
                var profile1 = profile.user;
                var events = profile.events
                this.setState({profile : profile1})
                this.setState({events:events})
            })
        }



    }

    uploadEventImage(){
        var file = this.state.file;

        var event = {
            eventName :  (this.refs.eventName.value)?  this.refs.eventName.value:"",
            eventDescription :(this.refs.eventDescription.value)?  this.refs.eventDescription.value:"",
            eventFromDate : (this.refs.eventFromDate.value)?  this.refs.eventFromDate.value:"",
            eventToDate : (this.refs.eventToDate.value)?  this.refs.eventToDate.value:"",
            eventType:(this.refs.eventType.value)?  this.refs.eventType.value:""

        }
        this.eventService.uploadEventImage(file,event)
            .then(response => {
                this.findProfileByUserId();
            })

    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="myEvents">
                <div className="user-profile-content">

                    <div className="w3-container w3-margin">
                        <h5><strong>QUICK EVENT UPLOAD</strong></h5>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="name"
                               className="w3-border w3-padding" ref="eventName"></input>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="description"
                               className="w3-border w3-padding" ref="eventDescription"></input>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="event type"
                               className="w3-border w3-padding" ref="eventType"></input>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="from"
                               className="w3-border w3-padding" ref="eventFromDate"></input>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="to"
                               className="w3-border w3-padding" ref="eventToDate"></input>
                        <div style={{ width:'100%',marginBottom : 15}}>
                            <Dropzone style={{width: 'auto', height: 100, borderWidth:
                                    2, borderColor: 'rgb(102, 102, 102)',borderStyle: 'dashed',borderRadius: 5}}
                                      multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                <div style={{textAlign:'center'}} > Select or drop a event.</div>
                            </Dropzone>
                        </div>
                        <button type="button" className="w3-button w3-theme"
                                onClick={this.uploadEventImage}><i
                            className="fa fa-pencil"></i> Upload Event
                        </button>
                    </div>
                    <div className="w3-container w3-margin">
                        <h5><strong>MY EVENTS</strong></h5>
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

export default MyEventsProfile