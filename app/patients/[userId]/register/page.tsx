import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'


const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;  // Await the params object before accessing properties
  const user = await getUser(userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">User not found or an error occurred.</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | OTP Modal popup */}
      <section className="remove-scrollbar container">
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className='mb-12 h-10 w-fit'
          />


          <RegisterForm user={user!}/>

          <div className='copyright py-12'>
            <p className='justify-items-center text-dark-600 xl:text-left'>© 2025 Care Connect</p>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt='register'
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Register
