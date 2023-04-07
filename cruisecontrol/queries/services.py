from pydantic import BaseModel
from queries.pool import pool
from datetime import date, time
from typing import List, Optional

class ServiceIn(BaseModel):
    service_name: str
    service_type: str
    service_description: str
    service_price: int



class ServiceOut(BaseModel):
    id: int
    service_name: str
    service_type: str
    service_description: str
    service_price: float
    business_id: int


class ServiceQueries:
    def get_all_services(self, business_id) -> List[ServiceOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                    , service_name
                    , service_type
                    , service_description
                    , service_price
                    """,
                    [business_id],
                )
                result = []
                for record in db:
                    service = ServiceOut(
                        id=record[0],
                        service_name=record[1],
                        service_type=record[2],
                        service_description=record[3],
                        service_price=record[4],
                        business_id=record[5],
                    )
                    result.append(service)
                    return result

    def create(self, service: ServiceIn, business_id: int) -> ServiceOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into services
                        (
                        service_name
                        , service_type
                        , service_description
                        , service_price
                        , business_id
                        )
                        values (%s, %s, %s, %s, %s)
                        returning id
                    """,


                    [
                        service.service_name,
                        service.service_type,
                        service.service_description,
                        service.service_price,
                        business_id,
                    ],
                )
                id = result.fetchone()[0]
                old_data = service.dict()
                return ServiceOut(id=id, business_id=business_id, **old_data)
