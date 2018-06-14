import React from 'react'
import $ from 'jquery'
import '../App.css'
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
                

                {('image/gif' === this.state.meme.type ||
                    'image/png' === this.state.meme.type ||
                    'image/jpeg' === this.state.meme.type)  && <img src={this.state.meme.link} style={style}
                                                                  className="w3-margin-bottom"/>}

                {'video/mp4' === this.state.meme.type &&  <video width="500" height="350" controls>
                    <source src={this.state.meme.link}  type="video/mp4"/>
                </video>}

                {this.state.meme.images && this.state.meme.images[0].link.includes('mp4') &&
                    <video width="500" height="350" controls>
                        <source src={this.state.meme.images[0].link}  type="video/mp4"/>
                    </video>
                }

                {this.state.meme.images && !this.state.meme.images[0].link.includes('mp4') &&
                <img src={this.state.meme.images[0].link} style={style}
                                                className="w3-margin-bottom"/>}



                <p>
                    {this.state.meme.tags.map((tag) => (
                        <span className="w3-tag w3-small w3-tme-d1 tags-margin">{tag.display_name}</span>
                    ))}
                </p>


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

const style = {
    width:'70%',marginLeft:100
}

export default MemeRow;


