import React from 'react';
import '../../style/profile.css'
import PropTypes from 'prop-types';
import Select from 'react-select';
import '../../style/selectUser.css'
import UserService from '../../Services/UserServiceClient'
import createClass from 'create-react-class';
import fetch from 'isomorphic-fetch';
import cookie from "react-cookies";


class FollowingProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            backspaceRemoves: false,
            multi: false,
            creatable: false,
            following:[]
        }

        this.userService = UserService.instance
        this.getUsers = this.getUsers.bind(this)
        this.onChange = this.onChange.bind(this);


    }

    componentWillMount() {
        this.findProfileByUserId()

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

    findProfileByUserId(){

        var userId = cookie.load('userId')
        var role = cookie.load('role');

        this.userService.findProfileByUserId(userId).then(profile => {
            var following = profile.following;
            this.setState({following: following})
        })

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
                    <FollowingUsers />

                    <h5><strong>FOLLOWING</strong></h5>

                    <div id="following">

                    {this.state.following.map((follow)=>(
                        <div className="media user-following">
                            <img src={follow.profilePicture ? follow.profilePicture : "https://bootdey.com/img/Content/avatar/avatar1.png"} alt="User Avatar"
                                 className="media-object pull-left"/>
                            <div className="media-body">
                                <a href="#">{follow.username}<br></br><span className="text-muted username">{follow.emailId}</span></a>
                                <button type="button" className="btn btn-sm btn-danger pull-right"><i
                                    className="fa fa-close-round"></i> Unfollow
                                </button>
                            </div>
                        </div>
                    ))}

                    </div>

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


const FollowingUsers = createClass({
    displayName: 'FollowingUsers',
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
    getUsers (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return fetch('http://localhost:8080/api/user/findUsers')
            .then(response =>
                response.json())
            .then((json) => {

                var items = [];
                var users = json

                users.map((item) => {
                    var item = {login : item.username, id : item.id}
                    items.push(item)
                })
                return { options: items };

            });
    },
    gotoUser (value, event) {
        alert(value)
    },
    render () {
        const AsyncComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;

        return (
            <div className="section">
               <AsyncComponent multi="false" value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="id" labelKey="login" loadOptions={this.getUsers} backspaceRemoves="false" />
            </div>
        );
    }
});



export default FollowingProfile