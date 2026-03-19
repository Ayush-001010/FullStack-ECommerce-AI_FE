import React from 'react'
import type IHome from './IHome'
import Banner from '../../Component/Banner/Banner';
import Category from '../../Component/Category/Category';
import ProductItems from '../../Component/ProductItems/ProductItems';

const Home : React.FC<IHome> = () => {
    return (
        <div>
            <Banner/>
            <Category/>
            <ProductItems/>
        </div>
    )
};

export default Home