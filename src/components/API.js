import qs from 'qs'

const API_URL = 'https://hellomama-be.herokuapp.com/api/v1'

export async function getLocations() {
    const response = await fetch(`${API_URL}/locations`)
    return response.json()
}

export async function createLocationEntry(entry, token) {

    const response = await fetch(`${API_URL}/locations/new`, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'auth_token': token
        },
        body: qs.stringify(entry)
    })
    
    return response
}
