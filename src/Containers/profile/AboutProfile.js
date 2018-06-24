import React from 'react';
import '../../style/profile.css'
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";


class AboutProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile : this.props.profile
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

            <div className="tab-pane animated active fadeInRight"
                 id="about">
                <div className="user-profile-content">
                    <h5><strong>ABOUT ME</strong></h5>
                    <p>
                        Hi there, I am a meme user.
                    </p>
                    <hr></hr>
                    <div className="w3-row">
                        <div className="col-sm-6">
                            <h5><strong>Contact Me</strong></h5>
                            <address>
                                <strong>Phone</strong><br/>
                                <abbr title="Phone">{this.state.profile.mobileNo}</abbr>
                            </address>
                            <address>
                                <strong>Email</strong><br/>
                                <a href="mailto:#">{this.state.profile.emailId}</a>
                            </address>
                            <address>
                                <strong>Website</strong><br/>
                                <a href="http://r209.com">http://r209.com</a>
                            </address>
                        </div>
                        <div className="col-sm-6">
                            <h5><strong>Interests</strong></h5>

                        </div>
                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default AboutProfile