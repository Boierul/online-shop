import {Box, Typography, IconButton, useMediaQuery} from "@mui/material";

import {Carousel} from "react-responsive-carousel";
// Carousel requirement import
import "react-responsive-carousel/lib/styles/carousel.min.css";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {shades} from "../../theme";

/* Imports all images from assets folder */
const importAll = (r) =>
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});

/* Allows to grab the import images as a list */
export const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

/* Carousel docs: https://www.npmjs.com/package/react-responsive-carousel */

// Custom animation
// Pass it to Carousel field as:  animationHandler={fadeAnimationHandler}
//
// const fadeAnimationHandler: AnimationHandler = (props, state): AnimationHandlerResponse => {
//     const transitionTime = props.transitionTime + 'ms';
//     const transitionTimingFunction = 'cubic-bezier(.35,.6,.46,.69)';
//
//     let slideStyle: React.CSSProperties = {
//         position: 'absolute',
//         display: 'block',
//         zIndex: -2,
//         minHeight: '100%',
//         opacity: 0,
//         top: 0,
//         right: 0,
//         left: 0,
//         bottom: 0,
//         transitionTimingFunction: transitionTimingFunction,
//         msTransitionTimingFunction: transitionTimingFunction,
//         MozTransitionTimingFunction: transitionTimingFunction,
//         WebkitTransitionTimingFunction: transitionTimingFunction,
//         OTransitionTimingFunction: transitionTimingFunction,
//     };
//
//     if (!state.swiping) {
//         slideStyle = {
//             ...slideStyle,
//             WebkitTransitionDuration: transitionTime,
//             MozTransitionDuration: transitionTime,
//             OTransitionDuration: transitionTime,
//             transitionDuration: transitionTime,
//             msTransitionDuration: transitionTime,
//         };
//     }
//
//     return {
//         slideStyle,
//         selectedStyle: { ...slideStyle, opacity: 1, position: 'relative' },
//         prevStyle: { ...slideStyle },
//     };
// };

const MainCarousel = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        color: "white",
                        padding: "5px",
                        zIndex: "10",
                        marginLeft: "1rem"
                    }}
                >
                    <NavigateBeforeIcon sx={{fontSize: 40}}/>
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0",
                        color: "white",
                        padding: "5px",
                        zIndex: "10",
                        marginRight: "1rem"
                    }}
                >
                    <NavigateNextIcon sx={{fontSize: 40}}/>
                </IconButton>
            )}
        >
            {Object.values(heroTextureImports).map((texture, index) => (
                <Box key={`carousel-image-${index}`}>
                    <img
                        src={texture}
                        alt={`carousel-${index}`}
                        style={{
                            width: "100%",
                            height: "700px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed",
                        }}
                    />

                    <Box
                        color="white"
                        padding="20px"
                        borderRadius="1px"
                        textAlign="left"
                        position="absolute"
                        top="46%"
                        left={isNonMobile ? "10%" : "0"}
                        right={isNonMobile ? undefined : "0"}
                        margin={isNonMobile ? undefined : "0 auto"}
                        maxWidth={isNonMobile ? undefined : "240px"}
                    >
                        <Typography variant="h1">
                            FRIDAY
                            <span style={{color: shades.secondary[400]}}>SALE</span>
                        </Typography>

                    </Box>

                </Box>
            ))}
        </Carousel>
    );
};

export default MainCarousel;
