

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
                                    Doe</strong> Uploaded a
                                    photo <strong>"DSC000254.jpg"</strong>
                                    <br/><i>2 minutes ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>John Doe</strong> Created
                                    an photo album <strong>"Indonesia
                                        Tourism"</strong>
                                    <br/><i>8 minutes ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Annisa</strong> Posted an
                                    article <strong>"Yogyakarta
                                        never ending Asia"</strong>
                                    <br/><i>an hour ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Ari
                                    Rusmanto</strong> Added 3
                                    products
                                    <br/><i>3 hours ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Hana
                                    Sartika</strong> Send you a
                                    message <strong>"Lorem ipsum
                                        dolor..."</strong>
                                    <br/><i>12 hours ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Johnny
                                    Depp</strong> Updated his avatar
                                    <br/><i>Yesterday</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>John
                                    Doe</strong> Uploaded a
                                    photo <strong>"DSC000254.jpg"</strong>
                                    <br/><i>2 minutes ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>John Doe</strong> Created
                                    an photo album <strong>"Indonesia
                                        Tourism"</strong>
                                    <br/><i>8 minutes ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Annisa</strong> Posted an
                                    article <strong>"Yogyakarta
                                        never ending Asia"</strong>
                                    <br/><i>an hour ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Ari
                                    Rusmanto</strong> Added 3
                                    products
                                    <br/><i>3 hours ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Hana
                                    Sartika</strong> Send you a
                                    message <strong>"Lorem ipsum
                                        dolor..."</strong>
                                    <br/><i>12 hours ago</i></p>
                            </a>
                        </li>
                        <li className="media">
                            <a href="#fakelink">
                                <p><strong>Johnny
                                    Depp</strong> Updated his avatar
                                    <br/><i>Yesterday</i></p>
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