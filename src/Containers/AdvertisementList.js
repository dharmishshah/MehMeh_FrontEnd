import React from 'react';
import '../index.css';
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';

import MemeRow from '../Components/MemeRow'
import LocalMemeRow from '../Components/LocalMemeRow'
import LocalAdRow from '../Components/LocalAdRow'
import MemeService from '../Services/MemeServiceClient'
import FacebookLogin from 'react-facebook-login'
import Dropzone from 'react-dropzone'


class MemeList extends React.Component {
    constructor() {
        super();
        this.memeService = MemeService.instance;
        this.state = {
            localAds : []
        };


    }

    componentWillMount() {
        this.findAllLocalAdvertisements();

    }

    findAllLocalAdvertisements(){
        var rows = this.state.localAds.map((meme) => {
            return (
                <LocalAdRow meme={meme} key={meme.id}/>
            )

        });
        return (
            rows
        )

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



                            <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white">
                                        <div className="w3-container w3-padding">
                                            <h6 className="w3-opacity">Quick Advertisement Upload</h6>
                                            <input style={{width:'100%', marginBottom : 15}} placeholder="name" className="w3-border w3-padding" ref="caption"></input>
                                            <input style={{width:'100%', marginBottom : 15}} placeholder="description" className="w3-border w3-padding" ref="caption"></input>
                                            <input style={{width:'100%', marginBottom : 15}} placeholder="frequency" className="w3-border w3-padding" ref="caption"></input>
                                            <div style={{ width:'100%',marginBottom : 15}}>
                                                <Dropzone  disableClick ={true} multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                                    <div> Just drop a meme and you are all set. </div>
                                                </Dropzone>
                                            </div>
                                            <button type="button" className="w3-button w3-theme" onClick={this.uploadImage}><i
                                                className="fa fa-pencil"></i> Upload Ad
                                            </button>
                                        </div>
                                    </div>
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
