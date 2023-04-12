steps = [
    [
        """
        CREATE TABLE appointments (
            id SERIAL PRIMARY KEY NOT NULL,
            customer_name CHAR(50) NOT NULL,
            customer_phone INTEGER NOT NULL,
            vehicle_make CHAR(50),
            vehicle_model CHAR(50),
            vehicle_year INTEGER,
            vehicle_color CHAR(50),
            notes TEXT,
            date_of_service DATE,
            business_id INTEGER NOT NULL
        );
        """,
        """
        DROP TABLE appointments;
        """,
    ]
]
