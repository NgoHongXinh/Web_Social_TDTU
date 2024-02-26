import { useEffect, useState } from "react";
import {getPostListHome} from "../../../common/callapi/post_service"
import { getCookieToken } from '../../../common/functions'

function Post(props) {
    const { postcode } = props
    var token = getCookieToken()
    const [postCodeFromHomeComponent, setPostCodeFromHomeComponent] = useState(postcode ? postcode : "")
    const [postState, setpostState] = useState([])
    const [postList, setPostList] = useState()
    const [userPostState, setUserPostState] = useState([])

    const callApiGetListPostHome = async () => {
        try {
            const result = await getPostListHome(token, postcode);
            console.log(result)
            setpostState(result?.data)
        } catch (error) {
            console.error(error)
        }
    }
    // const callApiGetListPostUser = async () => {
    //     try {
    //         const result = await getPostListUser(token, usercode);
    //         console.log(result)
    //         setpostState(result?.data)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    useEffect(()=>{
        console.log("post list",postState.length)
        var post =[]
        if (postState?.length !== 0) {
            postState.forEach(post => {
                post.push(
                    <div>{post.content}</div>
                )
            });
        }
        setPostList(post)
    },[postState])
    useEffect(() => {
        // dataProfileUser()
        setPostCodeFromHomeComponent(postcode)
        callApiGetListPostHome()
    }, [postcode])
    return (
        postList
    );
}
export default Post;