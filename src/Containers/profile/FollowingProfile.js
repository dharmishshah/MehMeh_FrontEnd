import React from 'react';
import '../../style/profile.css'
import PropTypes from 'prop-types';
import Select from 'react-select';
import '../../style/selectUser.css'
import UserService from '../../Services/UserServiceClient'


class FollowingProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            backspaceRemoves: true,
            multi: true,
            creatable: false
        }

        this.userService = UserService.instance


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
                var users = json.users
                return { options: json.items };
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

                        <AsyncComponent value={this.state.value} onChange={this.onChange}
                                        onValueClick={this.gotoUser} valueKey="id" labelKey="login" loadOptions={this.getUsers}/>

                    </div>

                    <h5><strong>FOLLOWING</strong></h5>

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


export default FollowingProfile