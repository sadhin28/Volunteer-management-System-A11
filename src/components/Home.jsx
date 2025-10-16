import React from 'react';
import useTitle from '../hooks/useTitle';
import 'react-awesome-slider/dist/styles.css';
import Slider from './slider/Slider';
const Home = () => {
    useTitle("Home")
    
    return (
       <div>
        {/*Banner Slider Sectin */}
       <section>
        <Slider/>
       </section>
        {/*Volunteer Needs Now Section  */}
        <section>
         
        </section>
        
       </div>

    );
};

export default Home;