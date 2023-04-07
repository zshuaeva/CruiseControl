from fastapi import APIRouter, Depends, Response 
from queries.services import ServiceIn, ServiceOut, ServiceQueries
from typing import List
from authenticator import authenticator


router = APIRouter()

@router.post("/api/services", response_model=ServiceOut)
def create_service(
    info: ServiceIn,
    response: Response,
    repo: ServiceQueries = Depends(),
    account_data = Depends(authenticator.get_current_account_data)
):
    business_id = account_data['business_id']
    print('************', business_id)
    return repo.create(business_id, info)


