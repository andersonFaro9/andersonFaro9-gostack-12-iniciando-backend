import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import {container }from 'tsyringe';

export default class AppointmentsController {
    public async create(request: Request, response:Response) : Promise<Response> {
        const { provider_id, date } = request.body;
        //const appointmentsRepository = new AppointmentsRepository();
        const parseDate = parseISO(date);

         const createAppoinment = container.resolve(CreateAppointmentService);
        const appointment = await createAppoinment.execute({
            date: parseDate,
            provider_id,
        });
        return response.json(appointment);
    };
}
