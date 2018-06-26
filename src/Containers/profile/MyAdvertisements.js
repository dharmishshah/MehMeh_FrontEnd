import React from 'react';
import '../../style/profile.css'
import Dropzone from 'react-dropzone'
import AdvertisementService from '../../Services/AdvertisementServiceClient'
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


class MyAdvertisements extends React.Component {
    constructor() {
        super();
        this.advertisementService = AdvertisementService.instance
        this.userService = UserService.instance;
        this.state = {
            uploadStatus : 'Select or drop a advertisement.',
            profile:{},
            ads:[]
        }
        this.dropHandler = this.dropHandler.bind(this)
        this.uploadAdvertisementImage = this.uploadAdvertisementImage.bind(this)

    }

    componentWillMount() {

        this.findProfileByUserId();
    }

    dropHandler(file){

        console.log(file)
        var photo = new FormData();
        photo.append('photo', file[0]);
        this.setState({file : file})

    }


    findProfileByUserId(){

        var userId = cookie.load('userId')

        var role = cookie.load('role');

        if("ADV_USER" == role){
            this.userService.findProfileByUserId(userId).then(profile => {
                var profile1 = profile.user;
                var ads = profile1.ads
                this.setState({profile : profile1})
                this.setState({ads:ads})
            })
        }



    }

    uploadAdvertisementImage(){
        var file = this.state.file;

        var advertisement = {
            advertisementName :  (this.refs.advertisementName.value)?  this.refs.advertisementName.value:"",
            advertisementDescription :(this.refs.advertisementDescription.value)?  this.refs.advertisementDescription.value:"",
            frequency : (this.refs.frequency.value)?  this.refs.frequency.value:"",
            advertisementType:(this.refs.advertisementType.value)?  this.refs.advertisementType.value:""

        }
        this.advertisementService.uploadAdvertisementImage(file,advertisement)
            .then(response => {
                this.findProfileByUserId();
            })
    }

    deleteAd(adId){
        this.advertisementService.deleteAd(adId).then(()=>{
            this.findProfileByUserId()
        })
    }


    render() {
        return (

            <div className="tab-pane animated fadeInRight"
                 id="myAdvertisements">
                <div className="user-profile-content">
                    <div className="w3-container w3-margin">
                        <h5><strong>QUICK ADVERTISEMENT UPLOAD</strong></h5>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="name"
                               className="w3-border w3-padding" ref="advertisementName"></input>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="description"
                               className="w3-border w3-padding" ref="advertisementDescription"></input>
                        <input style={{width:'100%', marginBottom : 15}} placeholder="advertisement type"
                               className="w3-border w3-padding" ref="advertisementType"></input>
                        <input type="number" style={{width:'100%', marginBottom : 15}} placeholder="target views"
                               className="w3-border w3-padding" ref="frequency"></input>
                        <div style={{ width:'100%',marginBottom : 15}}>
                            <Dropzone style={{width: 'auto', height: 100, borderWidth:
                                    2, borderColor: 'rgb(102, 102, 102)',borderStyle: 'dashed',borderRadius: 5}}
                                      multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                <div style={{textAlign:'center'}} >{this.state.uploadStatus}</div>
                            </Dropzone>
                        </div>
                        <button type="button" className="w3-button w3-theme" onClick={this.uploadAdvertisementImage}><i
                            className="fa fa-pencil"></i> Upload Ad
                        </button>
                    </div>
                    <div className="w3-container w3-margin">
                        <h5><strong>MY ADVERTISEMENTS</strong></h5>
                        <div className="row">
                            {this.state.ads.map((ad) =>(
                                <div className ="col-sm-6" >

                                    <Card className="eventCard">
                                        <CardImg className="eventImage" top width="100%" src={ad.advertisementImage}/>
                                        <CardBody className="eventBody">
                                            <CardTitle className="eventTitle">{ad.advertisementName} </CardTitle>
                                            <CardSubtitle>{ad.advertisementDescription}</CardSubtitle>
                                            <button type="button" onClick={() => this.deleteAd(ad.id)} className="btn btn-md btn-danger pull-right"><i
                                                className="fa fa-close-round"></i> Delete
                                            </button>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}

                        </div>
                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default MyAdvertisements