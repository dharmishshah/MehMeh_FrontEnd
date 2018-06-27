import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../style/event.css'
import AdminServiceClient from "../Services/AdminServiceClient";
import UserService from "../Services/UserServiceClient";
import Dropzone from 'react-dropzone'
import Modal from 'react-responsive-modal';
import {ToggleButton, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap'


export default class UserCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }
        this.userService = UserService.instance;
        this.validate = this.validate.bind(this);
        this.genderChanged = this.genderChanged.bind(this);
    }

    validate() {
        if(this.state.user.role === "MEME_USER") {
            this.editMemeUserOpenModal();
        } else if( this.state.user.role === "EVENT_USER") {
            this.editEventUserOpenModal();
        } else if( this.state.user.role === "ADV_USER") {
            this.editAdvUserOpenModal();
        }
    }

    editMemeUserOpenModal = () => {
        this.setState({ memeopen: true });
    };

    editMemeUserCloseModal = () => {
        this.setState({ memeopen: false });
    };

    editEventUserOpenModal = () => {
        this.setState({ eventopen: true });
    };

    editEventUserCloseModal = () => {
        this.setState({ eventopen: false });
    };

    editAdvUserOpenModal = () => {
        this.setState({ adopen: true });
    };

    editAdvUserCloseModal = () => {
        this.setState({ adopen: false });
    };

    genderChanged(gender) {
        this.setState({gender: gender});
    }

    dropHandler(file, profile){

        var photo = new FormData();
        if(file){
            photo.append('photo', file[0]);
            this.userService = UserService.instance;
            this.userService.uploadProfilePicture(file).then((response) => {
                var fileName = response.data.filename
                this.setState({profilePicture : fileName})
            })
        }
    }

    render() {
        return(
            <div className ="col-sm-3" >
                <Card className="eventCard">
                    <CardImg className="eventImage" top width="100%" src={this.state.user.profilePicture ? this.state.user.profilePicture: "data:image/jpeg;base64,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"} alt="" />
                    <CardBody className="eventBody">
                        <CardTitle className="eventTitle">{this.state.user.firstName} {this.state.user.lastName}</CardTitle>
                        <CardText>{this.state.user.username}</CardText>
                        <CardSubtitle>{this.state.user.role}</CardSubtitle>
                    </CardBody>
                    <a className="btn btn-warning" onClick={this.validate}>Update User</a>
                    <a className="btn btn-danger" onClick={() => {this.props.deleteUser(this.state.user.id)}}>Delete User</a>
                </Card>

                {/*Meme User Modal*/}

                <Modal open={this.state.memeopen} onClose={this.editMemeUserCloseModal} center>

                    <div className="login-page">
                        <h3><strong>Edit user</strong></h3>
                        <div className="form">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab1" data-toggle="tab">Personal</a>
                                </li>
                                <li>
                                    <a href="#tab2" data-toggle="tab">Contact</a>
                                </li>
                                <li>
                                    <a href="#tab3" data-toggle="tab">Profile</a>
                                </li>
                            </ul>

                            <div className="tab-content clearfix">
                                <br/>
                                <div id="tab1" className="tab-pane active">
                                    <div className="login-form">
                                        {this.state.errorMsg && <div className="alert alert-danger">
                                            <strong>Oops!</strong> {this.state.errorMsg}
                                        </div>}
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.firstName = e.target.value
                                            this.setState({user : user})
                                        }} value={this.state.user.firstName} placeholder="first name" ref="firstName"></input>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.lastName = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.lastName} placeholder="last name" ref="lastName"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.about_me = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.about_me} placeholder="about yourself" ref="aboutMe"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.interests = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.interests} placeholder="interests(seperated by comma)" ref="interests"/>
                                        <ButtonToolbar>
                                            <ToggleButtonGroup type="radio"
                                                               value={this.state.user.gender}
                                                               name="options">
                                                <ToggleButton value="MALE" className="w3-button"
                                                              onClick={() => this.genderChanged("MALE")}>Male</ToggleButton>
                                                <ToggleButton value="FEMALE" className="w3-button"
                                                              onClick={() => this.genderChanged("FEMALE")}>Female</ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonToolbar>
                                        <br/>
                                    </div>
                                </div>

                                <div id="tab2" className="tab-pane">
                                    <div className="register-form">
                                        <input type="numeric" onChange={(e) => {
                                            var user = this.state.user
                                            user.mobileNo = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.mobileNo} placeholder="mobile no" ref="mobileNo"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.emailId = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.emailId} placeholder="email address" ref="emailId"/>
                                        <label id="signupMsg">{this.state.signupError}</label>
                                    </div>
                                </div>
                                <div id="tab3" className="tab-pane">
                                    <p><strong>Click on picture to change </strong></p>
                                    <div className="col-sm-3 ">

                                        <Dropzone style={{width: 'auto', height:'auto', borderWidth:
                                                2, borderColor: 'rgb(102, 102, 102)'}}
                                                  multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                            <img heigth="40" width="215" src={this.state.profilePicture ? this.state.profilePicture
                                                : "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                                 className="img-circle " alt="User avatar"/>

                                        </Dropzone>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="float-right w3-button w3-theme"
                                onClick={() => {this.props.updateMemeUser(this.state.user)}}> Update
                        </button>
                    </div>
                </Modal>

                {/*Event User Modal*/}

                <Modal open={this.state.eventopen} onClose={this.editEventUserCloseModal} center>

                    <div className="login-page">
                        <h3><strong>Edit user</strong></h3>
                        <div className="form">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab1" data-toggle="tab">Personal</a>
                                </li>
                                <li>
                                    <a href="#tab2" data-toggle="tab">Contact</a>
                                </li>
                                <li>
                                    <a href="#tab3" data-toggle="tab">Profile</a>
                                </li>
                                <li>
                                    <a href="#tab4" data-toggle="tab">Company</a>
                                </li>
                            </ul>

                            <div className="tab-content clearfix">
                                <br/>
                                <div id="tab1" className="tab-pane active">
                                    <div className="login-form">
                                        {this.state.errorMsg && <div className="alert alert-danger">
                                            <strong>Oops!</strong> {this.state.errorMsg}
                                        </div>}
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.firstName = e.target.value
                                            this.setState({user : user})
                                        }} value={this.state.user.firstName} placeholder="first name" ref="firstName"></input>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.lastName = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.lastName} placeholder="last name" ref="lastName"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.eventGenre = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.eventGenre} placeholder="event genre(comma seperated)" ref="eventGenre"/>
                                        <ButtonToolbar>
                                            <ToggleButtonGroup type="radio"
                                                               value={this.state.user.gender}
                                                               name="options">
                                                <ToggleButton value="MALE" className="w3-button"
                                                              onClick={() => this.genderChanged("MALE")}>Male</ToggleButton>
                                                <ToggleButton value="FEMALE" className="w3-button"
                                                              onClick={() => this.genderChanged("FEMALE")}>Female</ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonToolbar>
                                        <br/>
                                    </div>
                                </div>

                                <div id="tab2" className="tab-pane">
                                    <div className="register-form">
                                        <input type="numeric" onChange={(e) => {
                                            var user = this.state.user
                                            user.mobileNo = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.mobileNo} placeholder="mobile no" ref="mobileNo"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.emailId = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.emailId} placeholder="email address" ref="emailId"/>
                                        <label id="signupMsg">{this.state.signupError}</label>
                                    </div>
                                </div>
                                <div id="tab3" className="tab-pane">
                                    <p><strong>Click on picture to change </strong></p>
                                    <div className="col-sm-3 ">


                                        <Dropzone style={{width: 'auto', height:'auto', borderWidth:
                                                2, borderColor: 'rgb(102, 102, 102)'}}
                                                  multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                            <img heigth="40" width="215" src={this.state.profilePicture ? this.state.profilePicture
                                                : "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                                 className="img-circle " alt="User avatar"/>

                                        </Dropzone>

                                    </div>
                                </div>

                                <div id="tab4" className="tab-pane">
                                    <div className="login-form">
                                        {this.state.errorMsg && <div className="alert alert-danger">
                                            <strong>Oops!</strong> {this.state.errorMsg}
                                        </div>}
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.organizationName = e.target.value
                                            this.setState({user : user})
                                        }} value={this.state.user.organizationName} placeholder="organisation name" ref="organizationName"></input>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.organizationAddress = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.organizationAddress} placeholder="organisation address" ref="organizationAddress"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.organizationWebsite = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.organizationWebsite} placeholder="organisation website" ref="organizationWebsite"/>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="float-right w3-button w3-theme"
                                onClick={() => {this.props.updateEventUser(this.state.user)}}> Update
                        </button>
                    </div>

                </Modal>

                {/*Advertisement User*/}

                <Modal open={this.state.adopen} onClose={this.editAdvUserCloseModal} center>

                    <div className="login-page">
                        <h3><strong>Edit user</strong></h3>
                        <div className="form">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab1" data-toggle="tab">Personal</a>
                                </li>
                                <li>
                                    <a href="#tab2" data-toggle="tab">Contact</a>
                                </li>
                                <li>
                                    <a href="#tab3" data-toggle="tab">Profile</a>
                                </li>
                                <li>
                                    <a href="#tab4" data-toggle="tab">Company</a>
                                </li>
                            </ul>

                            <div className="tab-content clearfix">
                                <br/>
                                <div id="tab1" className="tab-pane active">
                                    <div className="login-form">
                                        {this.state.errorMsg && <div className="alert alert-danger">
                                            <strong>Oops!</strong> {this.state.errorMsg}
                                        </div>}
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.firstName = e.target.value
                                            this.setState({user : user})
                                        }} value={this.state.user.firstName} placeholder="first name" ref="firstName"></input>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.lastName = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.lastName} placeholder="last name" ref="lastName"/>
                                        <ButtonToolbar>
                                            <ToggleButtonGroup type="radio"
                                                               value={this.state.user.gender}
                                                               name="options">
                                                <ToggleButton value="MALE" className="w3-button"
                                                              onClick={() => this.genderChanged("MALE")}>Male</ToggleButton>
                                                <ToggleButton value="FEMALE" className="w3-button"
                                                              onClick={() => this.genderChanged("FEMALE")}>Female</ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonToolbar>
                                        <br/>
                                    </div>
                                </div>

                                <div id="tab2" className="tab-pane">
                                    <div className="register-form">
                                        <input type="numeric" onChange={(e) => {
                                            var user = this.state.user
                                            user.mobileNo = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.mobileNo} placeholder="mobile no" ref="mobileNo"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.emailId = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.emailId} placeholder="email address" ref="emailId"/>
                                        <label id="signupMsg">{this.state.signupError}</label>
                                    </div>
                                </div>
                                <div id="tab3" className="tab-pane">
                                    <p><strong>Click on picture to change </strong></p>
                                    <div className="col-sm-3 ">

                                        <Dropzone style={{width: 'auto', height:'auto', borderWidth:
                                                2, borderColor: 'rgb(102, 102, 102)'}}
                                                  multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                            <img heigth="40" width="215" src={this.state.profilePicture ? this.state.profilePicture
                                                : "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                                 className="img-circle " alt="User avatar"/>

                                        </Dropzone>

                                    </div>
                                </div>

                                <div id="tab4" className="tab-pane">
                                    <div className="login-form">
                                        {this.state.errorMsg && <div className="alert alert-danger">
                                            <strong>Oops!</strong> {this.state.errorMsg}
                                        </div>}
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.agencyName = e.target.value
                                            this.setState({user : user})
                                        }} value={this.state.user.agencyName} placeholder="organisation name" ref="agencyName"></input>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.agencyAddress = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.agencyAddress} placeholder="organisation address" ref="agencyAddress"/>
                                        <input type="text" onChange={(e) => {
                                            var user = this.state.user
                                            user.agencyWebsite = e.target.value
                                            this.setState({user : user})
                                        }}value={this.state.user.agencyWebsite} placeholder="organisation website" ref="agencyWebsite"/>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="float-right w3-button w3-theme"
                                onClick={() => {this.props.updateAdvUser(this.state.user)}}> Update
                        </button>
                    </div>

                </Modal>

            </div>
        )
    }
}