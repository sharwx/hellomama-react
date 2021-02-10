import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter, Redirect } from 'react-router-dom'
import './EditLocation.scss'


class EditListing extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            location: {},
            location_description: '',
            location_level: '',
            address: '',
            photo: '',            
            enabledCheckBox_cs: false,
            enabledCheckBox_sink: false,
            enabledCheckBox_hwd: false,
            enabledCheckBox_pp: false,
            enabledCheckBox_lockable: false
        }
    }

    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
    }

    componentDidMount() {
        const routeParams = this.props.match.params
        console.log(routeParams)
        // console.log(this.props)

        if (this.props.location.state && this.props.location.state.product) {
            this.setState({
                location: this.props.location.state.product
            })
            return
        }

        this.autoFillForm(routeParams.slug)
    }

    autoFillForm(slug) {
        return axios.get(`http://localhost:5000/api/v1/locations/${slug}`)
            .then(response => {
                this.setState({
                    location: response.data
                })
                console.log(response.data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'location_description':
                this.setState({
                    location_description: e.target.value
                })
                break
            case 'location_level':
                this.setState({
                    location_level: e.target.value
                })
                break
            case 'address':
                this.setState({
                    address: e.target.value
                })
                break
            case 'photo':
                this.setState({
                    photo: e.target.value
                })
                break
            default:
        }
    }

    onClick_cs = () => {
        this.setState({
            enabledCheckBox_cs: !this.state.enabledCheckBox_cs
        })
    }

    onClick_sink = () => {
        this.setState({
            enabledCheckBox_sink: !this.state.enabledCheckBox_sink
        })
    }

    onClick_hwd = () => {
        this.setState({
            enabledCheckBox_hwd: !this.state.enabledCheckBox_hwd
        })
    }

    onClick_pp = () => {
        this.setState({
            enabledCheckBox_pp: !this.state.enabledCheckBox_pp
        })
    }

    onClick_lockable = () => {
        this.setState({
            enabledCheckBox_lockable: !this.state.enabledCheckBox_lockable
        })
    }

    handleFormSubmission(e) {
        e.preventDefault() 
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }

        let slug = this.props.match.params.slug
        axios.patch(`http://localhost:5000/api/v1/locations/${slug}`, qs.stringify({
            location_description: this.state.location.location_description,
            location_level: this.state.location.location_level,
            address: this.state.location.address,
            photo: this.state.location.photo,
            changing_station: this.state.location.changing_station,
            sink: this.state.location.sink,
            hot_water_dispenser: this.state.location.hot_water_dispenser,
            power_point: this.state.location.power_point,
            lockable: this.state.location.lockable
        }), config)

            .then(response => {
                console.log(response.data)
                this.props.history.push(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            this.isAuthenticated() ? (
                <div id="page-editList">
                    <div className="container">
                        <div className="wrapper">
                            <div className="form-input">
                                <div className="row">
                                    <div className="col-md-4 offset-md-4">
                                        <div className="titleDiv">
                                            <p className="title">Edit Details</p>
                                        </div>
                                        <form className="mt-5 mb-5" onSubmit={e => { this.handleFormSubmission(e) }}>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="location_description">Location Description</label>
                                                <textarea className="form-control" value={this.state.location.location_description} onChange={e => { this.handleChange(e, 'location_description') }} id="location_description" rows="2"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="location_level">Location Level</label>
                                                <input type="text" value={this.state.location.location_level} onChange={e => { this.handleChange(e, 'location_level') }} className="form-control" id="location_level" />
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="address">Address</label>
                                                <textarea className="form-control" value={this.state.location.address} onChange={e => { this.handleChange(e, 'address') }} id="address" rows="2"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="entryTitle" htmlFor="photo">Image</label>
                                                <input type="text" value={this.state.location.photo} onChange={e => { this.handleChange(e, 'photo') }} className="form-control" id="photo" />
                                            </div>

                                            <input type="checkbox" name="changing_station" value={this.state.location.changing_station} onChange={this.onClick_cs} checked={this.state.enabledCheckBox_cs} className="form-check-input" id="changing_station" />
                                            <label htmlFor="changing_station">Changing Station</label><br/>
                                            
                                            <input type="checkbox" name="sink" value={this.state.location.sink} onChange={this.onClick_sink} checked={this.state.enabledCheckBox_sink} className="form-check-input" id="sink" />
                                            <label htmlFor="sink">Sink</label><br/>

                                            <input type="checkbox" name="hot_water_dispenser" value={this.state.location.hot_water_dispenser} onChange={this.onClick_hwd} checked={this.state.enabledCheckBox_hwd} className="form-check-input" id="hot_water_dispenser" />
                                            <label htmlFor="hot_water_dispenser">Hot Water Dispenser</label><br/>

                                            <input type="checkbox" name="power_point" value={this.state.location.power_point} onChange={this.onClick_pp} checked={this.state.enabledCheckBox_pp} className="form-check-input" id="power_point"  />
                                            <label htmlFor="power_point">Power Point</label><br/>

                                            <input type="checkbox" name="lockable" value={this.state.location.lockable} onChange={this.onClick_lockable} checked={this.state.enabledCheckBox_lockable} className="form-check-input" id="lockable"  />
                                            <label htmlFor="lockable">Lockable</label><br/>

                                            <button type="submit" className="btn font-weight-bold" id="submit-btn">Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                    <Redirect to="/users/login" />
                )
        )
    }
}

export default withRouter(withCookies(EditListing))