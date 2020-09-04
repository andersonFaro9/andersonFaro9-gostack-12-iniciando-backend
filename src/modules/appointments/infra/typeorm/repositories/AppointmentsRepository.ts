

import IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import {getRepository, Repository, Raw } from 'typeorm';
import ICreateAppointmentDTO from 'modules/appointments/dtos/ICreateAppoinmentDTO';
import IFindAllInMonthFromProviderDTO from 'modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class AppointmentsRepository implements IAppoinmentsRepository  {
    private ormRepository: Repository<Appointment>;


    constructor() {
        this.ormRepository = getRepository(Appointment)
    }
    public async findByDate(date: Date): Promise< Appointment | undefined > {
        //valida data de agendamento
        const findAppointment = await this.ormRepository.findOne({
            where: {date},
        })
        return findAppointment;
    }



    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }






}
export default AppointmentsRepository;
