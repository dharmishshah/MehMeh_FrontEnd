import React from 'react';
import '../index.css';
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';

import MemeRow from '../Components/MemeRow'
import LocalEventRow from '../Components/LocalEventRow'
import EventService from '../Services/EventService'
import Dropzone from 'react-dropzone'


class LocalEventList extends React.Component {
    constructor() {
        super();
        this.eventService = EventService.instance;
        this.state = {
            localEvents : []
        };

        this.dropHandler = this.dropHandler.bind(this)
        this.uploadEventImage = this.uploadEventImage.bind(this)


    }

    componentWillMount() {
        this.findAllLocalEvents();

    }


    findAllLocalEvents(){
        this.eventService.findAllLocalEvents()
            .then(events => {
                this.setState({localEvents : events.events})
            })
    }

    eventRows(){
        var rows = this.state.localEvents.map((event) => {
            return (
                <LocalEventRow event={event} key={event.id}/>
            )

        });
        return (
            rows
        )

    }


    dropHandler(file){

        console.log(file)
        var photo = new FormData();
        photo.append('photo', file[0]);
        this.setState({file : file})

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
    }





    render() {
        return (
            <div >

                {/* Navbar on small screens*/}


                {/* Page Container */}
                <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                    <div className="w3-row">
                        {/* Left Column -->*/}
                        <div className="w3-col m2">
                            {/*-- Profile -->*/}

                            <br/>

                            {/*-- End Left Column -->*/}
                        </div>

                        {/*-- Middle Column -->*/}
                        <div className="w3-col m8">



                            <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white">
                                        <div className="w3-container w3-padding">
                                            <h6 className="w3-opacity">Quick Event Upload</h6>
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

                                    </div>
                                </div>
                            </div>

                            {this.eventRows()}

                            {/*-- End Middle Column -->*/}
                        </div>

                        {/*-- Right Column -->*/}


                        {/*-- End Grid -->*/}
                    </div>

                    {/*-- End Page Container -->*/}
                </div>

            </div>
        )
    }
}
export default LocalEventList;
