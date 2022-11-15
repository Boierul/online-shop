import React from 'react';
import MainCarousel from "./MainCarousel";
import Subscribe from "./Subscribe";
import ShoppingList from "./ShoppingList";

function Home() {
    return (
        <div className="home">
            <MainCarousel />
            <ShoppingList />
            <Subscribe />
        </div>
    );
}

export default Home;