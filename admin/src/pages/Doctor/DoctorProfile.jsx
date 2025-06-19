import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken } = useContext(DoctorContext);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/doctor/profile`,
          {
            headers: { 
              'Authorization': `Bearer ${dToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const { data } = response;
        if (data.success) {
          setDoctor(data.doctor);
        } else {
          toast.error("Failed to fetch doctor profile");
        }
      } catch (error) {
        console.error("Doctor profile error:", error);
        toast.error(error.response?.data?.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [dToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="md:flex">
          {/* Doctor Image */}
          <div className="md:w-1/3 p-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Doctor Information */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dr. {doctor.name}
            </h1>
            <p className="text-gray-600 mb-4">{doctor.specialization}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-semibold">{doctor.experience} years</p>
              </div>
              <div>
                <p className="text-gray-500">Consultation Fee</p>
                <p className="font-semibold">₹{doctor.fee}</p>
              </div>
              <div>
                <p className="text-gray-500">Rating</p>
                <p className="font-semibold">{doctor.rating || 0} ⭐</p>
              </div>
              <div>
                <p className="text-gray-500">Total Reviews</p>
                <p className="font-semibold">{doctor.totalRating || 0}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-600">{doctor.about}</p>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-semibold">{doctor.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-semibold">{doctor.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timings Section */}
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {doctor.timings && doctor.timings.map((timing, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold">{timing.day}</p>
                <p className="text-gray-600">
                  {timing.start} - {timing.end}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;