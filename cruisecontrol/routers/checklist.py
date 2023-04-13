from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import List

from queries.checklist import (
  ChecklistIn,
  ChecklistOut,
  ChecklistQueries,
  DuplicateChecklistError,
)
from queries.accounts import (
  AccountOut
)


class ChecklistForm(BaseModel):
  line_item1: str
  line_item2: str
  line_item3: str
  line_item4: str
  line_item5: str
  line_item6: str

class HttpError(BaseModel):
  detail: str

router = APIRouter()


@router.get("/api/checklist", response_model=List[ChecklistOut])
def get_all_checklist(
  repo: ChecklistQueries = Depends(),
  account_data = Depends(authenticator.get_current_account_data),
):
  business_id = account_data['business_id']
  print("please work---", business_id, repo)
  try:
      return repo.get_all(business_id)
  except ValueError:
      raise HTTPException(
          status_code=status.HTTP_400_BAD_REQUEST,
          detail="Cannot get a checklist with those credentials",
      )

@router.get("/checklist/{checklist_id}", response_model=ChecklistOut)
def get_one_checklist(
  checklist_id: int,
  response: Response,
  repo: ChecklistQueries = Depends(),
  account_data = Depends(authenticator.get_current_account_data)
) -> ChecklistOut:
  business_id = account_data["business_id"]
  checklist = repo.get_one(business_id, checklist_id)
  if checklist is None:
    response.status_code = status.HTTP_404_NOT_FOUND
    return {"detail": "Checklist not found"}
  return checklist


@router.post("/api/checklist", response_model=ChecklistOut | HttpError)
def create_checklist(
  info: ChecklistIn,
  response: Response,
  repo: ChecklistQueries = Depends(),
  account_data = Depends(authenticator.get_current_account_data),
):
  business_id = account_data["business_id"]
  try:
        return repo.create_checklist(info, business_id)
  except DuplicateChecklistError:
        response.status_code = status.HTTP_409_CONFLICT
        return HttpError(detail="Checklist with the same id already exists")
  except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return HttpError(detail=str(e))

@router.put("/checklist/{checklist_id}", response_model=ChecklistOut)
def update_checklist(
  checklist_id: int,
  checklist: ChecklistIn,
  response: Response,
  repo: ChecklistQueries = Depends(),
  account_data=Depends(authenticator.get_current_account_data),
) -> ChecklistOut:
  business_id = account_data["business_id"]
  return repo.update(checklist_id, business_id, checklist)

@router.delete("/api/checklist/{checklist_id}")
def delete_checklist(
  checklist_id: int,
  repo: ChecklistQueries = Depends(),
  account_data = Depends(authenticator.get_current_account_data),
):
  business_id = account_data['business_id']
  try:
    repo.delete(checklist_id, business_id)
  except ValueError:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="No checklist found with the given ID and business ID",
    )
  return {"message": "Checklist deleted successfully"}
