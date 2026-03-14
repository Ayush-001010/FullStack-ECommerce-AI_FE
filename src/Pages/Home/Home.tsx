import React from 'react'
import type IHome from './IHome'
import Navbar from '../../Component/Navbar/Navbar';
import Banner from '../../Component/Banner/Banner';
import Category from '../../Component/Category/Category';

const Home : React.FC<IHome> = () => {
    return (
        <div>
            <Navbar />
            <Banner/>
            <Category/>
        </div>
    )
};

export default Home