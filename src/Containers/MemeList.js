import React from 'react';
import '../index.css';
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';

import MemeRow from '../Components/MemeRow'
import LocalMemeRow from '../Components/LocalMemeRow'
import MemeService from '../Services/MemeServiceClient'
import FacebookLogin from 'react-facebook-login'
import Dropzone from 'react-dropzone'
import InfiniteScroll from 'react-infinite-scroller';


const totalMemePages = 10;

class MemeList extends React.Component {
    constructor() {
        super();
        this.memeService = MemeService.instance;
        this.state = {
            memes :[],
            localMemes : [],
            activeMemeTab : 'viral',
            pageNumber : 0,
            hasMoreMemes : true

        };
        this.dropHandler = this.dropHandler.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.changeActiveTab = this.changeActiveTab.bind(this)

    }

    componentWillMount() {

        this.findAllLocalMemes();
        this.findAllMemes(0,'viral');
    }


    findAllMemes(pageNumber, type){
        var type = type ? type : this.state.activeMemeTab;
        var pageNumber = pageNumber ? pageNumber: this.state.pageNumber;
        console.log('in service')
        this.memeService.findAllMemes(pageNumber,type)
            .then(memes => {
                this.setState({memes : memes.data});
            });
    }

    loadMoreMemes(page){
        var pageNumber = this.state.pageNumber
        var timeout = (pageNumber / totalMemePages) * 600000
        setTimeout((pageNumber) => {
            this.findAllMemes(pageNumber)
        }, timeout,pageNumber);
        pageNumber = pageNumber + 1
        this.setState({pageNumber : pageNumber})
        if(pageNumber == totalMemePages){
            this.setState({hasMoreMemes : false})
        }
        this.state.pageNumber = pageNumber;
    }

    findAllLocalMemes(){
        this.memeService.findAllLocalMemes()
            .then(memes => {
                this.setState({localMemes : memes.memes})
            })
    }

    changeActiveTab(tab){
        this.setState({activeMemeTab : tab})
    }

    memeRows(){
        var rows = this.state.memes.map((meme) => {
            return (
                <MemeRow meme={meme} key={meme.id}/>
            )

        });
        return (
            rows
        )

    }


