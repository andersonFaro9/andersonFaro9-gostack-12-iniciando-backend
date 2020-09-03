
import IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import {getRepository, Repository } from 'typeorm';
import ICreateAppointmentDTO from 'modules/appointments/dtos/ICreateAppoinmentDTO';

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

    public async create({ provider_id, date}: ICreateAppointmentDTO) : Promise<Appointment> {
        const appoinment = this.ormRepository.create({provider_id, date});
        await  this.ormRepository.save(appoinment);
        return appoinment;
    }


}
export default AppointmentsRepository;
