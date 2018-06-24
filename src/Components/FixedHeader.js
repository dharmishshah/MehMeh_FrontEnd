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
import {ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap'


class FixedHeader extends React.Component {

    constructor(props) {
        super(props);
        var userId = cookie.load("userId")
        var loggedIn = cookie.load("loggedIn")
        var role = cookie.load("role")
        var isLoggedIn = loggedIn ? true : false
        var role = role ? role : "MEME_USER"
        this.state = {
            user: {},
            open: false,
            loggedIn : isLoggedIn,
            role : role,
            rpwdBgColor: ''
        }

        this.userService = UserService.instance;
        this.facebookLogin = this.facebookLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
        this.createUser = this.createUser.bind(this);
        this.roleChanged = this.roleChanged.bind(this);
        this.matchPassword = this.matchPassword.bind(this);
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
                    var user1 = result.user;
                    this.state.user = user1
                    this.state.loggedIn = true;
                    this.state.role = user1.role;
                    cookie.save('userId',user1.id,{path:'/'});
                    cookie.save('role',user1.role,{path:'/'});
                    cookie.save('username',user1.username,{path:'/'});
                    cookie.save('loggedIn', true, {path:'/'});
                    this.onCloseModal();

                } else if(result.status == "USER_NOT_EXIST") {
                    var newUser = {
                        username : user.email,
                        emailId : user.email,
                        firstName: user.givenName,
                        lastName: user.familyName,
                        role: "MEME_USER",
                        profilePicture: user.imageUrl
                    };
                    this.createUser(newUser);
                }
            });
    }

    facebookLogin(username, user) {
        this.userService
            .socialLogin(username)
            .then(result => {
                if(result.status == "success") {
                    var user1 = result.user;
                    this.state.user = user1
                    this.state.loggedIn = true;
                    this.state.role = user1.role;
                    cookie.save('userId',user1.id,{path:'/'});
                    cookie.save('role',user1.role,{path:'/'});
                    cookie.save('username',user1.username,{path:'/'});
                    cookie.save('loggedIn', true, {path:'/'});
                    this.onCloseModal();

                } else if(result.status == "USER_NOT_EXIST") {
                    var newUser = {
                        username : user.email,
                        emailId : user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        role: "MEME_USER",
                        profilePicture: user.picture.data.url
                    };
                    this.createUser(newUser);
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

                this.onCloseModal();
            });
    }

    signup() {
        var user = {
            username : this.refs.signupUsername.value,
            password : this.refs.signupPassword.value,
            emailId : this.refs.signupEmailAddress.value,
            mobileNo : this.refs.signupMobileNumber.value,
            role: this.state.role
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

    createUser(user) {
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

    roleChanged(role) {
        this.setState({role: role});
    }

    matchPassword() {
        var pwd = this.refs.signupPassword.value;
        var rpwd = this.refs.signupRepeatPassword.value;
        if(pwd === rpwd) {
            console.log("green");
            this.state.rpwdBgColor = 'green';
        } else {
            console.log("red");
            this.state.rpwdBgColor = 'red';
        }
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
                        {this.state.loggedIn && this.state.role  === "ADV_USER" &&
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
                                                <input type="password" onKeyUp={this.matchPassword} placeholder="Confirm Password" ref = "signupRepeatPassword" style={{borderColor: this.state.rpwdBgColor, border: 1.2}}/>
                                                <input type="email" placeholder="Email Address" ref = "signupEmailAddress" />
                                                <input type="number"  id = "mobileNumber" placeholder="Mobile Number"  ref = "signupMobileNumber" />
                                                <div>
                                                    <ButtonToolbar>
                                                        <ToggleButtonGroup type="radio"
                                                                           value={this.state.role}
                                                                           name="options"
                                                                           defaultValue="MEME_USER">
                                                            <ToggleButton value="MEME_USER" className="w3-button" onClick={() => this.roleChanged("MEME_USER")}>Meme User</ToggleButton>
                                                            <ToggleButton value="ADV_USER" className="w3-button" onClick={() => this.roleChanged("ADV_USER")}>Advertiser</ToggleButton>
                                                            <ToggleButton value="EVENT_USER" className="w3-button" onClick={() => this.roleChanged("EVENT_USER")}>Event Manager</ToggleButton>
                                                        </ToggleButtonGroup>
                                                    </ButtonToolbar>
                                                </div>
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
                            className="fa fa-bell"></i>
                            <span className="w3-badge w3-right w3-small w3-green">3</span></button>
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


