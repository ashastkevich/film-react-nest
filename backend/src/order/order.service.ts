import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  FILMS_REPOSITORY,
  IFilmsRepository,
} from '../repository/films.repository';
import {
  OrderRequest,
  OrderResponse,
  TicketResponse,
} from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: IFilmsRepository,
  ) {}

  async createOrder(order: OrderRequest): Promise<OrderResponse> {
    const confirmedTickets: TicketResponse[] = [];

    for (const ticket of order.tickets) {
      const session = await this.filmsRepository.findSession(
        ticket.film,
        ticket.session,
      );

      if (!session) {
        throw new BadRequestException(
          `Session ${ticket.session} for film ${ticket.film} not found`,
        );
      }

      if (ticket.row < 1 || ticket.row > session.rows) {
        throw new BadRequestException(
          `Row ${ticket.row} is out of range for session ${ticket.session}`,
        );
      }

      if (ticket.seat < 1 || ticket.seat > session.seats) {
        throw new BadRequestException(
          `Seat ${ticket.seat} is out of range for session ${ticket.session}`,
        );
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;

      const alreadyInThisOrder = confirmedTickets.some(
        (t) =>
          t.session === ticket.session &&
          t.row === ticket.row &&
          t.seat === ticket.seat,
      );

      if (alreadyInThisOrder || session.taken.includes(seatKey)) {
        throw new BadRequestException(
          `Seat ${seatKey} in session ${ticket.session} is already taken`,
        );
      }

      await this.filmsRepository.markSeatTaken(
        ticket.film,
        ticket.session,
        seatKey,
      );

      confirmedTickets.push({ ...ticket, id: randomUUID() });
    }

    return { total: confirmedTickets.length, items: confirmedTickets };
  }
}
