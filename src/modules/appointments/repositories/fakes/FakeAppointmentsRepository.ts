import  IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

import { uuid} from 'uuidv4';
import IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import {isEqual, getMonth, getYear, getDate} from 'date-fns';

import ICreateAppointmentDTO from 'modules/appointments/dtos/ICreateAppoinmentDTO';
import IFindAllInDayFromProviderDTO from 'modules/appointments/dtos/IFindAllInDayFromProviderDTO';


class FakeAppointmentsRepository implements IAppoinmentsRepository  {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise< Appointment | undefined > {

        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date),
        )
        return findAppointment;
    }


    public async findAllInMonthFromProvider ({
        provider_id,
        month,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise< Appointment[]> {

        const appointments = this.appointments.filter(appointment =>
            appointment.provider_id === provider_id &&
            getDate(appointment.date) === day &&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date)  === year,

        );
        return appointments;
    }


    public async findAllInDayFromProvider ({
        provider_id,
        month,
        year,
        day,
    }: IFindAllInDayFromProviderDTO): Promise< Appointment[]> {

        const appointments = this.appointments.filter(appointment =>
            appointment.provider_id === provider_id&&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date)  === year,

        );
        return appointments;
    }

    public async create({ provider_id, date}: ICreateAppointmentDTO) : Promise<Appointment> {

        const appointment = new Appointment();
        Object.assign(appointment,{id: uuid(), date, provider_id})
        this.appointments.push(appointment);
        return appointment;
    }


}
export default FakeAppointmentsRepository;
