
import Image from "next/image"
import Link from "next/link"
import '@/app/globals.css'
import StatCard from "@/components/StatCard"
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions"
import {DataTable} from "@/components/table/DataTable"
import { columns } from "@/components/table/columns"

const page = async () => {

  const appointments = await getRecentAppointmentList()

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href='/' className="cursor-pointer">
          <Image
            src='/assets/icons/logo-full.svg'
            width={162}
            height={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Start the day with managing new appointment</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount ?? 0}
            label="Schedule appointment"
            icon="/assets/icons/appointments.svg"
          />

          <StatCard
            type="pending"
            count={appointments?.pendingCount ?? 0}
            label="Pending appointment"
            icon="/assets/icons/pending.svg"
          />

          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount ?? 0}
            label="Canceled appointment"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments?.documents ?? []} />
       
      </main>
    </div>
  )
}

export default page


