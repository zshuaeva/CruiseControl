from fastapi import APIRouter, Depends, Response
from queries.querytest import DummyIn, DummyOut, DummyRepository
from typing import List, Optional

# from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

# from querytest.py import

router = APIRouter()


@router.get("/test", response_model=List[DummyOut])
def get_all(
    repo: DummyRepository = Depends(),
):
    return repo.get_all()


@router.post("/test", response_model=DummyOut)
def create_dummy(
    dummy: DummyIn, response: Response, repo: DummyRepository = Depends()
):
    return repo.create(dummy)


@router.get("/test/{dummy_id}", response_model=Optional[DummyOut])
def get_one(
    dummy_id: int,
    response: Response,
    repo: DummyRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> DummyOut:
    dummy = repo.get_one(dummy_id)
    if dummy is None:
        response.status_code = 404
    return dummy


@router.put("/test/{dummy_id}", response_model=Optional[DummyOut])
def update_dummy(
    dummy_id: int,
    dummy: DummyIn,
    response: Response,
    repo: DummyRepository = Depends(),
) -> DummyOut:
    return repo.update(dummy_id, dummy)


@router.delete("/test/{dummy_id}", response_model=bool)
def delete_dummy(
    dummy_id: int,
    repo: DummyRepository = Depends(),
) -> bool:
    return repo.delete(dummy_id)
