import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Sign_Up_Page = () => {
  return (
    <div className='flex item-center justify-center min-h-screen'>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in"/>
    </div>
  )
}

export default Sign_Up_Page;
