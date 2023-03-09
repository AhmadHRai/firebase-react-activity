import React from "react";
import { auth } from "../../util/firebase";


const Profile = () => {
  const email = auth?.currentUser?.email // This should get the email from auth
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         <h1>Email: {email || "You haven't signed in"}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
