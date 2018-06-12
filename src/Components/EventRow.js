import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class EventRow extends Component{

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event
        }
    }

    render() {
        return(
            <div>
                <Card>
                    <CardImg top width="100%" src={this.state.event.logo.url} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.state.event.name.text}</CardTitle>
                        <CardText>{this.state.event.description.text}</CardText>
                        <Button><i className="fa fa-plus"></i></Button>
                    </CardBody>
                </Card>
            </div>
        )
    }

}