import React from 'react';
import '../style/profile.css'
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';

import MemeRow from '../Components/MemeRow'
import LocalMemeRow from '../Components/LocalMemeRow'
import MemeService from '../Services/MemeServiceClient'
import FacebookLogin from 'react-facebook-login'
import Dropzone from 'react-dropzone'


class MemeList extends React.Component {
    constructor() {
        super();



    }

    componentWillMount() {


    }
    

    render() {
        return (

            <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                <div className="w3-row">
                    <div className="w3-col m12">
                        <div className="w3-card w3-round w3-white">
                            <div className="w3-container w3-padding">

                                <div className="container">
                                        <div className="content-page">
                                            <div className="profile-banner"
                                                 >
                                                <div className="col-sm-3 avatar-container">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                         className="img-circle profile-avatar" alt="User avatar"/>
                                                </div>
                                                <div className="col-sm-12 profile-actions text-right">
                                                    <button type="button" className="btn btn-success btn-sm"><i
                                                        className="fa fa-check"></i> Friends
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm"><i
                                                        className="fa fa-envelope"></i> Send Message
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="content">

                                                <div className="w3-row">
                                                    <div className="col-sm-3">
                                                        {/* Begin user profile */}
                                                        <div className="text-center user-profile-2"
                                                             style={{marginTop:120}}>
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <h4>Howdy, <b>Jane Doe</b></h4>
                                                                    <h5>Administrator</h5>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <span className="badge">1,245</span>
                                                                    Followers
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <span className="badge">245</span>
                                                                    Following
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <span className="badge">1,245</span>
                                                                    Tweets
                                                                </li>
                                                            </ul>

                                                            {/* User button */}
                                                            <div className="user-button">
                                                                <div className="w3-row">
                                                                    <div className="col-lg-6">
                                                                        <button type="button"
                                                                                className="btn btn-primary btn-sm btn-block">
                                                                            <i className="fa fa-envelope"></i> Send
                                                                            Message
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <button type="button"
                                                                                className="btn btn-default btn-sm btn-block">
                                                                            <i className="fa fa-user"></i> Add as friend
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* End div .user-button */}
                                                        </div>
                                                        {/* End div .box-info */}
                                                        {/* Begin user profile */}
                                                    </div>
                                                    {/* End div .col-sm-4 */}

                                                    <div className="col-sm-9">
                                                        <div className="widget widget-tabbed">
                                                            {/* Nav tab */}
                                                            <ul className="nav nav-tabs ">
                                                                <li className="active"><a href="#my-timeline"
                                                                                          data-toggle="tab"><i
                                                                    className="fa fa-pencil"></i> Timeline</a></li>
                                                                <li><a href="#about" data-toggle="tab"><i
                                                                    className="fa fa-user"></i> About</a></li>
                                                                <li><a href="#user-activities" data-toggle="tab"><i
                                                                    className="fa fa-laptop"></i> Activities</a></li>
                                                                <li><a href="#mymessage" data-toggle="tab"><i
                                                                    className="fa fa-envelope"></i> Message</a></li>
                                                            </ul>
                                                            {/* End nav tab */}

                                                            {/* Tab panes */}
                                                            <div className="tab-content">


                                                                {/* Tab timeline */}
                                                                <div className="tab-pane animated active fadeInRight"
                                                                     id="my-timeline">
                                                                    <div className="user-profile-content">

                                                                        {/* Begin timeline */}
                                                                        <div className="the-timeline">
                                                                            <form role="form"
                                                                                  className="post-to-timeline">
                                                                                <textarea className="form-control"
                                                                                          style={{height: 70,marginBottom:10}}
                                                                                          placeholder="Whats on your mind..."></textarea>
                                                                                <div className="w3-row">
                                                                                    <div className="col-sm-6">
                                                                                        <a className="btn btn-sm btn-default"><i
                                                                                            className="fa fa-camera"></i></a>
                                                                                        <a className="btn btn-sm btn-default"><i
                                                                                            className="fa fa-video-camera"></i></a>
                                                                                        <a className="btn btn-sm btn-default"><i
                                                                                            className="fa fa-map-marker"></i></a>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-sm-6 text-right">
                                                                                        <button type="submit"
                                                                                                className="btn btn-primary">Post
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                            <br/><br/>
                                                                            <ul>
                                                                                <li>
                                                                                    <div className="the-date">
                                                                                        <span>01</span>
                                                                                        <small>Feb</small>
                                                                                    </div>
                                                                                    <h4>Lorem ipsum dolor!</h4>
                                                                                    <p>
                                                                                        Lorem ipsum dolor sit amet,
                                                                                        consectetuer adipiscing
                                                                                        elit, sed diam nonummy nibh
                                                                                        euismod tincidunt ut laoreet
                                                                                        dolore magna aliquam erat
                                                                                        volutpat.
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="the-date">
                                                                                        <span>31</span>
                                                                                        <small>Jan</small>
                                                                                    </div>
                                                                                    <h4>Yohoo! you can put video
                                                                                        here</h4>
                                                                                    <div className="videoWrapper">
                                                                                        <iframe
                                                                                            src="//player.vimeo.com/video/85847275?title=0&amp;byline=0&amp;portrait=0"></iframe>
                                                                                    </div>
                                                                                    <p>
                                                                                        Lorem ipsum dolor sit amet,
                                                                                        consectetuer adipiscing
                                                                                        elit, sed diam nonummy nibh
                                                                                        euismod tincidunt ut laoreet
                                                                                        dolore magna aliquam erat
                                                                                        volutpat.
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="the-date">
                                                                                        <span>25</span>
                                                                                        <small>Jan</small>
                                                                                    </div>
                                                                                    <h4>You also can put Soundcloud
                                                                                        iframe here</h4>
                                                                                    <iframe
                                                                                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/132890481&amp;color=ff9900&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>
                                                                                    <p>
                                                                                        Lorem ipsum dolor sit amet,
                                                                                        consectetuer adipiscing
                                                                                        elit, sed diam nonummy nibh
                                                                                        euismod tincidunt ut laoreet
                                                                                        dolore magna aliquam erat
                                                                                        volutpat.
                                                                                    </p>
                                                                                </li>
                                                                                <li className="the-year"><p>2013</p>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="the-date">
                                                                                        <span>20</span>
                                                                                        <small>Dec</small>
                                                                                    </div>
                                                                                    <p>
                                                                                        Lorem ipsum dolor sit amet,
                                                                                        consectetuer adipiscing
                                                                                        elit, sed diam nonummy nibh
                                                                                        euismod tincidunt ut laoreet
                                                                                        dolore magna aliquam erat
                                                                                        volutpat.
                                                                                    </p>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="the-date">
                                                                                        <span>27</span>
                                                                                        <small>Nov</small>
                                                                                    </div>
                                                                                    <p>
                                                                                        Lorem ipsum dolor sit amet,
                                                                                        consectetuer adipiscing
                                                                                        elit, sed diam nonummy nibh
                                                                                        euismod tincidunt ut laoreet
                                                                                        dolore magna aliquam erat
                                                                                        volutpat.
                                                                                    </p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        {/* End div .the-timeline */}
                                                                        {/* End timeline */}
                                                                    </div>
                                                                    {/* End div .user-profile-content */}
                                                                </div>
                                                                {/* End div .tab-pane */}
                                                                {/* End Tab timeline */}

                                                                {/* Tab about */}
                                                                <div className="tab-pane animated fadeInRight"
                                                                     id="about">
                                                                    <div className="user-profile-content">
                                                                        <h5><strong>ABOUT</strong> ME</h5>
                                                                        <p>
                                                                            Lorem ipsum dolor sit amet, consectetuer
                                                                            adipiscing elit, sed diam nonummy nibh
                                                                            euismod tincidunt ut laoreet dolore magna
                                                                            aliquam erat volutpat. Ut wisi enim ad minim
                                                                            veniam, quis nostrud exerci tation
                                                                            ullamcorper suscipit lobortis nisl ut
                                                                            aliquip ex ea commodo consequat.
                                                                        </p>
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
                                                                {/* End div .tab-pane */}
                                                                {/* End Tab about */}


                                                                {/* Tab user activities */}
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
                                                                {/* End div .tab-pane */}
                                                                {/* End Tab user activities */}

                                                                {/* Tab user messages */}
                                                                <div className="tab-pane animated fadeInRight"
                                                                     id="mymessage">
                                                                    <div className="scroll-user-widget">
                                                                        <ul className="media-list">
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">John Doe</a>
                                                                                        <small>Just now</small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Annisa</a>
                                                                                        <small>Yesterday at 04:00 AM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit. Nam
                                                                                        rhoncus</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Rusmanovski</a>
                                                                                        <small>January 17, 2014 05:35
                                                                                            PM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Ari
                                                                                        Rusmanto</a>
                                                                                        <small>January 17, 2014 05:35
                                                                                            PM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Jenny Doe</a>
                                                                                        <small>January 17, 2014 05:35
                                                                                            PM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">John Doe</a>
                                                                                        <small>Just now</small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Annisa</a>
                                                                                        <small>Yesterday at 04:00 AM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit. Nam
                                                                                        rhoncus</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Rusmanovski</a>
                                                                                        <small>January 17, 2014 05:35
                                                                                            PM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Ari
                                                                                        Rusmanto</a>
                                                                                        <small>January 17, 2014 05:35
                                                                                            PM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                            <li className="media">
                                                                                <a className="pull-left"
                                                                                   href="#fakelink">
                                                                                    <img
                                                                                        className="media-object user-message"
                                                                                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                                                        alt="Avatar"/>
                                                                                </a>
                                                                                <div className="media-body">
                                                                                    <h4 className="media-heading"><a
                                                                                        href="#fakelink">Jenny Doe</a>
                                                                                        <small>January 17, 2014 05:35
                                                                                            PM
                                                                                        </small>
                                                                                    </h4>
                                                                                    <p>Lorem ipsum dolor sit amet,
                                                                                        consectetur adipiscing elit</p>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    {/* End div .scroll-user-widget */}
                                                                </div>
                                                                {/* End div .tab-pane */}
                                                                {/* End Tab user messages */}
                                                            </div>
                                                            {/* End div .tab-content */}
                                                        </div>
                                                        {/* End div .box-info */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MemeList;
