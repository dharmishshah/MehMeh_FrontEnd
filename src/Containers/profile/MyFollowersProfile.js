import React from 'react';
import '../../style/profile.css'


class MyFollowersProfile extends React.Component {
    constructor() {
        super();


    }

    componentWillMount() {


    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="myFollowers">
                <div className="user-profile-content">
                    <h5><strong>FOLLOWERS</strong></h5>

                    <div className="w3-row">
                        <div className="col-sm-6">
                            <h5><strong>Name</strong></h5>
                            <address>
                                <strong>Email</strong><br/>
                                <abbr title="Phone">+62 857 123
                                    4567</abbr>
                            </address>
                            <address>
                                <strong>Email</strong><br/>
                                <a href="mailto:#">first.last@example.com</a>
                            </address>

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