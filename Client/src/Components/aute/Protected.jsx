import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthApi from 'Auth';
const Protected = ({ component: Component, ...rest }) => {
    const Auth = useContext(AuthApi)
    return (
        <Route
            {...rest}
            render={() => Auth.auth ? (
                <Component />
            ) :
                (
                    <Redirect to='/' />
                )}
        />
    )
}
export default Protected