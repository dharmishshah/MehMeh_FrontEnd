import React from 'react';
import '../../style/profile.css'
import PropTypes from 'prop-types';
import Select from 'react-select';
import createClass from 'create-react-class';
import '../../style/selectUser.css'
import UserService from '../../Services/UserServiceClient'


class FollowingProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            backspaceRemoves: false,
            multi: false,
            creatable: false
        }

        this.userService = UserService.instance
        this.getUsers = this.getUsers.bind(this)
        this.onChange = this.onChange.bind(this);


    }

    componentWillMount() {


    }

    onChange (value) {
        this.setState({
            value: value,
        });
    }

    getUsers (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
    this.userService.findAllUsers()
            .then((json) => {



                var items = [];
                var users = json

                users.map((item) => {
                    var item = {login : item.username, id : item.id}
                    items.push(item)
                })
                return fetch(`https://api.github.com/search/users?q=${input}`)
                    .then((response) => response.json())
                    .then((json) => {
                        return { options: json.items };
                    });




            });
    }

    gotoUser (value, event) {
        alert.log(value)
    }


    render() {

        const AsyncComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;


        return (

            <div className="tab-pane animated fadeInRight"
                 id="following">
                <div className="user-profile-content">

                    <h5><strong>SEARCH USERS </strong></h5>
                    <div className="section">

                        <AsyncComponent  multi="false" value={this.state.value} onChange={this.onChange}
                                        onValueClick={this.gotoUser}
                                        valueKey="id" labelKey="login" loadOptions={this.getUsers}
                                        backspaceRemoves="false"/>

                    </div>

                    <h5><strong>FOLLOWING</strong></h5>

                    <GithubUsers />

                    <hr></hr>


                    <div className="w3-row">
                        <div className="col-sm-6">

                        </div>

                    </div>
                    {/* End div .row */}
                </div>
                {/* End div .user-profile-content */}
            </div>
        )
    }
}


const GithubUsers = createClass({
    displayName: 'GithubUsers',
    propTypes: {
        label: PropTypes.string,
    },
    getInitialState () {
        return {
            backspaceRemoves: true,
            multi: true,
            creatable: false,
        };
    },
    onChange (value) {
        this.setState({
            value: value,
        });
    },
    switchToMulti () {
        this.setState({
            multi: true,
            value: [this.state.value],
        });
    },
    switchToSingle () {
        this.setState({
            multi: false,
            value: this.state.value ? this.state.value[0] : null
        });
    },
    getUsers (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return fetch(`https://api.github.com/search/users?q=${input}`)
            .then((response) => response.json())
            .then((json) => {
                return { options: json.items };
            });
    },
    gotoUser (value, event) {
        window.open(value.html_url);
    },
    toggleBackspaceRemoves () {
        this.setState({
            backspaceRemoves: !this.state.backspaceRemoves
        });
    },
    toggleCreatable () {
        this.setState({
            creatable: !this.state.creatable
        });
    },
    render () {
        const AsyncComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;

        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/GithubUsers.js">(Source)</a></h3>
                <AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="id" labelKey="login" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
                <div className="checkbox-list">
                    <label className="checkbox">
                        <input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
                        <span className="checkbox-label">Multiselect</span>
                    </label>
                    <label className="checkbox">
                        <input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
                        <span className="checkbox-label">Single Value</span>
                    </label>
                </div>
                <div className="checkbox-list">
                    <label className="checkbox">
                        <input type="checkbox" className="checkbox-control" checked={this.state.creatable} onChange={this.toggleCreatable} />
                        <span className="checkbox-label">Creatable?</span>
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" className="checkbox-control" checked={this.state.backspaceRemoves} onChange={this.toggleBackspaceRemoves} />
                        <span className="checkbox-label">Backspace Removes?</span>
                    </label>
                </div>
                <div className="hint">This example uses fetch.js for showing Async options with Promises</div>
            </div>
        );
    }
});

module.exports = GithubUsers;


export default FollowingProfile