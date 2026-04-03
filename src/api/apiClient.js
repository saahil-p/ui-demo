
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api"; 

export const apiRequest = async(endpoint, options = {}) =>{
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
    headers: {
        'Content-Type': 'application/json',
        ...options.headers, 
    }, 
    ...options,
    }

    try{
        const response = await fetch(url, config); 

        if(!response.ok){
            const error = await response.json();
            throw error; 
        }

        return await response.json(); 
    } catch(error){
        console.error("API Error: ", error); 
        throw error; 
    }
};


export const get = (endpoint, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'GET' });
}; 

export const post = (endpoint, body, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
}

export const put = (endpoint, data, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) });
}

export const del = (endpoint, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'DELETE' });
}
