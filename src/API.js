const API_URL = 'http://localhost:5000/api/v1'

export async function getLocations() {
    const response = await fetch(`${API_URL}/locations`)
    return response.json()
}
