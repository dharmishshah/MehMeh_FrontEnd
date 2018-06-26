import React from 'react';
import '../../style/profile.css'
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";


class MyFollowersProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            followers:[]
        }

        this.userService = UserService.instance


    }

    componentWillMount() {
        this.findProfileByUserId()

    }

    findProfileByUserId(){

        var userId = cookie.load('userId')
        var role = cookie.load('role');

        this.userService.findProfileByUserId(userId).then(profile => {
            var followers = profile.followers;
            this.setState({followers: followers})
        })

    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="myFollowers">
                <div className="user-profile-content">
                    <h5><strong>FOLLOWERS</strong></h5>

                    <div className="w3-row">

                        <div className="" id="followers">
                            {this.state.followers.map((follower)=>(
                                <div className="media user-follower">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User Avatar"
                                         className="media-object pull-left"/>
                                    <div className="media-body">
                                        <a href="#">{follower.username}<br></br><span className="text-muted username">{follower.emailId}</span></a>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default MyFollowersProfile