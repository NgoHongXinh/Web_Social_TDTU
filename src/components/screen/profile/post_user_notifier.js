import {getPostListUser} from "../../../common/callapi/post_service"
import { getCookieToken } from '../../../common/functions'
import { useEffect, useState } from "react";
function PostUser(props) {
    const {usercode} =props;

    var token = getCookieToken()
    const [postState, setpostState] = useState([])
    const [postList, setPostList] = useState()
    const callApiGetListPostUser= async () => {
        try {
            const result = await getPostListUser(token, usercode);
            console.log(result)
            setpostState(result?.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        var post =[]
        // if (postState?.list_post_info.length !== 0) {
            console.log(postState?.list_post_info)
            // postState.forEach(post => {
            //     post.push(
            //         <div>{post.created_by}</div>
            //     )
            // });
            // setPostList(post)
        // }
        // 
    },[postState])
    useEffect(() => {
        // dataProfileUser()
        // setPostCodeFromHomeComponent(postcode)
        callApiGetListPostUser()
    }, [])
    return (
        <>
              {postList}
        </>
  
    );

}

export default PostUser