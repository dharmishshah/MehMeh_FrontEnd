

import React from 'react';
import '../../style/profile.css'


class ActivitiesProfile extends React.Component {
    constructor() {
        super();


    }

    componentWillMount() {


    }


    render() {
        return (
            <div className="tab-pane animated fadeInRight"
                 id="user-activities">
                <div className="scroll-user-widget">
                    <ul className="media-list">
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>John
                                    </strong> uploaded a
                                    meme <strong>"DSC000254.jpg"</strong>
                                    <br/><i>2 minutes ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>James</strong> updated
                                    his profile picture album
                                    <br/><i>8 minutes ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Jennifer</strong> started following <strong>James</strong>
                                    <br/><i>an hour ago</i></p>
                            </a>
                        </li>

                    </ul>
                </div>
                {/* End div .scroll-user-widget */}
            </div>
        )
    }
}

export default ActivitiesProfile