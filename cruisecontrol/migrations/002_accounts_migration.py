steps = [
    [
        """
        create table accounts (
        id UUID PRIMARY KEY NOT NULL, 
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        )
        """,
        """
        DROP TABLE accounts;
        """,
    ]
]
