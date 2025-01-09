import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Sign_In_Page = () => {
  return (
    <div className='flex item-center justify-center min-h-screen mt-[50px]'>
      <SignIn path="/sign-in" routing="path" redirectUrl="/dashboard"  signUpUrl="/sign-up" />
    </div>
  )
}

export default Sign_In_Page;
