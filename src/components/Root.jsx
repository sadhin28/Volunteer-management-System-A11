import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Root = () => {
    return (
        <div className='' >
            {/* Navbar */}
            <header className=''>
               <NavigationBar/>
            </header>
            {/* Main outlate */}
            <main className='max-w-7xl  px-4 mx-auto mt-14 md:mt-17  min-h-[calc(100vh-314px)]'>
                <Outlet/>
            </main>
            {/* Footer */}
            <footer>
               <Footer/>
            </footer>
        </div>
    );
};

export default Root;