import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
function UserProfile() {
    const {usercode} = useParams()
    console.log(usercode)
    return(
        <div> update info</div>
    )
}
export default UserProfile