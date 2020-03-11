import React from 'react';
import '../index.css';
import '../style/main.css'

import LocalAdRow from '../Components/LocalAdRow'
import AdvertisementService from '../Services/AdvertisementServiceClient'
import Dropzone from 'react-dropzone'

class AdvertisementList extends React.Component {
    constructor() {
        super();
        this.advertisementService = AdvertisementService.instance;
        this.state = {
            localAds : [],
            uploadStatus : 'Select or drop a advertisement.'
        };

        this.dropHandler = this.dropHandler.bind(this)
        this.uploadAdvertisementImage = this.uploadAdvertisementImage.bind(this)


    }

    componentWillMount() {
        this.findAllLocalAdvertisements();

    }


    findAllLocalAdvertisements(){
        this.advertisementService.findAllLocalAdvertisements()
            .then(ads => {
                this.setState({localAds : ads.advertisements})
            })
    }

    advertisementRows(){
        var rows = this.state.localAds.map((ad) => {
            return (
                <LocalAdRow ad={ad} key={ad.id}/>
            )

        });
        return (
            rows
        )

    }


    dropHandler(file){

        console.log(file)
        var photo = new FormData();
        photo.append('photo', file[0]);
        this.setState({file : file})

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
                this.findAllLocalAdvertisements();
            });
    }





    render() {
        return (
            <div >



                {/* Navbar on small screens*/}


                {/* Page Container */}
                <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                    <div className="w3-row">
                        {/* Left Column -->*/}
                        <div className="w3-col m2">
                            {/*-- Profile -->*/}

                            <br/>

                            {/*-- End Left Column -->*/}
                        </div>

                        {/*-- Middle Column -->*/}
                        <div className="w3-col m8">



                            <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white">
                                        <div className="w3-container w3-padding">
                                            <h6 className="w3-opacity">Quick Advertisement Upload</h6>
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

                                    </div>
                                </div>
                            </div>

                            {this.advertisementRows()}

                            {/*-- End Middle Column -->*/}
                        </div>

                        {/*-- Right Column -->*/}


                        {/*-- End Grid -->*/}
                    </div>

                    {/*-- End Page Container -->*/}
                </div>

            </div>
        )
    }
}
export default AdvertisementList;
