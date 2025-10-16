import React from 'react';
import useTitle from '../hooks/useTitle';
import 'react-awesome-slider/dist/styles.css';
import Slider from './slider/Slider';
const Home = () => {
    useTitle("Home")
    
    return (
       <div>
        {/* Slider Sectin */}
        <Slider/>
        <Slider/>
        <Slider/>
        {/*  */}
        
       </div>

    );
};

export default Home;