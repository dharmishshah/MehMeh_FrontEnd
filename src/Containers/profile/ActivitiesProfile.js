

import React from 'react';
import '../../style/profile.css'
import cookie from "react-cookies";
import MemeService from '../../Services/MemeServiceClient'


class ActivitiesProfile extends React.Component {
    constructor() {
        super()
        this.memeService = MemeService.instance
        this.state = {
            activities : []
        }


    }

    componentWillMount() {
        this.getAllActivitiesByUserId()

    }

    getAllActivitiesByUserId(){

        var userId = cookie.load('userId')
            this.memeService.getAllActivitiesByUserId(userId).then(activities => {
                var activities = activities.activities;
                this.setState({activities : activities})
            })

    }


    render() {
        return (
            <div className="tab-pane animated fadeInRight"
                 id="user-activities">
                <div className="scroll-user-widget">
                    <h5><strong>ACTIVITIES</strong></h5>
                    <ul className="media-list">

                        {this.state.activities.map((activity) => (
                            <li className="media initialCapitalize">
                                <p><strong>{activity.activity}</strong>
                                        <br/><i>{activity.createdTimestamp.split('T')[0] + " "+ (activity.createdTimestamp.split('T')[1])}</i></p>
                            </li>
                            )
                        )}

                    </ul>
                </div>
                {/* End div .scroll-user-widget */}
            </div>
        )
    }
}

export default ActivitiesProfile