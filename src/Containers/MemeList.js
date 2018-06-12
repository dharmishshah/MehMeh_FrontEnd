import React from 'react';
import '../index.css';
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import MemeRow from '../Components/MemeRow'
import MemeService from '../Services/MemeServiceClient'
import FacebookLogin from 'react-facebook-login'
import Dropzone from 'react-dropzone'

const responseGoogle = (response) => {
    console.log(response);
}

const responseFacebook = (response) => {
    console.log(response);
}


class MemeList extends React.Component {
    constructor() {
        super();
        this.memeService = MemeService.instance;
        this.state = {
            memes :[]
        };
        this.dropHandler = this.dropHandler.bind(this)
        this.uploadImage = this.uploadImage.bind(this)

    }

    componentWillMount() {
        this.findAllMemes();
    }


    findAllMemes(){
        this.memeService.findAllMemes(0,'viral')
            .then(memes => {
                this.setState({memes : memes.data});
            });
    }

    memeRows(){
        var rows = this.state.memes.map((meme) => {
            return (
                <MemeRow meme={meme} key={meme.id}/>
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

    uploadImage(){
        var caption = this.refs.caption.value;
        var file = this.state.file;
        console.log(file)
        console.log(caption)
    }



    render() {
        return (
            <div >

                <div className="w3-top">
                    <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                        <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
                           href="javascript:void(0);" onClick="openNav()"><i className="fa fa-bars"></i></a>
                        <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i
                            className="fa fa-home w3-margin-right"></i>Memebook</a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                           title="News"><i className="fa fa-globe"></i></a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                           title="Account Settings"><i className="fa fa-user"></i></a>
                        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                           title="Messages"><i className="fa fa-envelope"></i></a>
                        <a>
                            <GoogleLogin
                                clientId="292577159044-5vfoi2cpvqc5utecqvtol9ir2sl8aslr.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                icon="fa fa-google"
                            />
                            <FacebookLogin
                                appId="143953939803032"
                                autoLoad={true}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                cssClass="my-facebook-button-class"
                                icon="fa-facebook"
                            />
                        </a>
                        <div className="w3-dropdown-hover w3-hide-small">
                            <button className="w3-button w3-padding-large" title="Notifications"><i
                                className="fa fa-bell"></i><span
                                className="w3-badge w3-right w3-small w3-green">3</span></button>
                            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{width:300}}>
                                <a href="#" className="w3-bar-item w3-button">One new friend request</a>
                                <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
                                <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                            </div>
                        </div>
                        <a href="#"
                           className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white"
                           title="My Account">
                            <img src="/w3images/avatar2.png" className="w3-circle" style={{height:23,width:23}}
                                 alt="Avatar" />
                        </a>
                    </div>
                </div>

                {/* Navbar on small screens*/}
                <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
                </div>

                {/* Page Container */}
                <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                    <div className="w3-row">
                        {/* Left Column -->*/}
                        <div className="w3-col m3">
                            {/*-- Profile -->*/}
                            <div className="w3-card w3-round w3-white">
                                <div className="w3-container">
                                    <h4 className="w3-center">My Profile</h4>
                                    <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle"
                                                                  style={{height:106,width:106}} alt="Avatar" /></p>
                                    <hr/>
                                        <p><i
                                            className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Name </p>
                                        <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> Location
                                        </p>
                                        <p><i
                                            className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> Birth Date</p>
                                </div>
                            </div>
                            <br/>

                                {/*-- Accordion -->*/}
                                <div className="w3-card w3-round">
                                    <div className="w3-white">
                                        <button onClick="myFunction('Demo1')"
                                                className="w3-button w3-block w3-left-align w3-white"><i
                                            className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups
                                        </button>
                                        <div id="Demo1" className="w3-hide w3-container">
                                            <p>Some text..</p>
                                        </div>
                                        <button onClick="myFunction('Demo2')"
                                                className="w3-button w3-block w3-left-align w3-white"><i
                                            className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events
                                        </button>
                                        <div id="Demo2" className="w3-hide w3-container">
                                            <p>Some other text..</p>
                                        </div>
                                        <button onClick="myFunction('Demo3')"
                                                className="w3-button w3-block  w3-left-align w3-white"><i
                                            className="fa fa-users fa-fw w3-margin-right"></i> My Memes
                                        </button>
                                        <div id="Demo3" className="w3-hide w3-container">
                                            <div className="w3-row-padding">
                                                <br/>
                                                    <div className="w3-half">
                                                        <img src="/w3images/lights.jpg" style={{width:'100%'}}
                                                             className="w3-margin-bottom"/>
                                                    </div>
                                                    <div className="w3-half">
                                                        <img src="/w3images/nature.jpg" style={{width:'100%'}}
                                                             className="w3-margin-bottom"/>
                                                    </div>
                                                    <div className="w3-half">
                                                        <img src="/w3images/mountains.jpg" style={{width:'100%'}}
                                                             className="w3-margin-bottom"/>
                                                    </div>
                                                    <div className="w3-half">
                                                        <img src="/w3images/forest.jpg" style={{width:'100%'}}
                                                             className="w3-margin-bottom"/>
                                                    </div>
                                                    <div className="w3-half">
                                                        <img src="/w3images/nature.jpg" style={{width:'100%'}}
                                                             className="w3-margin-bottom"/>
                                                    </div>
                                                    <div className="w3-half">
                                                        <img src="/w3images/snow.jpg" style={{width:'100%'}}
                                                             className="w3-margin-bottom"/>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                    {/*-- Interests -->*/}
                                    <div className="w3-card w3-round w3-white w3-hide-small">
                                        <div className="w3-container">
                                            <p>Interests</p>
                                            <p>
                                                <span className="w3-tag w3-small w3-theme-d5">News</span>
                                                <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>
                                                <span className="w3-tag w3-small w3-theme-d3">Labels</span>
                                                <span className="w3-tag w3-small w3-theme-d2">Games</span>
                                                <span className="w3-tag w3-small w3-theme-d1">Friends</span>
                                                <span className="w3-tag w3-small w3-theme">Games</span>
                                                <span className="w3-tag w3-small w3-theme-l1">Friends</span>
                                                <span className="w3-tag w3-small w3-theme-l2">Food</span>
                                                <span className="w3-tag w3-small w3-theme-l3">Design</span>
                                                <span className="w3-tag w3-small w3-theme-l4">Art</span>
                                                <span className="w3-tag w3-small w3-theme-l5">Photos</span>
                                            </p>
                                        </div>
                                    </div>
                                    <br/>

                                        {/*-- Alert Box -->*/}
                            {/*<div
                                            className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
        <span onClick="this.parentElement.style.display='none'" className="w3-button w3-theme-l3 w3-display-topright">
          <i className="fa fa-remove"></i>
        </span>
                                            <p><strong>Hey!</strong></p>
                                            <p>People are looking at your profile. Find out who.</p>
                                        </div>*/}

                            {/*-- End Left Column -->*/}
                        </div>

                        {/*-- Middle Column -->*/}
                        <div className="w3-col m7">

                            <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white">
                                        <div className="w3-container w3-padding">
                                            <h6 className="w3-opacity">Quick Meme Upload</h6>
                                            <input style={{width:'100%', marginBottom : 15}}placeholder="caption" className="w3-border w3-padding" ref="caption"></input>
                                            <Dropzone disableClick ={true} multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                                <div> Just drop a meme and you are all set. </div>
                                            </Dropzone>
                                            <button type="button" className="w3-button w3-theme" onClick={this.uploadImage}><i
                                                className="fa fa-pencil"></i> Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.memeRows()}


                            {/*-- End Middle Column -->*/}
                        </div>

                        {/*-- Right Column -->*/}
                        <div className="w3-col m2">
                            <div className="w3-card w3-round w3-white w3-center">
                                <div className="w3-container">
                                    <p>Upcoming Events:</p>
                                    <img src="../../images/bg2.jpg" alt="Forest" style={{width:'100%'}} />
                                        <p><strong>Holiday</strong></p>
                                        <p>Friday 15:00</p>
                                        <p>
                                            <button className="w3-button w3-block w3-theme-l4">Info</button>
                                        </p>
                                </div>
                            </div>
                            <br/>

                            {/*<div className="w3-card w3-round w3-white w3-center">
                                    <div className="w3-container">
                                        <p>Friend Request</p>
                                        <img src="/w3images/avatar6.png" alt="Avatar" style={{width:'50%'}} /><br/>
                                            <span>Jane Doe</span>
                                            <div className="w3-row w3-opacity">
                                                <div className="w3-half">
                                                    <button className="w3-button w3-block w3-green w3-section"
                                                            title="Accept"><i className="fa fa-check"></i></button>
                                                </div>
                                                <div className="w3-half">
                                                    <button className="w3-button w3-block w3-red w3-section"
                                                            title="Decline"><i className="fa fa-remove"></i></button>
                                                </div>
                                            </div>
                                    </div>
                                </div>*/}
                                <br/>

                            {/*-- End Right Column -->*/}
                        </div>

                        {/*-- End Grid -->*/}
                    </div>

                    {/*-- End Page Container -->*/}
                </div>

            </div>
        )
    }
}
export default MemeList;
