steps = [
    [
        """
        CREATE table accounts (
        id SERIAL PRIMARY KEY NOT NULL, 
        username VARCHAR(30) NOT NULL UNIQUE,
        hashed_password TEXT NOT NULL,
        employee_id INT NULL, 
        first_name VARCHAR(30) NULL,
        last_name VARCHAR(30) NULL,
        website TEXT,
        email TEXT NULL,
        address TEXT NULL,
        phone_number VARCHAR NULL,
        is_client BOOLEAN NULL,
        is_technician BOOLEAN NULL
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ]
]
