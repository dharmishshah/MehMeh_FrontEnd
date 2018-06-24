import React from 'react';
import '../../style/profile.css'


class FollowingProfile extends React.Component {
    constructor() {
        super();


    }

    componentWillMount() {


    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="following">
                <div className="user-profile-content">
                    <h5><strong>FOLLOWING</strong></h5>

                    <hr></hr>
                    <div className="w3-row">
                        <div className="col-sm-6">
                            <h5><strong>CONTACT</strong> ME</h5>
                            <address>
                                <strong>Phone</strong><br/>
                                <abbr title="Phone">+62 857 123
                                    4567</abbr>
                            </address>
                            <address>
                                <strong>Email</strong><br/>
                                <a href="mailto:#">first.last@example.com</a>
                            </address>
                            <address>
                                <strong>Website</strong><br/>
                                <a href="http://r209.com">http://r209.com</a>
                            </address>
                        </div>
                        <div className="col-sm-6">
                            <h5><strong>MY</strong> SKILLS</h5>
                            <p>UI Design</p>
                            <p>Clean and Modern Web Design</p>
                            <p>PHP and MySQL Programming</p>
                            <p>Vector Design</p>
                        </div>
                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default FollowingProfile