import React from 'react';
import '../../style/profile.css'
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";


class AboutProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile : {}
        }

        this.userService = UserService.instance;


    }

    componentWillMount() {
        var role = cookie.load('role')
        this.setState({role : role})

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

                    <h5><strong>NAME</strong></h5>

                    <p>{this.state.profile.firstName} {this.state.profile.lastName}</p>

                    <h5><strong>GENDER</strong></h5>

                    <p>{this.state.profile.gender}</p>


                    {this.state.role == 'MEME_USER' && <div><h5><strong>ABOUT ME</strong></h5>
                    <p>
                        {this.state.profile.about_me ? this.state.profile.about_me : "Hi there, I am a meme user."}
                    </p></div>}
                    {this.state.role == 'EVENT_USER' && <div><h5><strong>EVENT GENRES</strong></h5><p>
                        {this.state.profile.eventGenre && this.state.profile.eventGenre.split(",").map( (eventG) => (
                            <span className=" badge text-capitilize customBadge w3-tag w3-small w3-theme-d5">{eventG}</span>
                        ))}

                    </p></div>}
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

                        </div>
                        <div className="col-sm-6">

                            {this.state.role == 'ADV_USER' && <div className="col-sm-6">
                                <h5><strong>Agency</strong></h5>
                                <address>
                                    <strong>Name</strong><br/>
                                    <abbr title="Phone">{this.state.profile.agencyName}</abbr>
                                </address>
                                <address>
                                    <strong>Website</strong><br/>
                                    <a href={this.state.profile.agencyWebsite}>{this.state.profile.agencyWebsite}</a>
                                </address>
                                <address>
                                    <strong>Address</strong><br/>
                                    <p title="Address">{this.state.profile.agencyAddress}</p>
                                </address>

                            </div>}

                            {this.state.role == 'EVENT_USER' && <div className="col-sm-6">
                                <h5><strong>Organisation</strong></h5>
                                <address>
                                    <strong>Name</strong><br/>
                                    <abbr title="Phone">{this.state.profile.organizationName}</abbr>
                                </address>
                                <address>
                                    <strong>Website</strong><br/>
                                    <a href={this.state.profile.organizationWebsite}>{this.state.profile.organizationWebsite}</a>
                                </address>
                                <address>
                                    <strong>Address</strong><br/>
                                    <p title="Address">{this.state.profile.organizationAddress}</p>
                                </address>

                            </div>}


                            {this.state.role == 'MEME_USER' && <div><h5><strong>Interests</strong></h5>
                            <p>

                                {this.state.profile.interests && this.state.profile.interests.split(",").map( (interest) => (
                                    <span className=" badge text-capitilize customBadge w3-tag w3-small w3-theme-d5">{interest}</span>
                                ))}
                            </p>
                            </div>}

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