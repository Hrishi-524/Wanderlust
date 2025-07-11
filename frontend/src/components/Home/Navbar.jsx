import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from '../../utils/auth';
import './Navbar.css'

const pages = ['villas', 'hotels', 'trips'];
const settings = ['My Bookings/Trips', 'Dashboard', 'Logout'];
const links = ['/listings', '/listings', '/listings']

export default function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		removeToken(); // Clear token from localStorage and axios headers
		navigate('/'); // Redirect to home page
		setAnchorElUser(null); // Close user menu
	};

	const returnAppropriateButtons = () => {
		if (isAuthenticated()) {
			// User is logged in - show logout button
			return (
				<Button
					onClick={handleLogout}
					variant="contained"
					sx={{
						backgroundColor: '#f44336', // Red color for logout
						color: 'white',
						fontWeight: 'bold',
						'&:hover': {
							backgroundColor: '#d32f2f'
						}
					}}
				>
					Logout
				</Button>
			);
		} else {
			// User is not logged in - show login and signup buttons
			return (
				<>
					<Button
						component={Link}
						to="/login"
						variant="contained"
						sx={{
							backgroundColor: 'white',
							color: 'black',
							fontWeight: 'bold',
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.9)'
							}
						}}
					>
						Log In
					</Button>
					<Button
						component={Link}
						to="/signup"
						variant="contained"
						sx={{
							backgroundColor: 'white',
							color: 'black',
							fontWeight: 'bold',
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.9)'
							}
						}}
					>
						Sign Up
					</Button>
				</>
			);
		}
	}

  return (
    <AppBar position="sticky" className='transperent-navbar' elevation={0} 
        sx={{backgroundColor: 'transparent', boxShadow:'none'
            ,transition: 'background-color 0.2s ease',
        }}
    >
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <div className="logo" sx={{border: '1px solid var(--border-muted)'}}>
                    <MapOutlinedIcon sx={{ color: 'var(--text)' }} />
                    &nbsp;&nbsp;
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            textDecoration: 'none',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '0.1rem',
                            color: 'var(--text)',
                        }}
                    >
                        Wanderlust
                    </Typography>
                </div>

                {/* RESPONSIVE */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {pages.map((page, index) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Link to={links[index]} style={{textDecoration:'none', color:'inherit', width:'100%'}}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
                        {/* Conditional auth menu items for mobile */}
                        {isAuthenticated() ? (
                            <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                            </MenuItem>
                        ) : (
                            <>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/login" style={{textDecoration:'none', color:'inherit', width:'100%'}}>
                                        <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="/signup" style={{textDecoration:'none', color:'inherit', width:'100%'}}>
                                        <Typography sx={{ textAlign: 'center' }}>Sign Up</Typography>
                                    </Link>
                                </MenuItem>
                            </>
                        )}
                    </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <div className="logo">
                        <MapOutlinedIcon sx={{ color: 'black' }} />
                        &nbsp;&nbsp;
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                textDecoration: 'none',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'black',
                            }}
                        >
                            Wanderlust
                        </Typography>
                    </div>
                </Box>
          
                {/* THIS IS PAGES PART */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                    {pages.map((page, index) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            className="nav-link"
                            sx={{
                                my: 2,
                                display: 'block',
                                fontWeight: 'bold',
                                color:'white'
                            }}
                        >
                            <Link to={links[index]} style={{textDecoration:'none', color:'inherit'}}>
                                {page}
                            </Link>
                        </Button>
                    ))}
                </Box>

                {/* LOGIN , SIGNUP AND LOGOUT BUTTONS */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 2 }}>
                    {returnAppropriateButtons()}
                </Box>

                {/* PROFILE ICON AT RIGHT - Only show when logged in */}
                {isAuthenticated() && (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem 
                                    key={setting} 
                                    onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </Container>
    </AppBar>    
  );
}
