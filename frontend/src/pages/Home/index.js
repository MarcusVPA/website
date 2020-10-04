import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../components/FortAwesome/index';
import api from '../../services/api';


const Home = () => {
    const [elements, setElements] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        api.get('/list-users')
        .then((response)=>{
            setElements(response.data);
        })
        .catch(()=>{
            setError("Não foi possível carregar a tabela");
        })        
    },[elements]);

    function deleteUser(id) {
        api.post('delete-user',{ id })
        .then((response)=>{
            setMessage(response.data.message);
        })
        .catch((error)=>{
            setError(error);
        })
    }

    return (
        <>
        {message && message}
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">UserId</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {   
                elements && elements.map((element)=>
                    ( 
                    <tr key={element.id}>
                        <th>{element.userId}</th>
                        <th>{element.rules}</th>
                        <th>
                            <Link to={`/view-user/${element.id}`} className="btn btn-primary"><FontAwesomeIcon icon="eye" /></Link>
                            <button onClick={()=>deleteUser(element.id)} type="button" className="btn btn-danger"><FontAwesomeIcon icon="trash-alt" /></button>
                        </th>
                    </tr>
                    )
                )}
            </tbody>
        </table>     
        {error && (<div>{error}</div>)}
        </>
    );
}

export default Home;