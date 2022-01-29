import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Query() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get('/api/auth/query').
            then((res) => {
                setUser(res.data.user);
            }).catch((err) => {
                console.log("Sem sessão");
            });
    }, []);

  return (
      <div>
          {user ? 
            <div>
                <h2>{user.name}</h2>
                <img src={user.image} alt={user.name} />
            </div>
          : 
            <div>
                <h1>Unautorized</h1>
            </div>
          }
      </div>
  )
}
