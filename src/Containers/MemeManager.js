import React from 'react';
import MemeList from './MemeList';
import FixedHeader from '../Components/FixedHeader'


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
                </div>
            </Router>


        )}}

export default MemeManager;
