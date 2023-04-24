from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DummyIn(BaseModel):
    required_limited_text: str
    required_unlimited_text: str


class DummyOut(BaseModel):
    id: int
    required_limited_text: str
    required_unlimited_text: str


class DummyRepository:
    def get_all(self) -> List[DummyOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                    , required_limited_text
                    , required_unlimited_text
                    from dummy
                    """
                )
                result = []
                for record in db:
                    dummy = DummyOut(
                        id=record[0],
                        required_limited_text=record[1],
                        required_unlimited_text=record[2],
                    )
                    result.append(dummy)
                return result

    def create(self, dummy: DummyIn) -> DummyOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into dummy
                        (required_limited_text, required_unlimited_text)
                        values (%s, %s)
                        returning id
                    """,
                    [
                        dummy.required_limited_text,
                        dummy.required_unlimited_text,
                    ],
                )
                id = result.fetchone()[0]
                old_data = dummy.dict()
                return DummyOut(id=id, **old_data)

    def get_one(self, dummy_id: int) -> Optional[DummyOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                        ,required_limited_text
                        ,required_unlimited_text
                    from dummy
                    where id = %s
                    """,
                    [dummy_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return DummyOut(
                    id=record[0],
                    required_limited_text=record[1],
                    required_unlimited_text=record[2],
                )

    def update(self, dummy_id: int, dummy: DummyIn) -> DummyOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    update dummy
                    set required_limited_text = %s
                        , required_unlimited_text = %s
                    where id = %s
                    """,
                    [
                        dummy.required_limited_text,
                        dummy.required_unlimited_text,
                        dummy_id,
                    ],
                )
                old_data = dummy.dict()
                return DummyOut(id=dummy_id, **old_data)

    def delete(self, dummy_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    delete from dummy
                    where id = %s
                    """,
                    [dummy_id],
                )
                return True
