import React from 'react'
import type IHome from './IHome'
import Navbar from '../../Component/Navbar/Navbar';
import Banner from '../../Component/Banner/Banner';

const Home : React.FC<IHome> = () => {
    return (
        <div>
            <Navbar />
            <Banner/>
        </div>
    )
};

export default Home