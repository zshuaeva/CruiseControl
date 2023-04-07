from pydantic import BaseModel
from queries.pool import pool
from datetime import date, time
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
  business_id: int
  service_id: int

class ChecklistOut(BaseModel):
  id: str
  line_item1: Optional[str]
  line_item2: Optional[str]
  line_item3: Optional[str]
  line_item4: Optional[str]
  line_item5: Optional[str]
  line_item6: Optional[str]
  business_id: int
  service_id: int

class ChecklistQueries:
  def create_checklist(
    self, checklist: ChecklistIn
  ) -> ChecklistOut:
    with pool.connection() as conn:
      with conn.cursor() as db:
        db.execute(
          """
          insert into checklist
            (
            line_item1
            , line_item2
            , line_item3
            , line_item4
            , line_item5
            , line_item6
            , business_id
            , service_id
          )
          values(%s, %s, %s, %s, %s, %s, %s, %s)
          returning id
          """,
          [
            checklist.line_item1,
            checklist.line_item2,
            checklist.line_item3,
            checklist.line_item4,
            checklist.line_item5,
            checklist.line_item6,
            business_id,
            service_id,
          ],
        )
        id = result.fetchone()[0]
        old_data = checklist.dict()
        return ChecklistOut(id=id, **old_data)

  def get_all(self, buiness_id: int ) -> List[ChecklistOut]:
    with pool.connection() as conn:
      with conn.cursor() as db:
        results = db.execute(
          """
        select id
            , line_item1
            , line_item2
            , line_item3
            , line_item4
            , line_item5
            , line_item6
        from checklist
        where business_id = %s
        """,
          [buiness_id],
        )
        results = []
        for record in db:
          Checklist = ChecklistOut(
            id=record[0],
            line_item1=record[1],
            line_item2=record[2],
            line_item3=record[3],
            line_item4=record[4],
            line_item5=record[5],
            line_item6=record[6],
          )
          results.append(Checklist)
        return results
