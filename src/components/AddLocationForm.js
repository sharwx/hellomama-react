import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { createLocationEntry } from './API'
import './AddLocationForm.scss'


const AddLocationForm = ({ location, onClose }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [cookies, setCookies] = useCookies(["token"])
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            data.latitude = location.latitude
            data.longitude = location.longitude
            const created = await createLocationEntry(data, cookies.token)
            console.log(created)
            onClose()
        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading(false)
        }
    }

    return(

        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

            <div className="container">

                <div className="form-group">
                    <input type="text" className="form-control" name="location_name" placeholder="Location Name" required ref={register} />
                </div>

                <div className="form-group">
                    <textarea className="form-control" name="location_description" placeholder="Location Description" rows={2} required ref={register}></textarea>
                </div>

                <div className="form-group">
                    <textarea className="form-control" name="location_level" placeholder="Location Level" rows={2} required ref={register}></textarea>
                </div>

                <div className="form-group">
                    <textarea className="form-control" name="address" placeholder="Address" rows={2} required ref={register}></textarea>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" name="photo" placeholder="Upload Image Link (Optional)" ref={register} />
                </div>

                <div className="row">

                    <div class="col-6">
                        <div className="form-group form-check align-1">
                            <input type="checkbox" className="form-check-input" name="changing_station" ref={register} />
                            <label className="form-check-label" htmlFor="changing_station">Changing Station</label>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div className="form-group form-check align-1">
                            <input type="checkbox" className="form-check-input" name="sink" ref={register} />
                            <label className="form-check-label" htmlFor="sink">Sink</label>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className="form-group form-check align-2">
                            <input type="checkbox" className="form-check-input" name="hot_water_dispenser" ref={register} />
                            <label className="form-check-label" htmlFor="hot_water_dispenser">Hot Water Dispenser</label>
                        </div>
                    </div>

                    <div class="col-6">
                        <div className="form-group form-check align-2">
                            <input type="checkbox" className="form-check-input" name="power_point" ref={register} />
                            <label className="form-check-label" htmlFor="power_point">Power Point</label>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group form-check align-3">
                            <input type="checkbox" className="form-check-input" name="lockable" ref={register} />
                            <label className="form-check-label" htmlFor="lockable">Lockable</label>
                        </div>
                    </div>

                </div>

                { error ? <h3>{error}</h3> : null}
                <button id="button" className="btn active font-weight-bold" disabled={loading}>{ loading ? 'Loading' : 'Add Location'}</button>

            </div>

        </form>



        //  <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        //     <label htmlFor="location_name">Location Name</label>
        //     <input type="text" name="location_name" required ref={register} /><br/>

        //     <label htmlFor="location_description">Location Description</label>
        //     <textarea type="text" name="location_description" rows={2} required ref={register}></textarea><br/>

        //     <label htmlFor="location_level">Location Level</label>
        //     <textarea type="text" name="location_level" rows={2} required ref={register}></textarea><br/>

        //     <label htmlFor="address">Address</label>
        //     <textarea type="text" name="address" rows={2} required ref={register}></textarea><br/>

        //     <label htmlFor="photo">Image</label>
        //     <input type="text" name="photo" ref={register} /><br/>

        //     <input type="checkbox" name="changing_station" ref={register} />
        //     <label htmlFor="changing_station">Changing Station</label><br/>
            
        //     <input type="checkbox" name="sink" ref={register} />
        //     <label htmlFor="sink">Sink</label><br/>

        //     <input type="checkbox" name="hot_water_dispenser" ref={register} />
        //     <label htmlFor="hot_water_dispenser">Hot Water Dispenser</label><br/>

        //     <input type="checkbox" name="power_point" ref={register} />
        //     <label htmlFor="power_point">Power Point</label><br/>

        //     <input type="checkbox" name="lockable" ref={register} />
        //     <label htmlFor="lockable">Lockable</label><br/>

        //     { error ? <h3>{error}</h3> : null}
        //     <button disabled={loading}>{ loading ? 'Loading' : 'Add Location'}</button>
        // </form>

    )
}

export default AddLocationForm
