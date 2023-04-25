import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import './CalendarComponent.css';



const CalendarComponent = () => {
    const { token } = useContext(AuthContext);
    const user = useUser(token);

    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());

    const getAppointments = async () => {
        const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments`;
        const response = await fetch(listUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            const pendingAppointments = data.filter(
                (appointment) => appointment.is_approved
            );
            setAppointments(pendingAppointments);
        }
    };

    useEffect(() => {
        if (token) {
            getAppointments();
        }
    }, [token]);

    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return null;

        const isToday = new Date().toDateString() === date.toDateString();
        const hasAppointment = appointments.some((appointment) => {
            const appointmentDate = new Date(appointment.date_of_service + 'T00:00:00');
            return appointmentDate.toDateString() === date.toDateString();
        });

        if (isToday) return 'today';
        if (hasAppointment) return 'appointment';
    };

    return (
        <Container>
            <Row>
                <Card>
                    <Card.Body>
                        <h1 className="text-center">
                            Approved Appointments</h1>
                        <Calendar
                            value={date}
                            tileDisabled={() => true}
                            onChange={setDate}
                            tileClassName={tileClassName}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default CalendarComponent;
