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
import Profile from "./Profile";
import EventProfile from "./EventProfile";
import AdvertisementList from "./AdvertisementList";
import AdvertisementProfile from "./AdvertisementProfile";


class HeaderProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            role : ''
        }
        this.userService = UserService.instance;
        this.findProfileByUserId()
        var userId = cookie.load('userId')
        this.userService.findProfileByUserId(userId).then(profile => {
            var profile = profile.user;
            this.setState({profile : profile})
        })

    }

    componentDidMount() {

        var role = cookie.load('role')
        this.setState({role : role})
        this.findProfileByUserId()
    }


    findProfileByUserId(){

        var userId = cookie.load('userId')

        this.userService.findProfileByUserId(userId).then(profile => {
            var profile = profile.user;
            this.setState({profile : profile})
            localStorage.setItem('profile',JSON.stringify(profile))
        })

    }

    render() {
        return (

           <div>
               {this.state.role == 'MEME_USER' && <Profile profile={this.state.profile}/>}
               {this.state.role == 'EVENT_USER' && <EventProfile profile={this.state.profile}/>}
               {this.state.role == 'ADV_USER' && <AdvertisementProfile profile={this.state.profile}/>}

           </div>
        )
    }
}
export default HeaderProfile;
