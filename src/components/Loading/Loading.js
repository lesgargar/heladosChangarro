import React from "react";
import { Spinner } from "react-bootstrap";

import './Loading.scss';

export default function Loading(){
    return(
        <div className="loading">
            <Spinner animation="border" role="status">
                <h5>Loading...</h5>
            </Spinner>
        </div>
    )
};