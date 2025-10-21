import React from 'react';
import useTitle from '../hooks/useTitle';

const TermsAndCondition = () => {
    useTitle('Terms & Condition')
      const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
    return (
        <div className="max-w-7xl mx-auto py-10 px-5 text-gray-700">
            <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
            <p className="mb-4">
                By using <span className="font-semibold">Volunteer Hub</span>, you agree
                to the following terms and conditions. Please read them carefully before
                using our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
            <p className="mb-4">
                Your access and use of this platform indicate your acceptance of these
                Terms and Conditions. If you disagree, please stop using our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
            <p className="mb-4">
                Users must provide accurate information, behave respectfully toward
                others, and comply with all applicable laws when engaging in volunteer
                activities.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Content Ownership</h2>
            <p className="mb-4">
                All content, logos, and trademarks on this platform belong to Volunteer
                Hub unless stated otherwise. You may not copy or redistribute without
                permission.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
            <p className="mb-4">
                Volunteer Hub is not responsible for any damages, loss, or injury
                resulting from participation in volunteer activities or misuse of the
                platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
            <p className="mb-4">
                We may modify these Terms at any time. Continued use of our platform
                means you accept the revised terms.
            </p>

            <p className="mt-8 text-sm text-center text-gray-500">
               Last updated: {formattedDate}
            </p>
        </div>
    );
};

export default TermsAndCondition;