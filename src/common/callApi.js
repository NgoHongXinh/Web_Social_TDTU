import {BASE_URL} from "./constant"

// USER API
async function getDataApiProfileUser(token, user_code){
    try {
        const response = await fetch(`${BASE_URL}user/profile/${user_code}`,
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

// láy thông tin user hiện tại đang login 
async function getDataApiDetailUserLogin(token){
    console.log(token)
    try {
        const response = await fetch(`${BASE_URL}user`,
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

export {getDataApiDetailUserLogin, getDataApiProfileUser};


