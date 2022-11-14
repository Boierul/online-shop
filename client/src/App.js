import {useEffect} from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";

/* Will prevent scrolling positioning in a new page */
const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    {/*<Route path="/" element={<Home />} />*/}
                    {/*<Route path="item/:itemId" element={<ItemDetails />} />*/}
                    {/*<Route path="checkout" element={<Checkout />} />*/}
                    {/*<Route path="checkout/success" element={<Confirmation />} />*/}
                </Routes>
                <h1>APP</h1>
            </BrowserRouter>
        </div>
    );
}

export default App;
