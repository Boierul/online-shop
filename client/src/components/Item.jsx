import React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {IconButton, Box, Typography, useTheme, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {shades} from "../theme";
import {addToCart} from "../state";

// Props come from Strapi backend, thus this weird args
const Item = ({item, width}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const {
        palette: {neutral},
    } = useTheme();

    // Destructuring further objects
    const {category, price, name, image} = item.attributes;
    const {
        data: {
            attributes: {
                formats: {
                    medium: {url},
                },
            },
        },
    } = image;

    return (
        <Box width={width}>
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >

                <img
                    alt={item.name}
                    width="300px"
                    height="400px"
                    src={`http://localhost:1337${url}`}
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{cursor: "pointer", background: shades.neutral[300]}}
                />

                <Box
                    display={isHovered ? "block" : "none"}
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >

                    <Box display="flex"
                         justifyContent="space-between">

                        <Box
                            display="flex"
                            alignItems="center"
                            backgroundColor={shades.neutral[100]}
                        >
                            {/* Makes sure that count doesn't go below 1 */}
                            <IconButton sx={{margin: "0.1rem 0.3rem"}}
                                        onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon/>
                            </IconButton>

                            <Typography color={shades.primary[300]}>{count}</Typography>

                            <IconButton sx={{margin: "0.1rem 0.3rem"}}
                                        onClick={() => setCount(count + 1)}>
                                <AddIcon/>
                            </IconButton>
                        </Box>

                        <Button
                            sx={{
                                backgroundColor: "#150003",
                                color: "white",
                                padding: "0 1rem",
                                borderRadius: 0,
                                "&:hover": {
                                    backgroundColor: "#be1212"
                                }
                            }}
                            onClick={() => {
                                dispatch(addToCart({item: {...item, count}}));
                            }}
                        >
                            Add to Cart
                        </Button>

                    </Box>
                </Box>
            </Box>

            <Box mt="3px">
                <Typography variant="subtitle2" color={neutral.dark}>
                    {/* Replace the received values from categories obj and set the format  */}
                    {category
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight="bold">${price}</Typography>
            </Box>
        </Box>
    );
};

export default Item;
