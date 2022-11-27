import {
  MigrationInterface,
  QueryRunner,
  Table
} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {

  name = 'CinemaSystem1663877813247';

  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise < void > {
    // User
    // Movie
    // CinemaHall
    // CinemaSeat
    // Show
    // Booking
    // ShowSeat

    await queryRunner.createTable(
      new Table({
        name: "User",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "type",
            type: 'enum',
            enum: ['user', 'owner'],
          }
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: "Movie",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: "CinemaHall",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "totalSeat",
            type: "int",
          },
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: "CinemaSeat",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "cinemaHallId",
            type: "int",
          },
          {
            name: "type",
            type: "enum",
            enum: ['couple', 'vip', 'premium'],
          },
          {
            name: "status",
            type: "enum",
            enum: ['Available', 'Almost Full', 'Not Available'],
          }
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: "Show",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "dateTime",
            type: "Date",
          },
          {
            name: "startTime",
            type: "Date",
          },
          {
            name: "endTime",
            type: "Date",
          },
          {
            name: "movieId",
            type: "int",
          },
          {
            name: "cinemaHallId",
            type: "int",
          }
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: "Booking",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "dateTime",
            type: "Date",
          },
          {
            name: "status",
            type: 'enum',
            enum: ['passed', 'failed', 'pending'],
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "showId",
            type: 'int',
          },
        ],
      }),
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: "ShowSeat",
        columns: [{
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "price",
            type: "int",
          },
          {
            name: "CinemaSeatId",
            type: 'int',
          },
          {
            name: "showId",
            type: 'int',
          },
          {
            name: "bookingId",
            type: 'int',
          }
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise < void > {}
}