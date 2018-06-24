import React from 'react';
import '../../style/profile.css'


class MyEventsProfile extends React.Component {
    constructor() {
        super();


    }

    componentWillMount() {


    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="myEvents">
                <div className="user-profile-content">
                    <div className="w3-container w3-margin">
                        <h5><strong>MY EVENTS</strong></h5>
                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default MyEventsProfile