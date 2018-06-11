import React from 'react'
import $ from 'jquery'

import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class MemeRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            meme : this.props.meme
        }


    }


    render() {
        return (
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br/>
                <span className="w3-right w3-opacity">1 min</span>
                <h4>{this.state.meme.title}</h4><br/>
                <hr className="w3-clear"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>


                <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i
                    className="fa fa-thumbs-up"></i> Like
                </button>
                <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i
                    className="fa fa-comment"></i> Comment
                </button>
            </div>
        )
    }
}

export default MemeRow;


