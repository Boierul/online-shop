import React from 'react';
import {useState} from "react";

import {useSelector} from "react-redux";
import {Box, Button, Stepper, Step, StepLabel} from "@mui/material";

// Formik will help with form configuration
import {Formik} from "formik";
// Yup will validate the forms
import * as yup from "yup";
import {loadStripe} from "@stripe/stripe-js";

import {shades} from "../../theme";
import Payment from "./shipping/Payment";
import Shipping from "./shipping/Shipping";

// Stripe public key
const stripePromise = loadStripe(
    "pk_test_51M4ntADbdMjqLHsKUMEUquSgVXfiFQMlYVPzei2JX2BoOZBRE0lJcTgQReUwvoRo03UyvHNEkg5VTwdp6TRnKtf600mTfE3163"
);

function Checkout() {
    // Display the step of the payment process
    const [activeStep, setActiveStep] = useState(0);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    // Fetch the data from the cart
    const cart = useSelector((state) => state.cart.cart);

    // Once the form is fully submitted, continue to the next step
    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1)

        // Copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue("shippingAddress", {
                ...values.billingAddress,
                isSameAddress: true
            });
        }

        if (isSecondStep) {
            await makePayment(values);
        }

        // Resets the validation
        actions.setTouched({})
    }

    // STRIPE function to make a payment
    async function makePayment(values) {
        const stripe = await stripePromise

        console.log("Stripe Promise: ")
        console.log(stripe)
        const requestBody = {
            userName: [values.firstName, values.lastName].join(" "),
            email: values.email,
            products: cart.map(({ id, count }) => ({
                id,
                count
            }))
        }
        console.log("Request Body: ")
        console.log(requestBody)

        // Order model from backend (strapi)
        const request = await fetch("http://localhost:1337/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        })

        console.log("Request: ")
        console.log(request)

        // Will make the call to the server, will asynchronously fetch data
        const session = await request.json();
        // Redirection function to the STIPE API


        console.log("Session: ")
        console.log(session)
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }

    // Set the initial values of the form
    const initialValues = {
        billingAddress: {
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            street1: "",
            street2: "",
            state: "",
            zipCode: ""
        },
        shippingAddress: {
            isSameAddress: true,
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            street1: "",
            street2: "",
            state: "",
            zipCode: ""
        },
        email: "",
        phoneNumber: "",
    }

    // Validation configuration
    // Yup is used because InitialValues data is an obj, and it needs parsing before validation
    const checkoutSchema = [
        yup.object().shape({
            billingAddress: yup.object().shape({
                firstName: yup.string().required("First Name is a required field"),
                lastName: yup.string().required("Last Name is a required field"),
                country: yup.string().required("Country is a required field"),
                street1: yup.string().required("Street Address is a required field"),
                street2: yup.string(),
                city: yup.string().required("City is a required field"),
                state: yup.string().required("State is a required field"),
                zipCode: yup.string().required("Zip Code is a required field")
            }),
            shippingAddress: yup.object().shape({
                isSameAddress: yup.boolean(),
                firstName: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("First Name is a required field"),
                }),
                lastName: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("Last Name is a required field"),
                }),
                country: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("Country is a required field"),
                }),
                street1: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("Street Address is a required field"),
                }),
                street2: yup.string(),
                city: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("required"),
                }),
                state: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("State is a required field"),
                }),
                zipCode: yup.string().when("isSameAddress", {
                    is: false,
                    then: yup.string().required("Zip Code is a required field"),
                })
            })
        }),
        yup.object().shape({
            email: yup.string().required("Email is a required field"),
            phoneNumber: yup.string().required("Phone Number is a required field"),
        })
    ]

    return (
        <Box width="80%" m="100px auto">
            {/* Will make create all the necessary steps in the payment process */}
            <Stepper activeStep={activeStep} sx={{m: "20px 0"}}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>

            {/* Will provide a form to validate needed payment data */}
            <Box>
                <Formik onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema[activeStep]}>
                    {/* Formik provides the useful functionality via obj destructuring*/}
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          setFieldValue
                      }) => (

                        <form onSubmit={handleSubmit}>

                            {/* Show on first step only */}
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}

                            {/* Show on second step only*/}
                            {isSecondStep && (
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}

                            <Box display="flex" justifyContent="space-between" gap="50px">
                                {/* Go to previous step if the user click this button*/}
                                {isSecondStep && (
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: shades.primary[200],
                                            boxShadow: "none",
                                            color: "white",
                                            borderRadius: 0,
                                            padding: "15px 40px",
                                        }}
                                        onClick={() => setActiveStep(activeStep - 1)}
                                    >
                                        Back
                                    </Button>
                                )}

                                <Button
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: shades.primary[400],
                                        boxShadow: "none",
                                        color: "white",
                                        borderRadius: 0,
                                        padding: "15px 40px",
                                    }}
                                >
                                    {!isSecondStep ? "Next" : "Place Order"}
                                </Button>

                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}

export default Checkout;