    localMemeRows(){
        var rows = this.state.localMemes.map((meme) => {
            return (
                <LocalMemeRow meme={meme} key={meme.id}/>
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

    uploadImage(){
        var caption = this.refs.caption.value;
        var file = this.state.file;
        console.log(file)
        console.log(caption)
        this.memeService.uploadImage(file,caption)
    }



    render() {
        return (
            <div >

                {/* Navbar on small screens*/}
                <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
                </div>

                {/* Page Container */}
                <div className="w3-container w3-content" style={{maxWidth:1400,marginTop:80}}>
                    {/* The Grid */}
                    <div className="w3-row">
                        {/* Left Column -->*/}
                        <div className="w3-col m3 ">
                            <div className="fixedLeftColumn">
                            {/*-- Profile -->*/}
                            <div className="w3-card w3-round w3-white ">
                                <div className="w3-container">
                                    <h4>Popular</h4>
                                    <button onClick={() => this.changeActiveTab('viral')}
                                            className="w3-button w3-block w3-left-align w3-white"><i
                                        className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> Hot
                                    </button>
                                    <button onClick={() => this.changeActiveTab('top')}
                                            className="w3-button w3-block w3-left-align w3-white"><i
                                        className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> Top
                                    </button>
                                    <button onClick={() => this.changeActiveTab('time')}
                                            className="w3-button w3-block  w3-left-align w3-white"><i
                                        className="fa fa-users fa-fw w3-margin-right"></i> Trending
                                    </button>
                                </div>
                            </div>
                            <br/>

                                {/*-- Accordion -->*/}
                                <div className="w3-card w3-round">
                                    <div className="w3-white">
                                        <button onClick="myFunction('Demo1')"
                                                className="w3-button w3-block w3-left-align w3-white"><i
                                            className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups
                                        </button>
                                        <div id="Demo1" className="w3-hide w3-container">
                                            <p>Some text..</p>
                                        </div>
                                        <button onClick="myFunction('Demo2')"
                                                className="w3-button w3-block w3-left-align w3-white"><i
                                            className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events
                                        </button>
                                        <div id="Demo2" className="w3-hide w3-container">
                                            <p>Some other text..</p>
                                        </div>
                                        <button onClick="myFunction('Demo3')"
                                                className="w3-button w3-block  w3-left-align w3-white"><i
                                            className="fa fa-users fa-fw w3-margin-right"></i> My Memes
                                        </button>
                                        <div id="Demo3" className="w3-hide w3-container">
                                            <p>Some another text..</p>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                    {/*-- Interests -->*/}
                                    <div className="w3-card w3-round w3-white w3-hide-small">
                                        <div className="w3-container">
                                            <p>Interests</p>
                                            <p>
                                                <span className="w3-tag w3-small w3-theme-d5">News</span>
                                                <span className="w3-tag w3-small w3-theme-d3">Labels</span>
                                                <span className="w3-tag w3-small w3-theme-d2">Games</span>
                                                <span className="w3-tag w3-small w3-theme-d1">Friends</span>
                                                <span className="w3-tag w3-small w3-theme">Games</span>
                                                <span className="w3-tag w3-small w3-theme-l1">Friends</span>
                                                <span className="w3-tag w3-small w3-theme-l2">Food</span>
                                                <span className="w3-tag w3-small w3-theme-l3">Design</span>
                                                <span className="w3-tag w3-small w3-theme-l4">Art</span>
                                                <span className="w3-tag w3-small w3-theme-l5">Photos</span>
                                            </p>
                                        </div>
                                    </div>
                            </div>
                                    <br/>

                                        {/*-- Alert Box -->*/}
                            {/*<div
                                            className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
        <span onClick="this.parentElement.style.display='none'" className="w3-button w3-theme-l3 w3-display-topright">
          <i className="fa fa-remove"></i>
        </span>
                                            <p><strong>Hey!</strong></p>
                                            <p>People are looking at your profile. Find out who.</p>
                                        </div>*/}

                            {/*-- End Left Column -->*/}
                        </div>

                        {/*-- Middle Column -->*/}
                        <div className="w3-col m7">

                            <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white">
                                        <div className="w3-container w3-padding">
                                            <h6 className="w3-opacity">Quick Meme Upload</h6>
                                            <input style={{width:'100%', marginBottom : 15}} placeholder="caption" className="w3-border w3-padding" ref="caption"></input>
                                            <div style={{ width:'100%',marginBottom : 15}}>
                                            <Dropzone  disableClick ={true} multiple={false} accept={'image/*'} onDrop={this.dropHandler}>
                                                <div> Just drop a meme and you are all set. </div>
                                            </Dropzone>
                                            </div>
                                            <button type="button" className="w3-button w3-theme" onClick={this.uploadImage}><i
                                                className="fa fa-pencil"></i> Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.localMemeRows()}


                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadMoreMemes.bind(this)}
                                    hasMore={this.state.hasMoreMemes}
                                    threshold={15000}
                                    loader={<div className="loader" key={0}>Loading ...</div>}>
                                    {this.memeRows()}
                                </InfiniteScroll>





                            {/*-- End Middle Column -->*/}
                        </div>

                        {/*-- Right Column -->*/}
                        <div className="w3-col m2">
                            <div className="fixedRightColumn">
                                <div className="w3-card w3-round w3-white w3-center">
                                    <div className="w3-container">
                                        <p>Upcoming Events:</p>
                                        <img src="../../images/bg2.jpg" alt="Forest" style={{width:'100%'}} />
                                            <p><strong>Holiday</strong></p>
                                            <p>Friday 15:00</p>
                                            <p>
                                                <button className="w3-button w3-block w3-theme-l4">Info</button>
                                            </p>
                                    </div>
                                    <div className="w3-container">
                                        <p>Upcoming Events:</p>
                                        <img src="../../images/bg2.jpg" alt="Forest" style={{width:'100%'}} />
                                        <p><strong>Holiday</strong></p>
                                        <p>Friday 15:00</p>
                                        <p>
                                            <button className="w3-button w3-block w3-theme-l4">Info</button>
                                        </p>
                                    </div>
                                    <div className="w3-container">
                                        <p>Upcoming Events:</p>
                                        <img src="../../images/bg2.jpg" alt="Forest" style={{width:'100%'}} />
                                        <p><strong>Holiday</strong></p>
                                        <p>Friday 15:00</p>
                                        <p>
                                            <button className="w3-button w3-block w3-theme-l4">Info</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            {/*-- End Right Column -->*/}
                        </div>

                        {/*-- End Grid -->*/}
                    </div>

                    {/*-- End Page Container -->*/}
                </div>

            </div>
        )
    }
}
export default MemeList;
