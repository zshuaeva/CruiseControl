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
    hashed_password: str


class AccountQueries:
    # Client SignUp / LogIn
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                from accounts
                where username = %s
                """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=record[0], username=record[1], hashed_password=record[2]
                )

    def create_client(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into accounts 
                        (username, hashed_password, is_client)
                        values (%s, %s, TRUE)
                        returning id
                    """,
                    [
                        account.username,
                        hashed_password,
                    ],
                )
                id = result.fetchone()[0]
                old_data = account.dict()
                old_data["hashed_password"] = hashed_password
                return AccountOutWithPassword(id=id, **old_data)

    # Tech
    def create_technician(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into accounts
                        (username, hashed_password, is_technician)
                        values (%s, %s, TRUE)
                        returning id
                    """,
                    [
                        account.username,
                        hashed_password,
                    ],
                )
                id = result.fetchone()[0]
                old_data = account.dict()
                old_data["hashed_password"] = hashed_password
                return AccountOutWithPassword(id=id, **old_data)
