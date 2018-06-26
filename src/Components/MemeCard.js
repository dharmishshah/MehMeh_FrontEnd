import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/event.css'
import AdminServiceClient from "../Services/AdminServiceClient";

export default class MemeCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            meme: this.props.meme
        }
    }

    render() {
        return(
            <div className ="col-sm-3" >
                <Card className="eventCard">
                    <CardImg className="eventImage" top width="100%" src={this.state.meme.imgSrc} alt="Card image cap" />
                    <CardBody className="eventBody">
                        {/*<CardTitle className="eventTitle"></CardTitle>*/}
                        <CardTitle>{this.state.meme.caption}</CardTitle>
                        {/*<CardSubtitle></CardSubtitle>*/}
                        {/*<Button><i className="fa fa-plus"></i></Button>*/}
                    </CardBody>
                    <a className="btn btn-danger" onClick={() => {this.props.deleteMeme(this.state.meme.id)}}>Delete Meme</a>
                </Card>
            </div>
        )
    }
}