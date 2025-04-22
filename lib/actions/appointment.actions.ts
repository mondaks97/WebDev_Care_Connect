'use server'

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, databases, DB_ID, messaging } from "../appwrite.config"
import { formatDateTime, parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DB_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    )

    return parseStringify(newAppointment)
  } catch (error) {
    console.log(error);

  }
}

export const getAppointment = async (appointmentId: string) => {
  try {

    const appointment = await databases.getDocument(
      DB_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    )

    return parseStringify(appointment)
  } catch (error) {
    console.log(error);

  }
}

export const getRecentAppointmentList = async () => {
  try {

    const appointments = await databases.listDocuments(
      DB_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    )

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }

      return acc
    }, initialCounts)

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents
    }

    return parseStringify(data)
  } catch (error) {
    console.log(error);

  }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
  try {

    const updatedAppointment = await databases.updateDocument(
      DB_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if (!updatedAppointment) {
      throw new Error('Appointment not found')
    }

    //SMS CONFIRMATION NOTIFICATION 

    const smsMessage = `
    Hello this is Care Connect.  
    ${type === 'schedule'
        ? `naka schedule kana kaya pumunta ka ng ${formatDateTime(appointment.schedule!).dateTime} ang iyong doctor ay si Dr. ${appointment.primaryPhysician}.`
        : `ang appointment mo ay kinansela. rason: ${appointment.cancellationReason}`
      }`

      await sendSmsNotification(userId, smsMessage);

    revalidatePath('/admin')
    return parseStringify(updateAppointment)
  } catch (error) {
    console.log(error);

  }
}

export const sendSmsNotification = async (userId: string, content: string) => {
  try {

    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    )

    return parseStringify(message);
  } catch (error) {
    console.log(error);

  }
}