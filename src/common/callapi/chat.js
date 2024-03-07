import {BASE_URL} from "../constant"

async function createConversation(token, usercode){
    try {
        var data_user = {
            "user_code_to_chat": usercode
            }
        var url = `${BASE_URL}conversation`
        const response = await fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data_user)
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

async function getListConversation(token){
    try {
        var url = `${BASE_URL}conversations`
        const response = await fetch(url, 
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
async function getListMess(token, conversationCode){
  try {
      var url = `${BASE_URL}conversation/${conversationCode}/message`
      const response = await fetch(url, 
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
  async function createMess(token, conversationCode, text){
    try {
      var data_chat = {
        "conversation_code": conversationCode,
        "text": text
        }
        var url = `${BASE_URL}message`
        const response = await fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data_chat)
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
  
export {getListConversation, createConversation, getListMess, createMess};