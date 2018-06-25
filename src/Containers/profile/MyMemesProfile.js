import React from 'react';
import '../../style/profile.css'
import Dropzone from 'react-dropzone'
import MemeService from "../../Services/MemeServiceClient";


class MyMemesProfile extends React.Component {
    constructor() {
        super();
        this.memeService = MemeService.instance

    }

    componentWillMount() {


    }

    dropHandler(file){

        console.log(file)
        var photo = new FormData();
        photo.append('photo', file[0]);
        this.setState({file : file})


    }

    uploadImage(){
        var caption = this.refs.caption.value;
        var file = this.state.file;
        this.memeService.uploadImage(file,caption)
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

