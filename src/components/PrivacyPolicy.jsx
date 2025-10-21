import React from 'react';
import useTitle from '../hooks/useTitle';

const PrivacyPolicy = () => {
    useTitle("Privacy Policy")
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
    return (

        <div className="max-w-7xl mx-auto py-10 px-5 text-gray-700">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="mb-4">
                Welcome to <span className="font-semibold">Volunteer Hub</span>. Your
                privacy is important to us. This Privacy Policy explains how we collect,
                use, and protect your personal information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <p className="mb-4">
                We may collect information such as your name, email address, phone
                number, and profile data when you register or participate in volunteer
                programs.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
            <p className="mb-4">
                We use your information to connect you with volunteering opportunities,
                communicate updates, and improve our services. We do not sell your data
                to third parties.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
            <p className="mb-4">
                We use modern security measures to protect your data. However, please be
                aware that no method of data transmission over the internet is 100%
                secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
            <p className="mb-4">
                You can update or delete your information anytime by contacting us or
                through your user profile.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Updates</h2>
            <p className="mb-4">
                We may update this Privacy Policy periodically. Any changes will be
                posted here with an updated date.
            </p>

            <p className="mt-8 text-sm text-center text-gray-500">
               Last updated: {formattedDate}
            </p>
        </div>

    );
};

export default PrivacyPolicy;