import React from 'react';
import {Badge, Box, IconButton} from "@mui/material";
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import logo from '../../assets/logo/logo.png'

/* Theming */
import {shades} from "../../theme";
import {setIsCartOpen} from "../../state";


function Navbar() {
    // Navigate to the specified dir
    const navigate = useNavigate();
    // Will call a reducer action from the global state
    const dispatch = useDispatch();
    // Grabbing the cartSlice name 'name: "cart" ',from src/index.js
    // and accessing the cart object after
    const cart = useSelector((state) => state.cart.cart);

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="60px"
            backgroundColor="rgba(255, 255, 255, 0.95)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
            borderRadius="0 0 4px 4px"
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{"&:hover": {cursor: "pointer"}}}
                >
                    <img alt="logo" src={logo} style={{
                        width: "45px",
                        height: "45px",
                        padding: "0.5rem",
                        borderRadius:"50%",
                        marginTop:"0.5rem"
                    }}/>
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="20px"
                    zIndex="2"
                >

                    <IconButton sx={{color: "black"}}>
                        <SearchOutlined/>
                    </IconButton>

                    <IconButton sx={{color: "black"}}>
                        <PersonOutline/>
                    </IconButton>

                    {/* Badge indicates count of items in the cart  */}
                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px",
                            },
                        }}
                    >
                        <IconButton
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{color: "black"}}
                        >
                            <ShoppingBagOutlined/>
                        </IconButton>
                    </Badge>

                    <IconButton sx={{color: "black"}}>
                        <MenuOutlined/>
                    </IconButton>

                </Box>
            </Box>
        </Box>
    );
}

export default Navbar;