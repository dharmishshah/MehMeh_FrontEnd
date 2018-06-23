import React from 'react'
import $ from 'jquery'
import '../App.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

const responseGoogle = (response) => {
    console.log(response);
}

const responseFacebook = (response) => {
    console.log(response);
}

class MemeRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div className="w3-top">
                <div className="w3-bar w3-theme-d2 w3-left-align w3-large ">

                    <Link to={'/'}><a href="javaScript:void(0);" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i
                        className="fa fa-home w3-margin-right"></i><img src="../../images/logo.png" style={{width:170, height:35}}/></a></Link>
                    <Link className="headerIcon" to={'/events'}><a  href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                                            title="Events"><i className="fa fa-calendar"></i></a></Link>

                    <Link className="headerIcon" to={'/advertisement'}><a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                                                           title="Advertisements"><i className="fa fa-adn"></i></a></Link>
                    <a>
                        <input style={{width:'25%', marginBottom : 0, marginTop:5}} placeholder="Search..." className="w3-border w3-padding" ref="caption"></input>
                        <GoogleLogin
                            clientId="292577159044-5vfoi2cpvqc5utecqvtol9ir2sl8aslr.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            buttonText="Google"
                            style={{
                                marginLeft:5,
                                marginRight:5,
                                width: 90,
                               }}
                            icon="fa fa-google-plus"
                        />

                        <FacebookLogin
                            appId="143953939803032"
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="my-facebook-button-class"
                            icon="fa-facebook-square"
                        />
                       
                    </a>
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
                    <a className="w3-bar-item w3-button w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
                       href="#" ><i className="fa fa-bars"></i></a>
                    <Link to={'/profile'}><a className="w3-bar-item w3-button w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
                                            href="#" ><i className="fa fa-user"></i></a></Link>
                    <a href="#"
                       className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white"
                       title="My Account">
                    </a>
                </div>
            </div>

        )
    }
}

export default MemeRow;


