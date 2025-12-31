import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const UseAuth = () => {

    const AuthInfo = use(AuthContext)
    return AuthInfo;
};

export default UseAuth;