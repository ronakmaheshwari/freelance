import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Apply(){
    const { id } = useParams();
    const [details,setDetails] = useState([]);
     
    return(
        <div>

        </div>
    )
}