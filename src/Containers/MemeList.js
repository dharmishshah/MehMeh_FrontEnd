import React from 'react';
import '../index.css';
import '../style/meme.css'
import $ from 'jquery';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';

import MemeRow from '../Components/MemeRow'
import LocalMemeRow from '../Components/LocalMemeRow'
import LocalAdRow from '../Components/LocalAdRow'
import LocalEventRow from '../Components/LocalEventRow'
import EventService from '../Services/EventService'

import AdvertisementService from '../Services/AdvertisementServiceClient'

import MemeService from '../Services/MemeServiceClient'
import FacebookLogin from 'react-facebook-login'
import Dropzone from 'react-dropzone'
import InfiniteScroll from 'react-infinite-scroller';

import { Carousel } from 'react-responsive-carousel';
import cookie from "react-cookies";


const totalMemePages = 10;

class MemeList extends React.Component {
    constructor() {
        super();
        this.memeService = MemeService.instance;
        this.eventService = EventService.instance;
        this.advertisementService = AdvertisementService.instance

        var loggedIn = cookie.load("loggedIn")
        var role = cookie.load("role")
        var isLoggedIn = loggedIn ? true : false
        var role = role ? role : "NotLoggedIn"

        this.state = {
            memes: [],
            localMemes: [],
            activeMemeTab: 'viral',
            pageNumber: 0,
            hasMoreMemes: true,
            localEvents: [],
            localAds: [],
            role : role,
            loggedIn : loggedIn,
            localAd: {advertisementImage:'https://genesiscomp.net/wp-content/uploads/2016/12/Genesis-Computing-no-ads.png'}
        }

        ;
        this.dropHandler = this.dropHandler.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.changeActiveTab = this.changeActiveTab.bind(this)

    }

    componentWillMount() {

        this.findAllLocalMemes();
        this.findAllMemes(0,'viral');
        this.findAllLocalEvents();
        this.findAllLocalAdvertisements();
        this.getTest();
    }


    getTest(){
        var number = 10;
        for(var i=0;i<10;i++){
            var timeout = (i / 10 == 0 ? 10 : i / 10) * 10000


            setTimeout((i) => {
                this.setState ({test : i});
            }, timeout, i);


        }
    }


    findAllMemes(pageNumber, type){
        var type = type ? type : this.state.activeTab;
        var pageNumber = pageNumber ? pageNumber: this.state.pageNumber;
        console.log('in service')
        this.memeService.findAllMemes(pageNumber,type)
            .then(memes => {
                this.setState({memes : memes.data});
            });
    }

    loadMoreMemes(page){
        var pageNumber = this.state.pageNumber
        var timeout = (pageNumber / totalMemePages == 0 ? 10 : pageNumber / totalMemePages) * 600000
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
                <div>
                    {!(( meme.images && meme.images[0] && meme.images[0].link.includes('mp4')) ||
                        'video/mp4' === meme.type) && <MemeRow meme={meme} key={meme.id}/>}
                </div>
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


    findAllLocalEvents(){
        this.eventService.findAllLocalEvents()
            .then(events => {
                this.setState({localEvents : events.events})
            })
    }

    eventRows(){
        var rows = this.state.localEvents.map((event) => {
            return (
                <div className="trendingEvents">
                    <img src={event.eventImage} alt="Forest" style={{marginTop:5,width:'90%'}} />
                    <p><strong>{event.eventName}</strong></p>
                    <p>{event.description}</p>
                    <p>
                        <button className="w3-button w3-block w3-theme-l4">Info</button>
                    </p>
                </div>
        )

        });
        return (
            rows
        )

    }


    findAllLocalAdvertisements(){
        this.advertisementService.findAllLocalAdvertisements()
            .then(ads => {
                this.setState({localAds : ads.advertisements})
                this.advertisementRows()
            })
    }

    advertisementRows(){

    return (

        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                {this.state.localAds.map((ad,index) => {

                        if(index == 0){
                            return(
                                <div className="carousel-item active">
                                    <p className="float-left badge customBadge">Advertisement</p>
                                    <img src={ad.advertisementImage} width="100" height="100" alt="Forest"
                                         style={{width: '100%'}}/>
                                    <p>{ad.advertisementName}</p>
                                    <p>
                                        <button className="w3-button w3-block w3-theme-l4">Info</button>
                                    </p>
                                </div>
                            )
                        }else{
                            return(
                                <div className="carousel-item">
                                    <p className="float-left badge customBadge">Advertisement</p>
                                    <img src={ad.advertisementImage} width="100" height="100" alt="Forest"
                                         style={{width: '100%'}}/>
                                    <p>{ad.advertisementName}</p>
                                    <p>
                                        <button className="w3-button w3-block w3-theme-l4">Info</button>
                                    </p>
                                </div>
                            )
                        }

                })}
            </div>
        </div>
        )

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
                            <div className="fixedLeftColumn w3-margin">
                                {/*-- Profile -->*/}
                                <div className="w3-card w3-round w3-white ">
                                    <div className="w3-white">
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

                                <br></br>

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
                        <div className="w3-col m6 ">

                            {this.state.loggedIn && this.state.role == "MEME_USER" && <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white">
                                        <div className="w3-container w3-margin">
                                            <h5 className="w3-opacity w3-padding">Quick Meme Upload</h5>
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
                                    </div>
                                </div>
                            </div>}



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
                        <div className="w3-col m3">

                            <div className="fixedHeaderGrid1RightColumn">

                                <div className="w3-card w3-round w3-white w3-center w3-margin">

                                    {this.eventRows()}

                                </div>
                            </div>

                            <br/>

                            <div className="fixedHeaderGrid2RightColumn">
                                <div className="w3-card w3-round w3-white  w3-center w3-margin">
                                    <div className="w3-container">
                                        {this.advertisementRows()}
                                    </div>
                                </div>
                            </div>




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
