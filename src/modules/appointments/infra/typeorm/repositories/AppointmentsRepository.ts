

import IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import {getRepository, Repository, Raw } from 'typeorm';
import IFindAllInMonthFromProviderDTO from 'modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from 'modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppoinmentDTO';

export default class AppointmentsRepository implements IAppoinmentsRepository  {
    private ormRepository: Repository<Appointment>;


    constructor() {
        this.ormRepository = getRepository(Appointment)
    }
    public async create({ provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date, user_id });

        await this.ormRepository.save(appointment);

        return appointment;
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
        const parseMonth =  String(month).padStart(2,"0");
          const appointments = await this.ormRepository.find({
              where : {
                  provider_id,
                  date: Raw (
                      dateFieldName =>
                        `to_char (${dateFieldName}, 'MM-YYYY') = '${parseMonth} - ${year}'`,
                  ),

          },

    });

        return appointments;
    }



    public async findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parseDay =  String(day).padStart(2,"0");
        const parseMonth =  String(month).padStart(2,"0");
          const appointments = await this.ormRepository.find({
              where : {
                  provider_id,
                  date: Raw (
                      dateFieldName =>
                        `to_char (${dateFieldName}, 'DD-YYYY') = '${parseDay} -  ${parseMonth} ${year}'`,
                  ),

          },


    });

    return appointments;


    }

}

