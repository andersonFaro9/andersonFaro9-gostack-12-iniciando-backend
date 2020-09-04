
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppoinmentDTO from '../dtos/ICreateAppoinmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppoinmentDTO) : Promise  <Appointment>;
    findByDate(date: Date):Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        date:IFindAllInMonthFromProviderDTO
    ) : Promise<Appointment[]>;

    findAllInDayFromProvider ( data: IFindAllInDayFromProviderDTO) : Promise<Appointment[]>;




}
