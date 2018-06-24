import React from 'react'
import $ from 'jquery'
import '../App.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import Modal from 'react-responsive-modal';
import User from '../Models/User';
import UserService from '../Services/UserServiceClient'
import cookie from 'react-cookies';


class FixedHeader extends React.Component {

    constructor(props) {
        super(props);
        var userId = cookie.load("userId")
        var loggedIn = cookie.load("loggedIn")
        var role = cookie.load("role")
        var isLoggedIn = loggedIn ? true : false
        var role = role ? role : "NotLoggedIn"
        this.state = {
            user: {},
            open: false,
            loggedIn : isLoggedIn,
            role : role
        }

        this.userService = UserService.instance;
        this.facebookLogin = this.facebookLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
    }

    responseGoogle = (response) => {
        this.state.user = response;
        this.googleLogin(this.state.user.profileObj.email, this.state.user.profileObj);
        console.log(response);
    }

    responseFacebook = (response) => {
        this.state.user = response;
        this.facebookLogin(this.state.user.email, this.state.user);
        console.log(this.state.user);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    googleLogin(username, user) {
        this.userService
            .socialLogin(username)
            .then(result => {
                if(result.status == "success") {
                    this.state.user = result.user;
                    window.location.reload();
                } else if(result.status == "USER_NOT_EXIST") {
                    var newUser = new User();
                    newUser.setFirstName(user.givenName);
                    newUser.setLastName(user.familyName);
                    newUser.setUsername(user.email);
                    newUser.setEmailId(user.email);
                    newUser.setProfilePicture(user.imageUrl);
                    this.signup(newUser);
                }
            });
    }

    facebookLogin(username, user) {
        this.userService
            .socialLogin(username)
            .then(result => {
                if(result.status == "success") {
                    this.state.user = result.user;
                    window.location.reload();
                } else if(result.status == "USER_NOT_EXIST") {
                    var newUser = new User();
                    newUser.setFirstName(user.first_name);
                    newUser.setLastName(user.last_name);
                    newUser.setUsername(user.email);
                    newUser.setEmailId(user.email);
                    newUser.setProfilePicture(user.picture.data.url);
                    this.signup(newUser);
                }
            });
    }

    login() {
        var username = this.refs.loginUsername.value;
        var password = this.refs.loginPassword.value;
        this.userService
            .login(username, password)
            .then(user => {
                var user = user.user;
                this.state.user = user
                this.state.loggedIn = true;
                this.state.role = user.role;
                cookie.save('userId',user.id,{path:'/'});
                cookie.save('role',user.role,{path:'/'});
                cookie.save('username',user.username,{path:'/'})
                cookie.save('loggedIn', true, {path:'/'})

                this.onCloseModal()
            });
    }

    signup(user) {
        var user = {
            username : this.refs.signupUsername.value,
            password : this.refs.signupPassword.value,
            emailId : this.refs.signupEmailAddress.value,
            mobileNo : this.refs.signupMobileNumber.value
        }
        this.userService
            .register(user)
            .then(user => {
                var user = user.user;
                this.state.user = user
                this.state.loggedIn = true;
                this.state.role = user.role;
                cookie.save('userId',user.id,{path:'/'});
                cookie.save('role',user.role,{path:'/'});
                cookie.save('username',user.username,{path:'/'})
                cookie.save('loggedIn', true, {path:'/'})
                this.onCloseModal()
            });
    }

    logout(){

        cookie.remove('userId');
        cookie.remove('role');
        cookie.remove('username')
        cookie.remove('loggedIn')
        window.location.reload();

    }

    render() {
        return (
            <div className="w3-top">
                    <div className="w3-bar w3-theme-d2 w3-left-align w3-large ">
                    <Link to={'/'}><a href="javaScript:void(0);" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i
                        className="fa fa-home w3-margin-right"></i><img src="../../images/logo.png" style={{width:170, height:35}}/></a></Link>
                    <Link className="headerIcon" to={'/events'}>
                        <a  href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Events">
                            <i className="fa fa-calendar"></i>
                        </a>
                    </Link>
                        {this.state.loggedIn && this.state.role  === "MEME_USER" &&
                            <Link className="headerIcon" to={'/advertisement'}>
                            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Advertisements">
                                <i className="fa fa-adn"></i>
                            </a>
                        </Link>}

                        <input style={{width:'25%', marginBottom : 0, marginTop:10}} placeholder="Search..." className="w3-border w3-padding" ref="searchKeyword"></input>
                        <Modal open={this.state.open} onClose={this.onCloseModal} center>

                            <div className="login-page">
                                <div className="form">
                                    <ul className="nav nav-tabs">
                                        <li className = "active">
                                            <a href="#tab1" data-toggle="tab">Login</a>
                                        </li>
                                        <li>
                                            <a href="#tab2" data-toggle="tab">Sign Up</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content clearfix">
                                        <br/>
                                        <div id = "tab1" className = "tab-pane active">
                                            <div className="login-form">
                                                <input type="text" placeholder="Username" ref = "loginUsername" />
                                                <input type="password" placeholder="Password" ref = "loginPassword" />
                                                <button className=" float-right w3-button-selected w3-button w3-theme" onClick = {this.login}>Login</button><br/>
                                                <label className = "errorMsg">{this.state.loginError}</label>
                                                <br/><br/>
                                                <p className="center"><strong>OR</strong></p>
                                                <br/>
                                                <GoogleLogin
                                                clientId="292577159044-5vfoi2cpvqc5utecqvtol9ir2sl8aslr.apps.googleusercontent.com"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                                buttonText={<span className="fa fa-google-plus ">&nbsp;&nbsp;&nbsp;&nbsp; Login with Google </span>}
                                                style={{marginLeft:0, marginRight:5, width: 318 }}
                                                icon="fa fa-google-plus-g"
                                                className="btn btn-google">
                                                </GoogleLogin>
                                                <br/>
                                                <br/>
                                                <FacebookLogin
                                                appId="143953939803032"
                                                fields="first_name,last_name,gender,birthday,email,picture"
                                                textButton ={ <span> &nbsp;&nbsp;&nbsp;&nbsp; Login with Facebook </span>}
                                                callback={this.responseFacebook}
                                                cssClass="my-facebook-button-class btn btn-facebook"
                                                buttonStyle={{marginLeft:0, marginRight:5, width: 318 }}
                                                icon="fa-facebook-square"
                                                className="btn btn-facebook"
                                                />
                                            </div>
                                        </div>

                                        <div id = "tab2" className = "tab-pane">
                                            <div className="register-form">
                                                <input type="text" placeholder="Username" ref = "signupUsername" />
                                                <input type="password" placeholder="Password" ref = "signupPassword" />
                                                <input type="email" placeholder="Email Address" ref = "signupEmailAddress" />
                                                <input type="number"  id = "mobileNumber" placeholder="Mobile Number"  ref = "signupMobileNumber" />
                                                <button className="float-right w3-button w3-theme" onClick = {this.signup}>Create</button>
                                                <label id="signupMsg">{this.state.signupError}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal>
                    <div className="w3-dropdown-hover w3-hide-small">
                        <button className="w3-button w3-padding-large" title="Notifications"><i
                            className="fa fa-bell"></i><span
                            className="w3-badge w3-right w3-small w3-green">3</span></button>
                        <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{width:300}}>
                            <a href="#" className="w3-bar-item w3-button">One new event uploaded</a>
                            <a href="#" className="w3-bar-item w3-button">One new meme was added</a>
                            <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                        </div>
                    </div>


                        {this.state.loggedIn &&

                            <React.Fragment>
                                <button onClick={this.logout}
                                        style={{marginTop:10, marginRight:5}}
                                        className="w3-bar-item w3-hover-white w3-button w3-right btn btn-outline-light w3-border w3-padding">
                                    Log Out</button>
                                <Link to={'/profile'}><a className="w3-bar-item w3-button w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
                                                    href="#" ><i className="fa fa-user"></i></a></Link>

                            </React.Fragment>
                        }
                        {!this.state.loggedIn &&
                        <button onClick={this.onOpenModal}
                                style={{marginTop:10, marginRight:5}}
                                className="w3-bar-item w3-hover-white w3-button w3-right btn btn-outline-light w3-border w3-padding">
                            Login | Sign Up</button>}

                    </div>
            </div>

        )
    }
}

export default FixedHeader;


