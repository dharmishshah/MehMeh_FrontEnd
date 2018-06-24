import React from 'react'
import cookie from "react-cookies";
import UserService from "../Services/UserServiceClient";

class AdminPage extends React.Component {

    constructor(props) {
        super(props);

        this.userService = UserService.instance;
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.userService.logout();
        cookie.remove('userId');
        cookie.remove('role');
        cookie.remove('username')
        cookie.remove('loggedIn')
        window.location.replace("/");

    }

    render() {
        return (
            <div >
            <div className="w3-top">
                <div className="w3-bar w3-theme w3-top w3-left-align w3-large">
                    <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1"
                       href="javascript:void(0)" onClick="w3_open()"><i className="fa fa-bars"></i></a>
                    <a href="#" className="w3-bar-item w3-button w3-theme-l1">Admin</a>
                    <a href="#"
                       className="w3-bar-item w3-hover-white w3-button w3-right btn btn-outline-light w3-border"
                       style={{margin: '0.38%', marginRight: '3%'}}
                       onClick={this.logout}>Log out
                    </a>

                </div>
            </div>

            {/*Sidebar*/}
            <nav className = "w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" id = "mySidebar" >
                <a href = "javascript:void(0)"
                   onClick = "w3_close()"
                   className = "w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large"
                   title = "Close Menu" >
                    <i className = "fa fa-remove"></i>
                </a>
                <h4 className = "w3-bar-item"><b>Menu</b></h4>
                <a className = "w3-bar-item w3-button w3-hover-black" href = "#users"> Users</a>
                <a className="w3-bar-item w3-button w3-hover-black" href="#memes">Memes</a>
                <a className = "w3-bar-item w3-button w3-hover-black" href = "#events" >Events</a>
                <a className="w3-bar-item w3-button w3-hover-black" href="#ads">Ads</a>
            </nav>

            {/* Overlay effect when opening sidebar on small screens */}
            <div className="w3-overlay w3-hide-large" onClick="w3_close()" title="close side menu" id="myOverlay"></div>

            {/*Main content: shift it to the right by 250 pixels when the sidebar is visible*/}
            <div className = "w3-main" style = {{marginLeft: 250}} >

                <div className = "w3-row w3-padding-64" >
                    <div className = " w3-container" >
                        <h1 className = "w3-text-teal" > Heading </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat. Lorem ipsum
                            dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </div>
                </div>

                <footer id = "myFooter" >
                    <div className = "w3-container w3-theme-l2 w3-padding-32" >
                        <h4> Footer </h4>
                    </div>

                    <div className = "w3-container w3-theme-l1" >
                        <p> Powered by <a href = "https://www.w3schools.com/w3css/default.asp" target = "_blank" >  </a></p>
                    </div>
                </footer>

                {/*END MAIN*/}
                </div>
            </div>
        )
    }
}

export default AdminPage;