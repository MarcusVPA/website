import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';


const EditUser = () => {

    const { id } = useParams();
    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [rules, setRules] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        api.post(`/show-user/${id}`)
        .then((response)=>{
            setUser(response.data);
        })
        .catch(()=>{
            setError("Não foi possível carregar a tabela");
        })        
    },[id]);

    return (
        <>
        {error && error}
        {user && 
        <form enctype="multipart/form-data">
        <div className="form-group">
            <label htmlFor="userId">User</label>
            <input type="text" className="form-control" onChange={(event)=> setName(event.target.value)} value={user.userId} />
        </div>
        <div className="form-group">
            <label htmlFor="roles">Roles</label>
            <input type="text" className="form-control" onChange={(event)=> setRules(event.target.value)} value={user.rules} />
        </div>
        <input type="file" name="file" />
        <input type="submit" name="submit" />
        </form>
        }   
        </>
    );  
}

export default EditUser;