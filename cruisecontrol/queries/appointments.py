from pydantic import BaseModel
from queries.pool import pool
from datetime import date, time
from typing import List, Optional


class AppointmentIn(BaseModel):
    customer_name: str
    customer_phone: int
    vehicle_make: Optional[str]
    vehicle_model: Optional[str]
    vehicle_year: Optional[int]
    vehicle_color: Optional[str]
    notes: Optional[str]
    date_of_service: Optional[date]
    business_id: int



class AppointmentOut(BaseModel):
    id: int
    customer_name: str
    customer_phone: int
    vehicle_make: Optional[str]
    vehicle_model: Optional[str]
    vehicle_year: Optional[int]
    vehicle_color: Optional[str]
    notes: Optional[str]
    date_of_service: Optional[date]
    business_id: int


class AppointmentQueries:
    def get_all(self, appointment: AppointmentIn,  business_id:int) -> List[AppointmentOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                    , customer_name
                    , customer_phone
                    , vehicle_make
                    , vehicle_model
                    , vehicle_year
                    , vehicle_color
                    , notes
                    , date_of_service
                    , business_id
                    from appointments
                    where business_id = %s
                    """,
                    [business_id],
                )
                result = []
                for record in db:
                    appointment = AppointmentOut(
                        id=record[0],
                        customer_name=record[1],
                        customer_phone=record[2],
                        vehicle_make=record[3],
                        vehicle_model=record[4],
                        vehicle_year=record[5],
                        vehicle_color=record[6],
                        notes=record[7],
                        date_of_service=record[8],
                        business_id=record[9],
                    )
                    result.append(appointment)
                return result

    def create(self, appointment: AppointmentIn) -> AppointmentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    insert into appointments
                        (
                        customer_name
                        , customer_phone
                        , vehicle_make
                        , vehicle_model
                        , vehicle_year
                        , vehicle_color
                        , notes
                        , date_of_service
                        , business_id
                        )
                        values (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        returning id
                    """,
                    [
                        appointment.customer_name,
                        appointment.customer_phone,
                        appointment.vehicle_make,
                        appointment.vehicle_model,
                        appointment.vehicle_year,
                        appointment.vehicle_color,
                        appointment.notes,
                        appointment.date_of_service,
                        appointment.business_id,
                    ],
                )
                result = db.execute(
                    """
                    SELECT a.customer_name
                        , a.customer_phone
                        , a.Vehicle_make
                        , a.vehicle_model
                        , a.vehicle_year
                        , a.vehicle_color
                        , a.notes
                        , a.date_of_service
                        , a.business_id
                        FROM services s INNER JOIN appointments a ON a.business_id = s.business_id
                    """,

                )
                id = result.fetchone()[1]
                old_data = appointment.dict()
                return AppointmentOut(id=id, **old_data)
