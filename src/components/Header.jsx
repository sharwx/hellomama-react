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
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (

            <Navbar id="site-header" bg="light" expand="lg">
                <Nav className="container-fluid">
                    <Navbar.Brand href="/">
                        <img
                            alt="logo"
                            src="../../img/mrktplc.png"
                            width="30"
                            height="30"
                            id="brand-logo"
                            className="d-inline-block align-top"
                        />{' '}
                        HelloMaMa
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}


                            {
                                this.isAuthenticated() ? (
                                    <NavDropdown className="ml-auto" title={this.state.username} id="basic-nav-dropdown">
                                        <NavDropdown.Item alignRight><Nav.Link href="/" onClick={(e) => {this.logout(e)}}>Logout</Nav.Link></NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Nav.Link className="ml-auto" href="/users/login"><Button variant="link" id="login-btn">Login</Button></Nav.Link>
                                )

                            }

                    </Navbar.Collapse>
                </Nav>
            </Navbar>


            // <header id="site-header">

            //         <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">

            //             <div className="container-fluid">
            //                 <Link to="/" className="navbar-brand mb-0 h1">
            //                     <img src="../../img/mrktplc.png" alt="logo" id="brand-logo" />
            //                     HelloMaMa
            //                 </Link>
            //             </div>

            //             <ul class="nav">

            //                 {
            //                     this.isAuthenticated() ? (
            //                         <li className="nav-item dropdown">
            //                             <Link to="#" className="nav-link dropdown-toggle font-weight-bold" id="profileDropdown" data-bs-toggle="dropdown" role="button" aria-expanded="false">
            //                                 {this.state.username}
            //                             </Link>
            //                             <ul className="dropdown-menu">
            //                                 <Link to="/" className="dropdown-item" onClick={(e) => {this.logout(e)}}>Log out</Link>
            //                             </ul>
            //                         </li>
            //                     ) : (
            //                         <li className="nav-item">
            //                             <Link to="/users/login" className="nav-link btn active font-weight-bold" id="login-btn">Login</Link>
            //                         </li>
            //                     )

            //                 }

            //             </ul>

            //         </nav>
                    
            // </header>

        )
    }
}

export default withCookies(Header)