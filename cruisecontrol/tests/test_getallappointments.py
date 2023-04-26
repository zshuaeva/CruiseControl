from fastapi.testclient import TestClient
from main import app
from queries.appointments import AppointmentQueries, AppointmentOut
from authenticator import authenticator
from typing import List
from datetime import date

client = TestClient(app)

def test_get_all_appointments():
    appointments = [
        AppointmentOut(id=1, business_id=1, customer_name="Josh", customer_phone=1234567890, vehicle_make="Toyota", vehicle_model="Prius", vehicle_year=2020, vehicle_color="White", notes="Hybrid Battery Replacement", date_of_service=date(2023, 11, 4), is_approved=True, service_id=1, service_name="Hybrid Battery"),
        AppointmentOut(id=2, business_id=1, customer_name="Stryker", customer_phone=1234567890, vehicle_make="Toyota", vehicle_model="MR2", vehicle_year=2018, vehicle_color="Purple", notes="Install Radials", date_of_service=date(2023, 1, 2), is_approved=False, service_id=2, service_name="Tire Rotation"),
    ]


    class GetAllAppointmentQueries:
        def get_all(self, repo, business_id):
            return appointments

    app.dependency_overrides[AppointmentQueries] = AppointmentQueries
    app.dependency_overrides[authenticator.get_current_account_data] = lambda: {"business_id": 1}

    response = client.get("/api/appointments")

    assert response.status_code == 200

    assert response.json() == appointments

    app.dependency_overrides = {}
