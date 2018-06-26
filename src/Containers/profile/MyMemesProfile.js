import React from 'react';
import '../../style/profile.css'
import Dropzone from 'react-dropzone'
import MemeService from "../../Services/MemeServiceClient";
import cookie from "react-cookies";
import UserService from "../../Services/UserServiceClient";

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


class MyMemesProfile extends React.Component {
    constructor() {
        super();
        this.memeService = MemeService.instance
        this.userService = UserService.instance;

        this.state = {
            profile : {},
            memes :[]
        }

        this.uploadImage = this.uploadImage.bind(this)
        this.dropHandler = this.dropHandler.bind(this)

    }

    componentWillMount() {

    this.findProfileByUserId();
    }

    dropHandler(file){

        console.log(file)
        var photo = new FormData();
        if(file){
            photo.append('photo', file[0]);
            this.setState({file : file})
        }



    }

    findProfileByUserId(){

        var userId = cookie.load('userId')
        var role = cookie.load('role');

        if("MEME_USER" == role) {

            this.userService.findProfileByUserId(userId).then(profile => {
                var profile1 = profile.user;
                var memes = profile1.memes
                this.setState({profile: profile1})
                this.setState({memes: memes})
            })
        }

    }

    uploadImage(){
        var caption = this.refs.caption.value;
        var file = this.state.file;
        this.memeService.uploadImage(file,caption)
            .then(response => {
                this.findProfileByUserId();
            })
    }

    deleteMeme(memeId){
        this.memeService.deleteMeme(memeId).then(()=>{
            this.findProfileByUserId()
        })
    }


    render() {
        return (
            <div className="tab-pane animated fadeInRight"
                 id="myMemes">
                <div className="user-profile-content">

                    <div className="the-timeline">
                        <div className="w3-container w3-margin">
                            <h5><strong>QUICK MEME UPLOAD</strong></h5>
                            <input style={{width:'100%', marginBottom : 15}} placeholder="caption" className="w3-border w3-padding" ref="caption"></input>
                            <div style={{ width:'100%',marginBottom : 15}}>
                                <Dropzone style={{width: 'auto', height: 80, borderWidth:
                                        2, borderColor: 'rgb(102, 102, 102)',borderStyle: 'dashed',borderRadius: 5}}
                                          multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                    <div style={{textAlign:'center'}} > Select or drop a meme.</div>
                                </Dropzone>
                            </div>
                            <button type="button" className="w3-button w3-theme" style={{marginBottom: '1%'}} onClick={this.uploadImage}><i className="fa fa-pencil"></i>
                                Upload
                            </button>
                        </div>

                        <br/>
                        <div className="w3-container w3-margin">
                            <h5><strong>MY MEMES</strong></h5>
                            <div className="row">
                                {this.state.memes.map((meme) =>(
                                    <div className ="col-sm-6" >

                                        <Card className="eventCard">
                                            <CardImg className="eventImage" top width="100%" src={meme.imgSrc}/>
                                            <CardBody className="eventBody">
                                                <CardTitle className="eventTitle">{meme.caption} </CardTitle>
                                                <CardSubtitle>{meme.eventDescription}</CardSubtitle>
                                                <button type="button" onClick={() => this.deleteMeme(meme.id)} className="btn btn-md btn-danger pull-right"><i
                                                    className="fa fa-close-round"></i> Delete
                                                </button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                    {/* End div .the-timeline */}
                    {/* End timeline */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}

export default MyMemesProfile;

