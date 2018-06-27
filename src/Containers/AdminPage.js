import React from 'react'
import cookie from "react-cookies";
import UserService from "../Services/UserServiceClient";
import '../style/admin.css'
import AdminServiceClient from '../Services/AdminServiceClient';
import UserCard from "../Components/UserCard";
import MemeCard from "../Components/MemeCard";
import EventCard from "../Components/EventCard";
import AdsCard from "../Components/AdsCard";
import Modal from 'react-responsive-modal';
import {ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap'


class AdminPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            memes: [],
            events: [],
            ads: [],
            role: "MEME_USER"
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
        this.updateMemeUser = this.updateMemeUser.bind(this);
        this.updateEventUser = this.updateEventUser.bind(this);
        this.updateAdvUser = this.updateAdvUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.roleChanged = this.roleChanged.bind(this);
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
        cookie.remove('username');
        cookie.remove('loggedIn');
        window.location.replace("/");

    }

    roleChanged(role) {
        this.setState({role: role});
    }

    createUser() {
        var user = {
            firstName: this.refs.signupFirstname.value,
            lastName: this.refs.signupLastname.value,
            username : this.refs.signupUsername.value,
            password : this.refs.signupPassword.value,
            emailId : this.refs.signupEmailAddress.value,
            role: this.state.role
        }
        this.userService
            .register(user)
            .then(user => {
                window.location.reload();
            });
    }

    updateMemeUser(user){

        var user1 = {
            id : user.id,
            emailId: user.emailId,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            mobileNo: user.mobileNo,
            profilePicture: user.profilePicture,
            about_me :  user.aboutMe,
            role: user.role
        };
        console.log(user1);
        this.userService.updateProfileByUserId(user1).then((response) =>{
            window.location.reload();
        })
    }

    updateEventUser(user1){

        var user = {
            id : user1.id,
            emailId: user1.emailId,
            firstName: user1.firstName,
            lastName: user1.lastName,
            gender: user1.gender,
            mobileNo: user1.mobileNo,
            profilePicture: user1.profilePicture,
            organizationName : user1.organizationName,
            organizationAddress : user1.organizationAddress,
            organizationWebsite : user1.organizationWebsite,
            eventGenre : user1.eventGenre,
            role: user1.role

        };
        console.log(user);

        this.userService.updateProfileByUserId(user).then((response) =>{
            window.location.reload();
        })

    }

    updateAdvUser(user1){

        var user = {
            id : user1.id,
            emailId: user1.emailId,
            firstName: user1.firstName,
            lastName: user1.lastName,
            gender: user1.gender,
            mobileNo: user1.mobileNo,
            profilePicture: user1.profilePicture,
            agencyName : user1.agencyName,
            agencyAddress : user1.agencyAddress,
            agencyWebsite : user1.agencyWebsite,
            role: user1.role
        };
        console.log(user);
        this.userService.updateProfileByUserId(user).then((response) =>{
            window.location.reload();
        })
    }

    createUserOpenModal = () => {
        this.setState({ useropen: true });
    };

    createUserCloseModal = () => {
        this.setState({ useropen: false });
    };

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

                <div id="users" style={{marginLeft:'25%', paddingTop:1, paddingLeft: 16, height: 2500}}>
                    <button className="btn btn-success btn-block" style={{height: 50}} onClick={this.createUserOpenModal}><strong>Create User</strong></button>
                    {this.state.users.map(user => {
                        return(

                            <UserCard key={user.id}
                                      user={user}
                                      deleteUser={this.deleteUser}
                                      updateMemeUser={this.updateMemeUser}
                                      updateEventUser={this.updateEventUser}
                                      updateAdvUser={this.updateAdvUser}/>
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

                <Modal open={this.state.useropen} onClose={this.createUserCloseModal} center>

                    <div className="login-page">
                        <div className="form">
                                <div className="tab-pane">
                                    <div className="register-form">
                                        <input type="text" placeholder="First Name" ref="signupFirstname"/>
                                        <input type="text" placeholder="Last Name" ref="signupLastname"/>
                                        <input type="text" placeholder="Username" ref="signupUsername"/>
                                        <input type="password" placeholder="Password" ref="signupPassword"/>
                                        <input type="email" placeholder="Email Address" ref="signupEmailAddress"/>
                                        <div>
                                            <ButtonToolbar>
                                                <ToggleButtonGroup type="radio"
                                                                   value={this.state.role}
                                                                   name="options"
                                                                   defaultValue="MEME_USER">
                                                    <ToggleButton value="MEME_USER" className="w3-button"
                                                                  onClick={() => this.roleChanged("MEME_USER")}>
                                                        Meme User
                                                    </ToggleButton>
                                                    <ToggleButton value="ADV_USER" className="w3-button"
                                                                  onClick={() => this.roleChanged("ADV_USER")}>
                                                        Advertiser
                                                    </ToggleButton>
                                                    <ToggleButton value="EVENT_USER" className="w3-button"
                                                                  onClick={() => this.roleChanged("EVENT_USER")}>
                                                        Event Manager
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </ButtonToolbar>
                                        </div>
                                        <button className="float-right w3-button w3-theme"
                                                onClick={() => {this.createUser()}}>Create
                                        </button>
                                        <label id="signupMsg">{this.state.signupError}</label>
                                    </div>
                                </div>
                        </div>
                    </div>

                </Modal>
            </div>
        )
    }
}

export default AdminPage;