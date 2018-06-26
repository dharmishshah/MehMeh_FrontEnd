import React from 'react';
import '../style/profile.css'
import cookie from 'react-cookies'
import ReactDOM from 'react-dom'

import MyMemesProfile from './profile/MyMemesProfile'
import AboutProfile from "./profile/AboutProfile";
import ActivitiesProfile from "./profile/ActivitiesProfile";
import MyEventsProfile from "./profile/MyEventsProfile";
import MyFollowersProfile from "./profile/MyFollowersProfile";
import FollowingProfile from "./profile/FollowingProfile";
import UserService from "../Services/UserServiceClient";
import MyAdvertisements from "./profile/MyAdvertisements";
import InterestedEvents from "./profile/InterestedEvents";
import Dropzone from 'react-dropzone'
import User from '../Models/User'


import Modal from 'react-responsive-modal';
import {ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap'


class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            profile:{
                profilePicture : 'https://bootdey.com/img/Content/avatar/avatar6.png'

            },
            gender:'MALE',
            followersCount:0,
            followingCount:0
        }

        this.userService = UserService.instance;
        this.updateUser = this.updateUser.bind(this);
        this.findProfileByUserId = this.findProfileByUserId.bind(this)
        this.dropHandler = this.dropHandler.bind(this)

    }

    componentDidMount() {

        this.findProfileByUserId();

    }



    findProfileByUserId(){

        var userId = cookie.load('userId')

        this.userService.findProfileByUserId(userId).then(profile => {
            var profile1 = profile.user;
            this.setState({profile : profile1, profilePicture:profile1.profilePicture,followersCount:profile.followers.length,followingCount:profile.following.length})

        })

    }

    editOpenModal = () => {
        this.setState({ open: true });
    };

    editCloseModal = () => {
        this.setState({ open: false });
    };

    genderChanged(gender) {
        this.setState({gender: gender});
    }


    updateUser(){

        var user = {
            id : this.state.profile.id,
            emailId: this.refs.emailId.value,
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            gender: this.state.gender,
            mobileNo: this.refs.mobileNo.value,
            profilePicture: this.state.profilePicture,
            about_me :  this.refs.aboutMe.value,
            interests : this.refs.interests.value

        }
        console.log(user)

        this.userService.updateProfileByUserId(user).then((response) =>{
            window.location.reload();
        })

    }

    dropHandler(file, profile){

        var photo = new FormData();
        if(file){
            photo.append('photo', file[0]);
            this.userService = UserService.instance;
            this.userService.uploadProfilePicture(file).then((response) => {
                var fileName = response.data.filename
                this.setState({profilePicture : fileName})
            })
        }



    }


    

    render() {
        return (

            <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                <div className="w3-row">
                    <div className="w3-col m12">
                        <div className="w3-card w3-round w3-white">
                            <div className="w3-container w3-padding">

                                <div className="container">
                                        <div className="content-page">
                                            <div className="profile-banner" style={{
                                                backgroundImage:'url(./images/profile9.jpg)'

                                            }}>
                                                <div className="col-sm-3 avatar-container">
                                                    <img src={this.state.profile.profilePicture ? this.state.profile.profilePicture
                                                    : "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                                         className="img-circle profile-avatar" alt="User avatar"/>

                                                </div>

                                            </div>
                                            <button onClick={this.editOpenModal}
                                                    style={{marginTop: 10, marginRight: 20}}
                                                    className="fa fa-edit  w3-right btn btn-success ">
                                                Edit
                                            </button>
                                            <div className="content">

                                                <div className="w3-row">
                                                    <div className="col-sm-3">
                                                        {/* Begin user profile */}
                                                        <div className="text-center user-profile-2"
                                                             style={{marginTop:120}}>
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <h4>Howdy, <b>{this.state.profile.username}</b></h4>

                                                                </li>
                                                                <li className="list-group-item">
                                                                    <span className="badge">{this.state.followersCount}</span>
                                                                    Followers
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <span className="badge">{this.state.followingCount}</span>
                                                                    Following
                                                                </li>

                                                            </ul>

                                                            {/* User button */}

                                                            {/* End div .user-button */}
                                                        </div>
                                                        {/* End div .box-info */}
                                                        {/* Begin user profile */}
                                                    </div>
                                                    {/* End div .col-sm-4 */}



                                                    <div className="col-sm-9">
                                                        <div className="widget widget-tabbed">
                                                            {/* Nav tab */}
                                                            <ul className="nav nav-tabs ">

                                                                <li><a className="active" href="#about" data-toggle="tab"><i
                                                                    className="fa fa-user"></i> About </a></li>
                                                                <li ><a href="#myMemes"
                                                                       data-toggle="tab"><i className="fa fa-meh-o"></i> My Memes </a></li>
                                                                <li ><a href="#interestedEvents" data-toggle="tab"><i
                                                                    className="fa fa-calendar"></i> Interested Events </a></li>
                                                                <li ><a href="#myFollowers" data-toggle="tab"><i
                                                                    className="fa fa-user"></i> My Followers </a></li>
                                                                <li><a href="#following" data-toggle="tab"><i
                                                                    className="fa fa-user"></i> Following </a></li>
                                                                <li><a href="#user-activities" data-toggle="tab"><i
                                                                    className="fa fa-archive"></i> Activity Log </a></li>
                                                            </ul>
                                                            {/* End nav tab */}

                                                            {/* Tab panes */}
                                                            <div className="tab-content">


                                                                <AboutProfile profile={this.state.profileObj}/>

                                                                <MyMemesProfile profile={this.state.profileObj}></MyMemesProfile>

                                                                <MyEventsProfile profile={this.state.profileObj}/>

                                                                <MyFollowersProfile profile={this.state.profileObj}/>

                                                                <FollowingProfile profile={this.state.profileObj}/>

                                                                <ActivitiesProfile profile={this.state.profileObj}/>

                                                                <InterestedEvents profile={this.state.profileObj}/>

                                                            </div>
                                                            {/* End div .tab-content */}
                                                        </div>
                                                        {/* End div .box-info */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal open={this.state.open} onClose={this.editCloseModal} center>

                    <div className="login-page">
                        <h3><strong>Edit Profile</strong></h3>
                            <div className="form">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab1" data-toggle="tab">Personal</a>
                                </li>
                                <li>
                                    <a href="#tab2" data-toggle="tab">Contact</a>
                                </li>
                                <li>
                                    <a href="#tab3" data-toggle="tab">Profile</a>
                                </li>
                            </ul>

                            <div className="tab-content clearfix">
                                <br/>
                                <div id="tab1" className="tab-pane active">
                                    <div className="login-form">
                                        {this.state.errorMsg && <div className="alert alert-danger">
                                            <strong>Oops!</strong> {this.state.errorMsg}
                                        </div>}
                                        <input type="text" onChange={(e) => {
                                            var profile = this.state.profile
                                            profile.firstName = e.target.value
                                            this.setState({profile : profile})
                                        }} value={this.state.profile.firstName} placeholder="first name" ref="firstName"></input>
                                        <input type="text" onChange={(e) => {
                                            var profile = this.state.profile
                                            profile.lastName = e.target.value
                                            this.setState({profile : profile})
                                        }}value={this.state.profile.lastName} placeholder="last name" ref="lastName"/>
                                        <input type="text" onChange={(e) => {
                                            var profile = this.state.profile
                                            profile.about_me = e.target.value
                                            this.setState({profile : profile})
                                        }}value={this.state.profile.about_me} placeholder="about yourself" ref="aboutMe"/>
                                        <input type="text" onChange={(e) => {
                                            var profile = this.state.profile
                                            profile.interests = e.target.value
                                            this.setState({profile : profile})
                                        }}value={this.state.profile.interests} placeholder="interests(seperated by comma)" ref="interests"/>
                                        <ButtonToolbar>
                                            <ToggleButtonGroup type="radio"
                                                               value={this.state.profile.gender}
                                                               name="options">
                                                <ToggleButton value="MALE" className="w3-button"
                                                              onClick={() => this.genderChanged("MALE")}>Male</ToggleButton>
                                                <ToggleButton value="FEMALE" className="w3-button"
                                                              onClick={() => this.genderChanged("FEMALE")}>Female</ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonToolbar>
                                        <br/>
                                    </div>
                                </div>

                                <div id="tab2" className="tab-pane">
                                    <div className="register-form">
                                        <input type="numeric" onChange={(e) => {
                                            var profile = this.state.profile
                                            profile.mobileNo = e.target.value
                                            this.setState({profile : profile})
                                        }}value={this.state.profile.mobileNo} placeholder="mobile no" ref="mobileNo"/>
                                        <input type="text" onChange={(e) => {
                                            var profile = this.state.profile
                                            profile.emailId = e.target.value
                                            this.setState({profile : profile})
                                        }}value={this.state.profile.emailId} placeholder="email address" ref="emailId"/>
                                        <label id="signupMsg">{this.state.signupError}</label>
                                    </div>
                                </div>
                                <div id="tab3" className="tab-pane">
                                    <div className="col-sm-3 ">

                                        <Dropzone style={{width: 'auto', height:'auto', borderWidth:
                                                2, borderColor: 'rgb(102, 102, 102)'}}
                                                  multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                            <img heigth="40" width="215" src={this.state.profilePicture ? this.state.profilePicture
                                                : "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                                 className="img-circle " alt="User avatar"/>

                                        </Dropzone>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="float-right w3-button w3-theme"
                                onClick={this.updateUser}> Update
                        </button>
                    </div>

                </Modal>


            </div>
        )
    }
}
export default Profile;
