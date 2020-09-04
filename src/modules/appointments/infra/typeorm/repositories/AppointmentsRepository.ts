

import IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import {getRepository, Repository, Raw } from 'typeorm';
import ICreateAppointmentDTO from 'modules/appointments/dtos/ICreateAppoinmentDTO';
import IFindAllInMonthFromProviderDTO from 'modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
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



    public async findAllInMonthFromProvider ({
        provider_id,
        month,
        day,
        year
    }: IFindAllInDayFromProviderDTO): Promise< Appointment[]> {

        const parseDay = String(day).padStart(2,'0');
        const parseMonth = String(month).padStart(2,'0');

        const appointments =  await this.ormRepository.find( {
            where : {
                provider_id,
                date: Raw (
                    dateFieldName =>
                    `to_char (${dateFieldName}, 'MM-YYYY) ='${parseDay} - ${parseMonth} ${year}'`,
                )
            }
        })
        return appointments;
    }



    public async findAllInDayFromProvider ({
        provider_id,
        month,
        year
    }: IFindAllInDayFromProviderDTO): Promise< Appointment[]> {

        const parseMonth = String(month).padStart(2,'0');

        const appointments =  await this.ormRepository.find( {
            where : {
                provider_id,
                date: Raw (
                    dateFieldName =>
                    `to_char (${dateFieldName}, 'MM-YYYY') ='${parseMonth} - ${year}'`,
                )
            }
        })
        return appointments;
    }




    public async create({ provider_id, date}: ICreateAppointmentDTO) : Promise<Appointment> {
        const appoinment = this.ormRepository.create({provider_id, date});
        await  this.ormRepository.save(appoinment);
        return appoinment;
    }


}
export default AppointmentsRepository;
