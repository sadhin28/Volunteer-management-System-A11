import { AuthContext } from '@/Provider/AuthProvider';
import React, { useState, useEffect, useContext } from 'react';

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [myApplication, setMyApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user}=useContext(AuthContext)
  // Your specific email to filter applications
  const myEmail = user?.email || '';

  // Fetch data from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://volunteer-management-server-a11.onrender.com/apply-volunteer'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApplications(Array.isArray(data) ? data : [data]);
        
        // Filter to find your application
        const myApp = Array.isArray(data) 
          ? data.find(app => 
              app.applycant_email?.toLowerCase() === myEmail.toLowerCase() ||
              app.email?.toLowerCase() === myEmail.toLowerCase()
            )
          : data;
        
        if (myApp) {
          setMyApplication(myApp);
        } else {
          setError("No application found for your email address");
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [myEmail]);

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    switch (statusLower) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Application</h3>
            <p className="text-gray-600">Please wait while we fetch your application details</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !myApplication) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Application Not Found</h3>
          <p className="text-gray-600 mb-2">We couldn't find an application for:</p>
          <p className="text-blue-600 font-medium mb-6">{myEmail}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Volunteer Application</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View and track the status of your volunteer application
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Status Banner */}
          <div className={`bg-gradient-to-r ${
            myApplication.status === 'approved' ? 'from-green-500 to-green-600' :
            myApplication.status === 'rejected' ? 'from-red-500 to-red-600' :
            myApplication.status === 'reviewed' ? 'from-yellow-500 to-yellow-600' :
            'from-blue-500 to-blue-600'
          } p-6 text-white`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Application Status</h2>
                <p className="text-blue-100">
                  {myApplication.status === 'approved' ? 'Congratulations! Your application has been approved.' :
                   myApplication.status === 'rejected' ? 'Thank you for your interest. Unfortunately, your application was not successful.' :
                   myApplication.status === 'reviewed' ? 'Your application is being reviewed by our team.' :
                   'Your application has been received and is pending review.'}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white ${
                  myApplication.status === 'approved' ? 'text-green-600' :
                  myApplication.status === 'rejected' ? 'text-red-600' :
                  myApplication.status === 'reviewed' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {myApplication.status || 'Pending Review'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Overview */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {myApplication.applycant_name || myApplication.fullName}
                </div>
                <div className="text-sm text-gray-500">Applicant Name</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {myApplication.applycant_email}
                </div>
                <div className="text-sm text-gray-500">Email Address</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {formatDate(myApplication.dateOfBirth)}
                </div>
                <div className="text-sm text-gray-500">Date of Birth</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewDetails}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Full Application Details</span>
              </button>
              
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Application</span>
              </button>
            </div>
          </div>
        </div>

        {/* Application Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Application Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Application Submitted</p>
                <p className="text-gray-500 text-sm">Your application has been successfully submitted</p>
              </div>
              <div className="text-sm text-gray-500">Now</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                myApplication.status === 'reviewed' || myApplication.status === 'approved' || myApplication.status === 'rejected' 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}>
                {myApplication.status === 'reviewed' || myApplication.status === 'approved' || myApplication.status === 'rejected' ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Under Review</p>
                <p className="text-gray-500 text-sm">Our team is reviewing your application</p>
              </div>
              <div className="text-sm text-gray-500">
                {myApplication.status === 'reviewed' || myApplication.status === 'approved' || myApplication.status === 'rejected' 
                  ? 'Completed' 
                  : 'Pending'}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                myApplication.status === 'approved' || myApplication.status === 'rejected' 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}>
                {myApplication.status === 'approved' || myApplication.status === 'rejected' ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Decision Made</p>
                <p className="text-gray-500 text-sm">Final decision on your application</p>
              </div>
              <div className="text-sm text-gray-500">
                {myApplication.status === 'approved' || myApplication.status === 'rejected' 
                  ? 'Completed' 
                  : 'Pending'}
              </div>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && myApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Application Details</h2>
                  <button
                    onClick={handleCloseDetails}
                    className="text-white hover:text-gray-200 transition duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Photo */}
                {myApplication.photo && (
                  <div className="flex justify-center mb-8">
                    <img
                      src={myApplication.photo}
                      alt={myApplication.fullName || myApplication.applycant_name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${
                          encodeURIComponent(
                            myApplication.fullName || myApplication.applycant_name || 'Applicant'
                          )
                        }&background=3498db&color=fff&size=128`;
                      }}
                    />
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {myApplication.fullName && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Full Name (English)
                      </label>
                      <p className="text-gray-900">{myApplication.fullName}</p>
                    </div>
                  )}

                  {myApplication.applycant_name && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Full Name (Bengali)
                      </label>
                      <p className="text-gray-900 text-lg">{myApplication.applycant_name}</p>
                    </div>
                  )}

                  {myApplication.applycant_email && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                      <a
                        href={`mailto:${myApplication.applycant_email}`}
                        className="text-blue-600 hover:text-blue-800 break-all"
                      >
                        {myApplication.applycant_email}
                      </a>
                    </div>
                  )}

                  {(myApplication.Location || myApplication.location) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Location</label>
                      <p className="text-gray-900">
                        {myApplication.Location || myApplication.location}
                      </p>
                    </div>
                  )}

                  {myApplication.dateOfBirth && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Date of Birth</label>
                      <p className="text-gray-900">{formatDate(myApplication.dateOfBirth)}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Application Status</label>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                        myApplication.status
                      )}`}
                    >
                      {myApplication.status || 'Pending Review'}
                    </span>
                  </div>

                  {/* Additional optional fields */}
                  {myApplication.phone && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Phone</label>
                      <p className="text-gray-900">{myApplication.phone}</p>
                    </div>
                  )}

                  {myApplication.address && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Address</label>
                      <p className="text-gray-900">{myApplication.address}</p>
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                {myApplication.coverletter && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <label className="block text-sm font-semibold text-gray-600 mb-3">Cover Letter</label>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 max-h-48 overflow-y-auto">
                      <p className="text-gray-700 whitespace-pre-wrap">{myApplication.coverletter}</p>
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleCloseDetails}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Close Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplication;