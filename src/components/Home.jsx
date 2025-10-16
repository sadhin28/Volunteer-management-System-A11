import React from 'react';
import useTitle from '../hooks/useTitle';
import 'react-awesome-slider/dist/styles.css';
import Slider from './slider/Slider';
import VolunteerNeedsNow from './VolunteerNeedsNow';
const Home = () => {
    useTitle("Home")
    
    return (
       <div>
        {/*Banner Slider Sectin */}
       <section className='md:mt-0 mt-16'>
        <Slider/>
       </section>
        {/*Volunteer Needs Now Section  */}
        <section>
            
             <VolunteerNeedsNow/>
        </section>
        
       </div>

    );
};

export default Home;