# from fastapi.testclient import TestClient
# from main import app
# from queries.appointments import AppointmentQueries
# from authenticator import authenticator


# client = TestClient(app)

# test_user = {
#     "id": 1,
#     "username": "josh",
#     "business_id": 1,
#     "employee_id": 0,
#     "first_name": "string",
#     "last_name": "string",
#     "website": "string",
#     "email": "string",
#     "address": "string",
#     "phone_number": "string",
#     "is_client": "true",
#     "is_technician": "false",
# }


# test_appointments = [
#   {
#     "customer_name": "Josh",
#     "customer_phone": 1234567890,
#     "vehicle_make": "Toyota",
#     "vehicle_model": "Prius",
#     "vehicle_year": 2020,
#     "vehicle_color": "White",
#     "notes": "Hybrid Battery Replacement",
#     "date_of_service": "2022-05-01",
#     "business_id": 1,
#     "is_approved": True,
#     "service_id": 1
#   },
#   {
#     "customer_name": "Stryker",
#     "customer_phone": 1234567890,
#     "vehicle_make": "Toyota",
#     "vehicle_model": "MR2",
#     "vehicle_year": 2018,
#     "vehicle_color": "Purple",
#     "notes": "Install Radials",
#     "date_of_service": "2022-06-01",
#     "business_id": 1,
#     "is_approved": "",
#     "service_id": 2
#   }
# ]

# expected_appointments = [
#   {
#     "id": 1,
#     "customer_name": "Josh",
#     "customer_phone": 1234567890,
#     "vehicle_make": "Toyota",
#     "vehicle_model": "Prius",
#     "vehicle_year": 2020,
#     "vehicle_color": "White",
#     "notes": "Hybrid Battery Replacement",
#     "date_of_service": "2022-05-01",
#     "business_id": 1,
#     "is_approved": False,
#     "service_id": 1,
#     "service_name": "Battery"
#   },
#   {
#     "id": 2,
#     "customer_name": "Stryker",
#     "customer_phone": 1234567890,
#     "vehicle_make": "Toyota",
#     "vehicle_model": "MR2",
#     "vehicle_year": 2018,
#     "vehicle_color": "Purple",
#     "notes": "Install Radials",
#     "date_of_service": "2022-06-01",
#     "business_id": 1,
#     "is_approved": "",
#     "service_id": 2,
#     "service_name": "Tires"
#   }
# ]


# def user_override():
#     return test_user

# app.dependency_overrides[authenticator.get_current_account_data] = user_override

# class TestAppointmentQueries(AppointmentQueries):
#     def get_all(self, appointment, business_id):
#         return expected_appointments

# def test_appointment_queries():
#     test = TestAppointmentQueries()
#     return test


# app.dependency_overrides[AppointmentQueries] = test_appointment_queries
# app.dependency_overrides[authenticator.get_current_account_data] = user_override


# def test_get_all_appointments():
#     app.dependency_overrides[AppointmentQueries] = test_appointment_queries
#     app.dependency_overrides[authenticator.get_current_account_data] = user_override
#     response = client.get("/api/appointments")

#     assert response.status_code == 200
#     assert response.json() == expected_appointments


# app.dependency_overrides = {}
