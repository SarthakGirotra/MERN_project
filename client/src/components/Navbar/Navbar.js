import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import memories from '../../images/memories.png'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }


        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null);
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">Project</Typography>
                <img className={classes.image} src={memories} alt="memories"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user && (<div className={classes.profile}><Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                </div>)}
                {!user && (<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>)}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
