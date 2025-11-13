import { AuthContext } from '@/Provider/AuthProvider';
import React, { useState, useEffect, useContext } from 'react';

const MyApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const {user}=useContext(AuthContext);
  const [userEmail, setUserEmail] = useState(user?.email || '');
  // Replace this with the actual user's email (from auth context, localStorage, etc.)
  

  // Fetch applications for the specific user
  useEffect(() => {
    const fetchMyApplications = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://volunteer-management-server-a11.onrender.com/apply-volunteer?email=${user?.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApplications(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, [userEmail]); // Re-fetch when userEmail changes

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
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
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Applications</h3>
            <p className="text-gray-600">Fetching applications for {userEmail}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Applications</h3>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-blue-600 font-medium mb-6">Email: {userEmail}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">My Volunteer Applications</h1>
              <p className="text-blue-100 text-lg">View and manage your submitted applications</p>
              <p className="text-blue-200 text-sm mt-2">Logged in as: {userEmail}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-center">
              <div className="text-2xl font-bold">{applications.length}</div>
              <div className="text-blue-100 text-sm">My Applications</div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {applications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                You haven't submitted any volunteer applications yet.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200">
                Apply Now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Application Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application, index) => (
                    <tr 
                      key={application._id || index} 
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {application.photo && (
                            <img
                              src={application.photo}
                              alt={application.applycant_name}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${
                                  encodeURIComponent(application.applycant_name || 'Applicant')
                                }&background=3498db&color=fff&size=40`;
                              }}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.applycant_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.applycant_email}
                            </div>
                            {application.fullName && application.applycant_name !== application.fullName && (
                              <div className="text-sm text-gray-400">
                                {application.fullName}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {application.Location || application.location || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatDate(application.dateOfBirth)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(application)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center space-x-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Details Modal */}
        {showDetails && selectedApplication && (
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
                {/* Applicant Header */}
                <div className="flex items-center space-x-4 mb-6">
                  {selectedApplication.photo && (
                    <img
                      src={selectedApplication.photo}
                      alt={selectedApplication.applycant_name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${
                          encodeURIComponent(selectedApplication.applycant_name || 'Applicant')
                        }&background=3498db&color=fff&size=64`;
                      }}
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedApplication.applycant_name}
                    </h3>
                    <p className="text-gray-600">{selectedApplication.applycant_email}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {selectedApplication.fullName && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Full Name (English)
                      </label>
                      <p className="text-gray-900">{selectedApplication.fullName}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Full Name (Bengali)
                    </label>
                    <p className="text-gray-900 text-lg">{selectedApplication.applycant_name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                    <p className="text-gray-900 break-all">{selectedApplication.applycant_email}</p>
                  </div>

                  {(selectedApplication.Location || selectedApplication.location) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Location</label>
                      <p className="text-gray-900">
                        {selectedApplication.Location || selectedApplication.location}
                      </p>
                    </div>
                  )}

                  {selectedApplication.dateOfBirth && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Date of Birth</label>
                      <p className="text-gray-900">{formatDate(selectedApplication.dateOfBirth)}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Application Status</label>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                        selectedApplication.status
                      )}`}
                    >
                      {selectedApplication.status || 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Cover Letter */}
                {selectedApplication.coverletter && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <label className="block text-sm font-semibold text-gray-600 mb-3">Cover Letter</label>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 max-h-48 overflow-y-auto">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.coverletter}</p>
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

export default MyApplicationsTable;