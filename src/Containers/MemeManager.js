import React from 'react';
import MemeList from './MemeList';
import EventList from './EventList'
import FixedHeader from '../Components/FixedHeader'
import Profile from './Profile'
import AdvertisementList from './AdvertisementList'

import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { TabContent, TabPane, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class MemeManager extends React.Component {


    render() {
        return (

            <Router>

                <div>
                    <FixedHeader/>
                    <h1></h1>
                    <Route exact path="/"
                           component={MemeList}>
                    </Route>
                    <Route path="/events"
                            component={EventList}>
                    </Route>
                    <Route path="/profile"
                           component={Profile}>
                    </Route>
                    <Route path="/advertisement"
                           component={AdvertisementList}>
                    </Route>
                </div>
            </Router>


        )}}

export default MemeManager;
