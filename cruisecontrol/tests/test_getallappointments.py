from fastapi.testclient import TestClient
from main import app
from queries.appointments import AppointmentQueries, AppointmentOut
from authenticator import authenticator
from typing import List
from datetime import date

client = TestClient(app)


test_appointments = [
    {
        "id": 1,
        "business_id": 1,
        "customer_name": "Josh",
        "customer_phone": 1234567890,
        "vehicle_make": "Toyota",
        "vehicle_model": "Prius",
        "vehicle_year": 2020,
        "vehicle_color": "White",
        "notes": "Hybrid Battery Replacement",
        "is_approved": True,
        "service_id": 1,
        "service_name": "Hybrid Battery",
    },
    {
        "id": 1,
        "customer_name": "Stryker",
        "customer_phone": 1234567890,
        "vehicle_make": "Toyota",
        "vehicle_model": "MR2",
        "vehicle_year": 2018,
        "vehicle_color": "Purple",
        "notes": "Install Radials",
        "is_approved": False,
        "service_id": 2,
        "service_name": "Tire Rotation",
    },
]


def user_override():
    return test_appointments

    class MockAppointmentQueries:
        def get_all(self, repo, business_id):
            return appointments

    def get_mock_appointment_queries():
        return MockAppointmentQueries()

    def get_mock_current_account_data():
        return {"business_id": 1}

    app.dependency_overrides[AppointmentQueries] = get_mock_appointment_queries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = user_override

    response = client.get("/api/appointments")

    assert response.status_code == 200
    assert response.json() == appointments

    app.dependency_overrides = {}
