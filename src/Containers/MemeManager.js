import React from 'react';
import MemeList from './MemeList';
import EventList from './EventList'
import FixedHeader from '../Components/FixedHeader'
import HeaderProfile from './HeaderProfile'
import AdvertisementList from './AdvertisementList'
import LocalEventList from './LocalEventList'
import AdminPage from './AdminPage'

import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { TabContent, TabPane, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class MemeManager extends React.Component {


    render() {
        return (

            <Router>

                <div>
                    <FixedHeader memeList = {MemeList}/>
                    <h1></h1>
                    <Route exact path="/"
                           component={MemeList}>
                    </Route>
                    <Route path="/searchQuery/:search"
                           component={MemeList}>
                    </Route>
                    <Route path="/events"
                            component={EventList}>
                    </Route>
                    <Route path="/profile"
                           component={HeaderProfile}>
                    </Route>
                    <Route path="/advertisement"
                           component={AdvertisementList}>
                    </Route>
                    <Route path="/localEvents"
                           component={LocalEventList}>
                    </Route>
                    <Route path="/admin"
                           component={AdminPage}>
                    </Route>
                </div>
            </Router>


        )}}

export default MemeManager;
