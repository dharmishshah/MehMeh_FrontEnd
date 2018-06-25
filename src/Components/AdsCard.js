import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/event.css'

export default class AdsCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ad: this.props.ad
        }
    }

    render() {
        return(
            <div className ="col-sm-3" >
                <Card className="eventCard">
                    <CardImg className="eventImage" top width="100%" src={this.state.ad.advertisementImage} alt="Card image cap" />
                    <CardBody className="eventBody">
                        {/*<CardTitle className="eventTitle"></CardTitle>*/}
                        <CardTitle>{this.state.ad.advertisementName}</CardTitle>
                        <CardSubtitle>{this.state.ad.advertisementDescription}, frequency: {this.state.ad.frequency}</CardSubtitle>
                        {/*<Button><i className="fa fa-plus"></i></Button>*/}
                    </CardBody>
                    <a className="btn btn-danger">Delete Ad</a>
                </Card>
            </div>
        )
    }
}