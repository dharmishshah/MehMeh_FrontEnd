import React from 'react'
import cookie from "react-cookies";
import UserService from "../Services/UserServiceClient";
import '../style/admin.css'
import AdminServiceClient from '../Services/AdminServiceClient';
import UserCard from "../Components/UserCard";
import MemeCard from "../Components/MemeCard";
import EventCard from "../Components/EventCard";
import AdsCard from "../Components/AdsCard";

class AdminPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            memes: [],
            events: [],
            ads: []
        }

        this.adminServiceClient = AdminServiceClient.instance;
        this.userService = UserService.instance;
        this.logout = this.logout.bind(this);
        this.findAllUsers = this.findAllUsers.bind(this);
        this.findAllMemes = this.findAllMemes.bind(this);
        this.findAllEvents = this.findAllEvents.bind(this);
        this.findAllAds = this.findAllAds.bind(this);
        this.deleteAd = this.deleteAd.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.deleteMeme = this.deleteMeme.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentWillMount() {
        if (cookie.load('role') === "ADMIN") {
            this.findAllUsers();
        } else {
            alert("You are not authorized!");
            window.location.replace("/");
        }
    }

    findAllUsers() {
        this.adminServiceClient.findAllUsers()
            .then(users => this.setState({users: users}));
    }

    deleteUser(userId) {
        this.adminServiceClient.deleteUser(userId)
            .then(response => {
                this.findAllUsers();
            });
    }

    findAllMemes() {
        this.adminServiceClient.findAllMemes()
            .then(result => {
                var memes = result.memes;
                this.setState({memes: memes});
            });
    }

    deleteMeme(memeId) {
        this.adminServiceClient.deleteMeme(memeId)
            .then(response => {
                this.findAllMemes();
            });

    }

    findAllEvents() {
        this.adminServiceClient.findAllEvents()
            .then(result => {
                var events = result.events;
                this.setState({events: events});
            });
    }

    deleteEvent(eventId) {
        this.adminServiceClient.deleteEvent(eventId)
            .then(response => {
                this.findAllEvents();
            });
    }

    findAllAds() {
        this.adminServiceClient.findAllAds()
            .then(result => {
                var advertisements = result.advertisements;
                this.setState({ads: advertisements});
            });
    }

    deleteAd(adId) {
        this.adminServiceClient.deleteAds(adId)
            .then(response => {
                this.findAllAds();
            });
    }

    logout(){
        this.userService.logout();
        cookie.remove('userId');
        cookie.remove('role');
        cookie.remove('username')
        cookie.remove('loggedIn')
        window.location.replace("/");

    }

    render() {
        return (
            <div >
                <ul className="adminUl" >
                    <li className="adminLi"><a href="#users" onClick={this.findAllUsers}>Users</a></li>
                    <li className="adminLi"><a href="#memes" onClick={this.findAllMemes}>Memes</a></li>
                    <li className="adminLi"><a href="#events" onClick={this.findAllEvents}>Events</a></li>
                    <li className="adminLi"><a href="#ads" onClick={this.findAllAds}>Ads</a></li>
                    <li className="adminLi"><a onClick={this.logout} className="btn btn-outline-dark">Log out</a></li>
                </ul>

                <div id="users" style={{marginLeft:'25%', paddingTop:1, paddingLeft: 16, height: 2000}}>
                    {this.state.users.map(user => {
                        return(
                            <UserCard key={user.id} user={user} deleteUser={this.deleteUser}/>
                        )
                    })}
                </div>
                <div id="memes" style={{marginLeft:'25%', paddingTop:1, paddingLeft: 16, height: 2000}}>
                    {this.state.memes.map(meme => {
                        return(
                            <MemeCard key={meme.id} meme={meme} deleteMeme={this.deleteMeme}/>
                        )
                    })}
                </div>
                <div id="events" style={{marginLeft:'25%', paddingTop:1, paddingLeft: 16, height: 2000}}>
                    {this.state.events.map(event => {
                        return(
                            <EventCard key={event.id} event={event} deleteEvent={this.deleteEvent}/>
                        )
                    })}
                </div>
                <div id="ads" style={{marginLeft:'25%', paddingTop:1, paddingLeft: 16, height: 2000}}>
                    {this.state.ads.map(ad => {
                        return(
                            <AdsCard key={ad.id} ad={ad} deleteAd={this.deleteAd}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default AdminPage;