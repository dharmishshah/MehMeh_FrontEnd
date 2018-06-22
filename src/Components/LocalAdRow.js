import React from 'react'
import $ from 'jquery'
import '../App.css'
import '../style/advertisement.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class LocalAdRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ad : this.props.ad
        }


    }


    render() {
        return (
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br/>
                <h4><span className="float-left badge customBadge"> AD </span> {this.state.ad.advertisementName} </h4><br/>
                <hr className="w3-clear"/>


                <img src={this.state.ad.advertisementImage} style={{width:'70%',marginLeft:100}}
                     className="w3-margin-bottom"/>

                <p>{this.state.ad.advertisementDescription}</p>
            </div>
        )
    }
}

export default LocalAdRow;


