import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { createLocationEntry } from './API'


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
            <label htmlFor="location_name">Location Name</label>
            <input type="text" name="location_name" required ref={register} /><br/>

            <label htmlFor="location_description">Location Description</label>
            <textarea type="text" name="location_description" rows={2} required ref={register}></textarea><br/>

            <label htmlFor="location_level">Location Level</label>
            <textarea type="text" name="location_level" rows={2} required ref={register}></textarea><br/>

            <label htmlFor="address">Address</label>
            <textarea type="text" name="address" rows={2} required ref={register}></textarea><br/>

            <label htmlFor="photo">Image</label>
            <input type="text" name="photo" ref={register} /><br/>

            <input type="checkbox" name="changing_station" ref={register} />
            <label htmlFor="changing_station">Changing Station</label><br/>
            
            <input type="checkbox" name="sink" ref={register} />
            <label htmlFor="sink">Sink</label><br/>

            <input type="checkbox" name="hot_water_dispenser" ref={register} />
            <label htmlFor="hot_water_dispenser">Hot Water Dispenser</label><br/>

            <input type="checkbox" name="power_point" ref={register} />
            <label htmlFor="power_point">Power Point</label><br/>

            <input type="checkbox" name="lockable" ref={register} />
            <label htmlFor="lockable">Lockable</label><br/>

            { error ? <h3>{error}</h3> : null}
            <button disabled={loading}>{ loading ? 'Loading' : 'Add Location'}</button>
        </form>
    )
}

export default AddLocationForm
