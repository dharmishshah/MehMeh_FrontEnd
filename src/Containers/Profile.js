import React from 'react';
import '../index.css';
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
            <div >



                {/* Navbar on small screens*/}


                {/* Page Container */}
                <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                    <div className="w3-row">
                        {/* Left Column -->*/}
                        <div className="w3-col m2">
                            {/*-- Profile -->*/}

                            <br/>

                            {/*-- End Left Column -->*/}
                        </div>

                        {/*-- Middle Column -->*/}
                        <div className="w3-col m8">



                            <div className="w3-card w3-round w3-white">
                                <div className="w3-container">
                                    <h4 className="w3-center">My Profile</h4>
                                    <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle"
                                                                  style={{height:106,width:106}} alt="Avatar" /></p>
                                    <hr/>
                                    <p><i
                                        className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Name </p>
                                    <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> Location
                                    </p>
                                    <p><i
                                        className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> Birth Date</p>
                                </div>
                            </div>




                            {/*-- End Middle Column -->*/}
                        </div>

                        {/*-- Right Column -->*/}


                        {/*-- End Grid -->*/}
                    </div>

                    {/*-- End Page Container -->*/}
                </div>

            </div>
        )
    }
}
export default MemeList;
