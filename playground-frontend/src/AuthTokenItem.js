import React from "react";
import {  Alert } from "react-bootstrap";

const AuthTokenItem = ({authToken, isActive}) => {
    return <li style={{listStyleType: "none", fontSize:12}} key={authToken._id}>
            <Alert variant={isActive ? 'primary' : 'secondary'}>
                <div><b>Created at:</b> {authToken.createdAt}</div>
                <div style={{overflow: "hidden"}}><b>Access Token:</b> {authToken.accessToken}</div>
            </Alert>  
        </li>;
} 

export default AuthTokenItem;
