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


                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default MyFollowersProfile