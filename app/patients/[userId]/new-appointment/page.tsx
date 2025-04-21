/* eslint-disable @next/next/no-async-client-component */

import Image from 'next/image'
import '@/app/globals.css'
import AppointmentForm from '@/components/forms/AppointmentForm';
import { gePatient } from '@/lib/actions/patient.actions';

export default async function NewAppointment(props: SearchParamProps) {
  const { userId } = await props.params
  const patient = await gePatient(userId);
  return ( 
    <div className="flex h-screen max-h-screen">
      {/* TO DO OTP Verification | OTP Modal popup */}
      <section className="remove-scrollbar container my-auto">
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className='mb-12 h-10 w-fit' 
          />


          <AppointmentForm type="create" userId={userId} patientId={patient.$id}/>

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-center text-dark-600 xl:text-left'>© 2025 Care Connect</p>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt='appointment'
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>

  );
}
