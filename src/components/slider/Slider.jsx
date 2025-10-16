import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import './slider.css';

const Slider = () => {

    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEpvaW4lMjBIYW5kcyUyMHRvJTIwTWFrZSUyMGElMjBEaWZmZXJlbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=700",
            title: "Join Hands to Make a Difference",
            description: "Be part of our volunteer community and help improve lives around you.",
            color: "bg-blue-500/20"
        },
        {
            image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
            title: "Serve Your Community",
            description: "Take action to support those in need through various social activities.",
            color: "bg-green-500/20"
        },
        {
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
            title: "Volunteer for Change",
            description: "Together we can build a better tomorrow by spreading kindness and hope.",
            color: "bg-orange-500/20"
        },
        {
            image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
            title: "Empower and Educate",
            description: "Help us empower underprivileged communities through education and care.",
            color: "bg-pink-500/20"
        }
    ];
    return (

        <AutoplaySlider play={true} interval={3000} className='w-full aspect-[3/1]'>
            {
                slides.map((slide, index) => (
                    <div
                        key={index}
                        className={` w-full  lg:p-5 md:p-4 p-3 flex items-center gap-5 ${slide.color}`}
                    >
                        <img
                            src={slide.image}
                            alt="slider img"
                            className="w-5/12 object-center aspect-[3/2] object-cover rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl rounded-3xl"
                        />
                        <div className="w-7/12 text-black">
                            <h2 className="lg:text-5xl md:text-3xl font-bold text-xl">{slide.title}</h2>
                            <p className="lg:text-2xl md:text-lg text-sm lg:mt-4 md:mt-3 mt-2">{slide.description}</p>
                        </div>
                    </div>
                ))
            }

        </AutoplaySlider>

    );
};

export default Slider;