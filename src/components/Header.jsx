import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import './Header.scss'
import axios from 'axios'

class Header extends React.Component {
    constructor(props) {
    super(props)

        this.state = {
            user: '',
            loggedIn: null
        }
    }

    componentDidMount() {
        this.getProfileUser()
    }

    getProfileUser() {
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios.get('http://localhost:5000/api/v1/users/profile', config)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    username: response.data[0].username,
                    loggedIn: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
    
    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
    }

    logout(e) {
        e.preventDefault()
   
        try {
            localStorage.removeItem('user')
            this.props.cookies.remove('token')
            this.setState({
                loggedIn: false
            })
            // window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (

            <Navbar id="site-header" bg="light" expand="lg">
                <Nav className="container-fluid">
                    <Navbar.Brand href="/">
                        {/* <img
                            alt="logo"
                            src="../../img/mrktplc.png"
                            width="30"
                            height="30"
                            id="brand-logo"
                            className="d-inline-block align-top"
                        /> */}

                        <svg
                        style={{
                        height: `50px`,
                        width: `50px`
                        }}
                        version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                            <g>
                                <g>
                                    <path d="M288.043,296.275c-11.438,0-22.466,4.383-31.215,12.374c-0.449,0.051-1.204,0.051-1.652,0
                                        c-8.752-7.991-19.779-12.374-31.215-12.374c-26.952,0-48.879,24.107-48.879,53.739s21.927,53.739,48.879,53.739
                                        c11.434,0,22.461-4.381,31.218-12.376c0.448-0.05,1.199-0.05,1.647,0.001c8.752,7.991,19.78,12.375,31.218,12.375
                                        c26.951,0,48.877-24.107,48.877-53.739S314.994,296.275,288.043,296.275z M230.048,382.075c-1.866,0.486-3.893,0.78-6.089,0.78
                                        c-15.429,0-27.981-14.733-27.981-32.841c0-18.109,12.552-32.841,27.981-32.841c2.195,0,4.222,0.293,6.089,0.78
                                        c-9.338,7.573-15.321,19.13-15.321,32.062C214.727,362.945,220.71,374.502,230.048,382.075z M256,370.389
                                        c-11.235,0-20.375-9.14-20.375-20.375c0-11.235,9.141-20.376,20.375-20.376c11.235,0,20.376,9.141,20.376,20.376
                                        C276.375,361.248,267.235,370.389,256,370.389z M288.043,382.855c-2.195,0-4.224-0.294-6.09-0.78
                                        c9.338-7.573,15.32-19.13,15.32-32.062c0-12.932-5.983-24.488-15.32-32.062c1.867-0.486,3.894-0.78,6.09-0.78
                                        c15.428,0,27.979,14.732,27.979,32.841C316.022,368.123,303.471,382.855,288.043,382.855z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M192.976,236.146c-8.067,0-14.629,6.562-14.629,14.629c0,8.067,6.562,14.629,14.629,14.629
                                        c8.066,0,14.629-6.562,14.629-14.629C207.604,242.708,201.043,236.146,192.976,236.146z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M319.024,236.146c-8.067,0-14.629,6.562-14.629,14.629c0,8.067,6.562,14.629,14.629,14.629
                                        c8.067,0,14.629-6.562,14.629-14.629C333.653,242.708,327.091,236.146,319.024,236.146z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M450.931,191.166c-1.022,0-2.046,0.038-3.07,0.092c-27.058-79.967-102.8-137.697-191.778-137.735v-0.001
                                        c-0.009,0-0.019,0-0.028,0c-0.019,0-0.038-0.001-0.056-0.001C166.986,53.524,91.206,111.265,64.14,191.258
                                        c-1.024-0.054-2.048-0.091-3.07-0.091C27.395,191.166,0,220.25,0,255.999c0,35.748,27.395,64.831,61.069,64.831
                                        c1.031,0,2.065-0.038,3.097-0.093c8.082,23.956,20.623,46.373,37.154,65.924c30.457,36.022,72.665,60.402,118.848,68.654
                                        c5.678,1.011,11.108-2.768,12.124-8.449c1.015-5.681-2.768-11.109-8.448-12.124c-86.581-15.468-149.422-90.64-149.422-178.742
                                        c0.001-79.896,51.875-147.903,123.708-172.121c-7.956,11.425-12.638,25.292-12.638,40.238c0,32.292,26.272,58.562,58.563,58.562
                                        c0.002,0,0.003,0,0.005,0c12.938,0,24.994-4.155,33.946-11.699c9.667-8.147,14.991-19.595,14.991-32.235
                                        c0-18.961-9.519-32.843-25.465-37.137c-5.567-1.499-11.305,1.801-12.806,7.374c-1.5,5.572,1.801,11.306,7.374,12.806
                                        c6.635,1.787,10,7.492,10,16.958c0,8.169-4.112,13.349-7.56,16.255c-5.189,4.373-12.461,6.78-20.48,6.78c-0.001,0-0.003,0-0.003,0
                                        c-20.769,0-37.666-16.896-37.666-37.664c0-27.394,22.277-49.681,49.665-49.696C356.15,74.454,437.576,155.898,437.577,256
                                        c0,88.221-62.94,163.409-149.659,178.784c-5.682,1.007-9.472,6.43-8.465,12.112c0.899,5.066,5.305,8.627,10.277,8.627
                                        c0.605,0,1.219-0.052,1.836-0.162c46.244-8.198,88.516-32.562,119.029-68.602c16.573-19.575,29.143-42.025,37.238-66.022
                                        c1.032,0.055,2.066,0.094,3.097,0.094c33.674,0,61.069-29.083,61.069-64.831C512,220.25,484.605,191.166,450.931,191.166z
                                        M20.898,255.999c0-23.212,16.548-42.265,37.418-43.82c-3.127,14.117-4.791,28.776-4.791,43.82
                                        c0,14.826,1.636,29.517,4.809,43.819C37.455,298.273,20.898,279.217,20.898,255.999z M453.668,299.819
                                        c3.172-14.302,4.809-28.992,4.809-43.819c0-15.043-1.663-29.703-4.791-43.82c20.869,1.554,37.417,20.607,37.417,43.819
                                        C491.102,279.217,474.545,298.273,453.668,299.819z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M256.252,437.581l-0.245-0.003c-0.044-0.001-0.088-0.001-0.133-0.001c-5.71,0-10.375,4.593-10.446,10.318
                                        c-0.072,5.77,4.547,10.506,10.317,10.579l0.245,0.003c0.045,0.001,0.09,0.001,0.134,0.001c5.709,0,10.374-4.592,10.445-10.318
                                        C266.641,442.39,262.023,437.653,256.252,437.581z"/>
                                </g>
                            </g>
                        </svg>
                        
                        {' '}
                        HelloMaMa
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}


                            {
                                this.isAuthenticated() ? (
                                    <Nav.Link href="/" className="ml-auto" onClick={(e) => {this.logout(e)}}><Button variant="link" id="login-btn">Log out</Button></Nav.Link>
                                    // <NavDropdown className="ml-auto" title={this.state.username} id="basic-nav-dropdown">
                                    //     <NavDropdown.Item alignRight><Nav.Link href="/" onClick={(e) => {this.logout(e)}}>Logout</Nav.Link></NavDropdown.Item>
                                    // </NavDropdown>
                                ) : (
                                    <Nav.Link className="ml-auto" href="/users/login"><Button variant="link" id="login-btn">Login</Button></Nav.Link>
                                )

                            }

                    </Navbar.Collapse>
                </Nav>
            </Navbar>


        )
    }
}

export default withCookies(Header)