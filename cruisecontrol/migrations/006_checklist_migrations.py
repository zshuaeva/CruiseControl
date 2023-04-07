steps = [
  [
    """
    CREATE TABLE checklist (
      id SERIAL PRIMARY KEY NOT NULL,
      line_item1 VARCHAR(50) NULL,
      line_item2 VARCHAR(50) NULL,
      line_item3 VARCHAR(50) NULL,
      line_item4 VARCHAR(50) NULL,
      line_item5 VARCHAR(50) NULL,
      line_item6 VARCHAR(50) NULL,
      business_id INT NOT NULL,
      service_id INT NOT NULL,
      FOREIGN KEY (business_id) REFERENCES businesses (id),
      FOREIGN KEY (service_id) REFERENCES services (id)
    );
    """,
    """
    DROP TABLE checklist;
    """,
  ]
]
