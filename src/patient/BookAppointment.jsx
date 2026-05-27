import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../components/Toast";
import "./BookAppointment.css";

const API_BASE = "http://localhost:8080/api/patient/dashboard";

/* ================= AUTO-GENERATE 24H HOURLY SLOTS ================= */
const generateSlots = () => {
  const slots = [];

  for (let hour = 0; hour < 24; hour++) {
    const h = String(hour).padStart(2, "0");

    slots.push({
      label: `${h}:00`,
      enum: `SLOT_${h}_00`,
    });
  }

  return slots;
};

const ALL_SLOTS = generateSlots();

const BookAppointment = () => {
  const toast = useToast();
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [disease, setDisease] = useState("");
  const [date, setDate] = useState("");

  const [bookedSlots, setBookedSlots] = useState([]); // ENUM list
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    }
  };

  /* ================= LOAD BOOKED SLOTS ================= */
  useEffect(() => {
    if (doctorId && date) {
      fetchBookedSlots();
    }
  }, [doctorId, date]);

  const fetchBookedSlots = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/appointments/available-slots",
        {
          params: { doctorId, date },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookedSlots(res.data); // ["SLOT_09_00", "SLOT_21_00"]
    } catch (err) {
      console.error("Failed to load slots", err);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId || !disease || !date || !selectedSlot) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/appointments",
        {
          doctorId,
          disease,
          date,
          timeSlot: selectedSlot.enum, // ✅ VALID ENUM
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Appointment booked successfully! Awaiting doctor approval.");

      // reset
      setDoctorId("");
      setDisease("");
      setDate("");
      setSelectedSlot(null);
      setBookedSlots([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="book-wrapper">
      <form className="book-card" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        {/* DOCTOR */}
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Disease"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />

        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* ================= TIME SLOTS ================= */}
        {doctorId && date && (
          <div className="slot-section">
            <h4>Select Time Slot</h4>

            <div className="slot-grid">
              {ALL_SLOTS.map((slot) => {
                const booked = bookedSlots.includes(slot.enum);
                const selected = selectedSlot?.enum === slot.enum;

                return (
                  <button
                    type="button"
                    key={slot.enum}
                    className={`slot-btn 
                      ${booked ? "booked" : ""}
                      ${selected ? "selected" : ""}
                    `}
                    disabled={booked}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookAppointment;
