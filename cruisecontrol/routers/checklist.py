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
  lineitem1: str
  lineitem2: str
  lineitem3: str
  lineitem4: str
  lineitem5: str
  lineitem6: str

class HttpError(BaseModel):
  detail: str

router = APIRouter()


@router.get("/api/checklist", response_model=List[ChecklistOut])
def get_checklist(
  repo: ChecklistQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ChecklistOut:
    business_id = account_data["business_id"]
    try:
        return repo.get_all(business_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an checklist with those credentials",
        )

@router.post("/api/checklist", response_model=ChecklistOut | HttpError)
def create_checklist(
  info: ChecklistIn,
  response: Response,
  repo: ChecklistQueries = Depends(),
  account_data = Depends(authenticator.get_current_account_data),
):
  business_id = account_data["business_id"]
  print("****", business_id)

  try:
        return repo.create_checklist(info, business_id)
  except DuplicateChecklistError:
        response.status_code = status.HTTP_409_CONFLICT
        return HttpError(detail="Checklist with the same id already exists")
