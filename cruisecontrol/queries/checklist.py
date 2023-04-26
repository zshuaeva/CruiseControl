from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DuplicateChecklistError(ValueError):
    pass


class ChecklistIn(BaseModel):
  line_item1: Optional[str]
  line_item2: Optional[str]
  line_item3: Optional[str]
  line_item4: Optional[str]
  line_item5: Optional[str]
  line_item6: Optional[str]


class ChecklistOut(ChecklistIn):
    id: int


class ChecklistQueries:
    def create_checklist_item(
        self, checklist: ChecklistIn, business_id: int
    ) -> ChecklistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
          insert into checklist
            (
            checklist_item, service_id
            )
            values(%s, %s)
            returning id
          """,
                    [
                        checklist.checklist_item,
                        checklist.service_id,
                    ],
                )
                id = result.fetchone()[0]
                old_data = checklist.dict()
                return ChecklistOut(id=id, business_id=business_id, **old_data)

    def get_all_for_service(self, service_id: int) -> List[ChecklistOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                    , checklist_item
                    , service_id
                    FROM checklist
                    WHERE service_id = %s
                    """,
                    [service_id],
                )
                results = []
                for record in db:
                    checklist = ChecklistOut(
                        id=record[0],
                        checklist_item=record[1],
                        service_id=record[2],
                    )
                    results.append(checklist.dict())
                return results
