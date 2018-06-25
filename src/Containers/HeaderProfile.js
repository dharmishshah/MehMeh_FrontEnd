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
    }

    componentWillMount() {

        var role = cookie.load('role')
        this.setState({role : role})

    }

    render() {
        return (

           <div>
               {this.state.role == 'MEME_USER' && <Profile/>}
               {this.state.role == 'EVENT_USER' && <EventProfile/>}
               {this.state.role == 'ADV_USER' && <AdvertisementProfile/>}

           </div>
        )
    }
}
export default HeaderProfile;
