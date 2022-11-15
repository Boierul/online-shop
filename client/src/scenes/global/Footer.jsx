import React from 'react';
import {useTheme} from "@emotion/react";
import {Box, Typography} from "@mui/material";
import {shades} from "../../theme";

function Footer() {
    const {
        palette: {neutral},
    } = useTheme();

    return (
        <Box marginTop="70px"
             padding="40px 0"
             backgroundColor={neutral.light}
             borderRadius="1rem 1rem 0 0"
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(20%, 30%, 40%)">
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb="25px"
                        color={shades.secondary[500]}
                    >
                        E-SHOP
                    </Typography>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </div>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="25px">
                        About Us
                    </Typography>
                    <Typography mb="15px">Careers</Typography>
                    <Typography mb="15px">Our Stores</Typography>
                    <Typography mb="15px">Terms & Conditions</Typography>
                    <Typography mb="15px">Privacy Policy</Typography>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="25px">
                        Customer Care
                    </Typography>
                    <Typography mb="15px">Help Center</Typography>
                    <Typography mb="15px">Track Your Order</Typography>
                    <Typography mb="15px">Corporate & Bulk Purchasing</Typography>
                    <Typography mb="15px">Returns & Refunds</Typography>
                </Box>

                <Box width="clamp(20%, 25%, 30%)">
                    <Typography variant="h4" fontWeight="bold" mb="25px">
                        Contact Us
                    </Typography>
                    <Typography mb="15px">
                        <b>Our address:</b> Supergade 3, Horsens, 8700
                    </Typography>
                    <Typography mb="15px" sx={{wordWrap: "break-word"}}>
                        <b>Our email:</b> customercare@eshop.com
                    </Typography>
                    <Typography mb="15px"><b>Phone:</b> 22 22 22 22</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;