import React from 'react';
import '../style/profile.css'
import cookie from 'react-cookies'

import MyMemesProfile from './profile/MyMemesProfile'
import AboutProfile from "./profile/AboutProfile";
import ActivitiesProfile from "./profile/ActivitiesProfile";
import MyEventsProfile from "./profile/MyEventsProfile";
import MyFollowersProfile from "./profile/MyFollowersProfile";
import FollowingProfile from "./profile/FollowingProfile";
import UserService from "../Services/UserServiceClient";


class MemeList extends React.Component {
    constructor() {
        super();
        this.state = {
            profile:{
                profilePicture : 'https://bootdey.com/img/Content/avatar/avatar6.png'
            }
        }

        this.userService = UserService.instance;



    }

    componentWillMount() {

        this.findProfileByUserId();


    }

    findProfileByUserId(){

        var userId = cookie.load('userId')

        this.userService.findProfileByUserId(userId).then(profile => {
            var profile = profile.user;
            this.setState({profile : profile})
        })

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
                                                                    <span className="badge">1,245</span>
                                                                    Followers
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <span className="badge">245</span>
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
                                                                        className="fa fa-meh-o"  data-toggle="tab"><i
                                                                    className="myEvents"></i> My Memes </a></li>
                                                                <li ><a href="#myEvents"
                                                                                          data-toggle="tab"><i
                                                                    className="fa fa-calendar"></i> My Events </a></li>
                                                                <li ><a href="#myFollowers"
                                                                        data-toggle="tab"><i
                                                                    className="fa fa-user"></i> My Followers </a></li>
                                                                <li><a href="#following" data-toggle="tab"><i
                                                                    className="fa fa-user"></i> Following </a></li>
                                                                <li><a href="#user-activities" data-toggle="tab"><i
                                                                    className="fa fa-archive"></i> Activity Log </a></li>
                                                            </ul>
                                                            {/* End nav tab */}

                                                            {/* Tab panes */}
                                                            <div className="tab-content">


                                                                <AboutProfile profile={this.state.profile}/>

                                                                <MyMemesProfile></MyMemesProfile>

                                                                <MyEventsProfile/>

                                                                <MyFollowersProfile/>

                                                                <FollowingProfile/>

                                                                <ActivitiesProfile/>

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
            </div>
        )
    }
}
export default MemeList;
