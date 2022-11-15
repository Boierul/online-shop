import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleBlur,
                      setFieldValue,
                  }) => {
    return (
        <Box m="30px auto">
            {/* Billing Form */}
            <Box>
                <Typography sx={{mb: "15px"}} fontSize="18px">
                    Billing Information
                </Typography>
                {/*
                    touched - on first form box click
                    handleBlur - handles click in/out
                */}
                <AddressForm
                    type="billingAddress"
                    values={values.billingAddress}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Box>

            <Box mb="20px">
                {/* Label of the form*/}
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            value={values.shippingAddress.isSameAddress}
                            onChange={() =>
                                setFieldValue(
                                    "shippingAddress.isSameAddress",
                                    !values.shippingAddress.isSameAddress
                                )
                            }
                        />
                    }
                    label="Use billing address as shipping address"
                />
            </Box>

            {/* The Shipping Form if the addresses are different */}
            {!values.shippingAddress.isSameAddress && (
                <Box>
                    <Typography sx={{mb: "15px"}} fontSize="18px">
                        Shipping Information
                    </Typography>
                    <AddressForm
                        type="shippingAddress"
                        values={values.shippingAddress}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Shipping;
