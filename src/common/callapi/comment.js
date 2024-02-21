import {BASE_URL} from "../constant"

async function getListComment(token, postcode){
    try {
        const response = await fetch(`${BASE_URL}post/${postcode}/comments`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
      }
    }

export {getListComment};