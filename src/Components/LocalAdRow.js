import React from 'react'
import $ from 'jquery'
import '../App.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class MemeRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ad : this.props.ad
        }


    }


    render() {
        return (
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br/>
                <span className="w3-right w3-opacity">1 min</span>
                <h4>{this.state.ad.name}</h4><br/>
                <hr className="w3-clear"/>

                <img src={this.state.ad.imgSrc} style={{width:'100%'}}
                     className="w3-margin-bottom"/>

                <p>{this.state.ad.imgSrc}</p>

                <p>
                    {this.state.ad.tags.map((tag) => (
                        <span className="w3-tag w3-small w3-tme-d1 tags-margin">{tag.display_name}</span>
                    ))}
                </p>
            </div>
        )
    }
}

export default MemeRow;


