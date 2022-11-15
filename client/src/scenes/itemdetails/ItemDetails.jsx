import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {shades} from "../../theme";
import {addToCart} from "../../state";
import {useDispatch} from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';

function ItemDetails() {
    const dispatch = useDispatch();
    const {itemId} = useParams();

    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItem() {
        const item = await fetch(
            `http://localhost:1337/api/items/${itemId}?populate=image`,
            {
                method: "GET",
            }
        );

        const itemJson = await item.json();
        // TODO delete logs
        console.log("GET one item details JSON >>> ")
        console.log(itemJson)
        setItem(itemJson.data);
    }

    async function getItems() {
        const items = await fetch(
            `http://localhost:1337/api/items?populate=image`,
            {
                method: "GET",
            }
        );

        const itemsJson = await items.json();
        // TODO delete logs
        console.log("GET all item details JSON >>> " + itemsJson)
        console.log(itemsJson)
        setItems(itemsJson.data);
    }

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box width="80%" m="80px auto">
            {/* ItemID image main page */}
            <Box display="flex" flexWrap="wrap" columnGap="40px">
                {/* ItemID image section */}
                <Box flex="1 1 40%" mb="40px">
                    <img
                        alt={item?.name}
                        width="100%"
                        height="100%"
                        src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        style={{objectFit: "contain"}}
                    />
                </Box>

                {/* Actions */}
                <Box flex="1 1 50%" mb="40px">
                    {/* Future actions */}
                    <Box display="flex" justifyContent="space-between">
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>

                    {/* Item Info */}
                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.attributes?.name}</Typography>
                        <Typography>${item?.attributes?.price}</Typography>
                        <Typography sx={{mt: "20px"}}>
                            {item?.attributes?.longDescription}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" minHeight="50px" justifyContent="left">

                        <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[300]}`}
                            mr="4rem"
                            p="2px 5px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography sx={{p: "0 5px"}}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon/>
                            </IconButton>
                        </Box>

                        <Button
                            sx={{
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px",
                                margin: "10px 0px",
                                "&:hover":
                                    {
                                        background: "#be1212"
                                    }
                            }}
                            onClick={() => dispatch(addToCart({item: {...item, count}}))}
                        >
                            ADD TO CART
                        </Button>

                        <Box m="0 5rem">
                            <Typography><b>Category:</b> {item?.attributes?.category}</Typography>
                            <Box display="flex">
                                {isFavorite ?
                                    (<FavoriteIcon/>) : (<FavoriteBorderOutlinedIcon/>)}
                                <Typography sx={{ml: "10px"}}>ADD TO WISHLIST</Typography>
                            </Box>
                        </Box>

                    </Box>

                    {/* Detailed info && reviews */}
                    <Box m="20px 0">
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="DESCRIPTION" value="description"/>
                            <Tab label="REVIEWS" value="reviews"/>
                        </Tabs>
                    </Box>

                    {/* Display the tabs data */}
                    <Box display="flex" flexWrap="wrap" gap="15px">
                        {value === "description" && (
                            <div>{item?.attributes?.longDescription}</div>
                        )}
                        {value === "reviews" && <div>Some really good reviews, maybe.</div>}
                    </Box>
                </Box>

                {/* Related items */}
                <Box mt="50px" width="100%">
                    <Typography variant="h3" fontWeight="bold">
                        Related Products
                    </Typography>

                    <Typography variant="span">
                        Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Sed porttitor lectus nibh.
                        Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                    </Typography>

                    {/* Display the items/ Insert some fancy algorithm */}
                    <Box
                        mt="40px"
                        display="flex"
                        flexWrap="wrap"
                        columnGap="1.33%"
                        justifyContent="space-between"
                    >
                        {items.slice(0, 3).map((item, i) => (
                            <Item key={`${item.name}-${i}`} item={item}/>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ItemDetails;