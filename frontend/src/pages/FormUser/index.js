import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';


const FormUser = () => {

    const { id } = useParams();
    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        api.get(`/show-user/${id}`)
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
        <form>
        <div className="form-group">
            <label htmlFor="userId">User</label>
            <input type="text" className="form-control" readOnly value={user.userId} />
        </div>
        <div className="form-group">
            <label htmlFor="roles">Roles</label>
            <input type="text" className="form-control" readOnly value={user.roles} />
        </div>
        </form>
        }   
        </>
    );  
}

export default FormUser;