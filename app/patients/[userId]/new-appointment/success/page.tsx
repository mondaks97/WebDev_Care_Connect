import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import '@/app/globals.css'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const page = async ({ params, searchParams }: SearchParamProps) => {
  // Await params and searchParams to ensure you get the values asynchronously
  const { userId } = await params;
  const { appointmentId } = await searchParams; // Await searchParams to resolve appointmentId correctly

  const appointment = await getAppointment(appointmentId); 

  // const { userId } = await params; // No need for `await` here
  // const appointmentId = (await searchParams?.appointmentId) || '';
  // const appointment = await getAppointment(appointmentId);

const doctor = Doctors.find((doc) => doc.name === appointment?.primaryPhysician)

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt='logo'
            className='h-10 w-fit '
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt='success'
            unoptimized
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>Your <span className='text-green-500'>appointment request</span> has been successfully submitted! </h2>
          <p>We&apos;ll get in touch shortly.</p>
        </section>

        <section className='request-details'>
          <p>Appointment Details</p>
          <div className='flex items-center gap-3'>
              <Image 
                src={doctor?.image || '/assets/images/upload_area.png'}
                alt='doctor'
                width={100}
                height={100}
                className='size-6'
              />
              <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>

          <div className='flex gap-2'>
            <Image 
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt='calendar'
            />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className='shad-primary-btn' asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
        </Button>
        <p className='copyright'>© 2025 Care Connect</p>
      </div>
    </div>
  )
}

export default page
