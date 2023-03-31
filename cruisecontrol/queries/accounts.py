from pydantic import BaseModel
from queries.pool import pool
from datetime import date, time
from typing import List, Optional


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithPassword(AccountOut):
    # hashed_password: str
    plain_password: str


class AccountQueries:
    def get(self):
        pass
        # with pool.connection() as conn:
        #   with conn.cursor() as db:
        # more code here

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into accounts 
                        (username, password)
                        values (%s, %s)
                        returning id
                    """,
                    [
                        account.username,
                        account.password,
                    ],
                )
                id = result.fetchone()[0]
                old_data = account.dict()
                return AccountOutWithPassword(id=id, **old_data)
