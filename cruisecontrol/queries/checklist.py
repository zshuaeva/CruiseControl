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


class ChecklistOut(BaseModel):
  id: int
  line_item1: Optional[str]
  line_item2: Optional[str]
  line_item3: Optional[str]
  line_item4: Optional[str]
  line_item5: Optional[str]
  line_item6: Optional[str]
  business_id: int
class ChecklistQueries:
  def create_checklist(
    self, checklist: ChecklistIn, business_id: int) -> ChecklistOut:
    with pool.connection() as conn:
      with conn.cursor() as db:
        result = db.execute(
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
            )
            values(%s, %s, %s, %s, %s, %s, %s)
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
          ],
        )
        id = result.fetchone()[0]
        old_data = checklist.dict()
        return ChecklistOut(id=id, business_id=business_id, **old_data)

  def get_all(self, business_id: int) -> List[ChecklistOut]:
      with pool.connection() as conn:
        with conn.cursor() as db:
          results = db.execute(
              """
              select id, line_item1, line_item2, line_item3, line_item4, line_item5, line_item6, business_id
              from checklist
              where business_id = %s
              """,
              (business_id,)
          )
          results = []
          for record in db:
            checklist = ChecklistOut(
              id=record[0],
              line_item1=record[1],
              line_item2=record[2],
              line_item3=record[3],
              line_item4=record[4],
              line_item5=record[5],
              line_item6=record[6],
              business_id=record[7],
            )
            results.append(checklist)
            print("XXXXX", results)
          return results

  def get_one(self, business_id: int, checklist_id: int) -> Optional[ChecklistOut]:
      with pool.connection() as conn:
          with conn.cursor() as db:
              db.execute(
                  """
                  select *
                  from checklist
                  where business_id = %s and id = %s
                  """,
                  [business_id, checklist_id],
              )
              result = db.fetchone()

              if result is None:
                  return None

              checklist = ChecklistOut(
                  id=result[0],
                  business_id=result[1],
                  line_item1=result[2],
                  line_item2=result[3],
                  line_item3=result[4],
                  line_item4=result[5],
                  line_item5=result[6],
                  line_item6=result[7],
              )

              return checklist




  def update(self, checklist_id: int, business_id: int, checklist: ChecklistIn) -> ChecklistOut:
      with pool.connection() as conn:
        with conn.cursor() as db:
          db.execute(
            """
            update checklist
            set line_item1 = %s,
                line_item2 = %s,
                line_item3 = %s,
                line_item4 = %s,
                line_item5 = %s,
                line_item6 = %s
            where id = %s and business_id = %s
            """,
            [
              checklist.line_item1,
              checklist.line_item2,
              checklist.line_item3,
              checklist.line_item4,
              checklist.line_item5,
              checklist.line_item6,
              checklist_id,
              business_id,
            ],
          )
          old_data = checklist.dict()
          return ChecklistOut(id=checklist_id, business_id=business_id, **old_data)


  def delete(self, checklist_id: int, business_id: int):
    with pool.connection() as conn:
      with conn.cursor() as db:
        db.execute(
          """
          DELETE FROM checklist
          WHERE id = %s AND business_id = %s
          """,
          (checklist_id, business_id),
        )
        if db.rowcount == 0:
          raise ValueError("No checklist found with the given ID and business ID")
