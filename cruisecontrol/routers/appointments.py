from fastapi import APIRouter, Depends, Response
from queries.appointments import AppointmentIn, AppointmentOut, AppointmentQueries
from typing import List
from authenticator import authenticator


router = APIRouter()


@router.get("/api/Appointments", response_model=List[AppointmentOut])
def get_all_Appointments(
    repo: AppointmentQueries = Depends(),
    account_data = Depends(authenticator.get_current_account_data)
):
    business_id = account_data['business_id']
    return repo.get_all(repo, business_id)

@router.post("/api/Appointments", response_model=AppointmentOut)
def create_Appointment(
    info: AppointmentIn,
    response: Response,
    repo: AppointmentQueries = Depends(),
):
    return repo.create(info)
