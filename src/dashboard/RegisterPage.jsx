import { useState } from "react";

// Mock axios for demo
const axios = {
  post: async (url, data) => {
    console.log("API Call:", url, data);
    return { data: "REGISTER_SUCCESS" };
  }
};

export default function RegisterPage() {
  const navigate = (path) => console.log("Navigate to:", path);

  const [role, setRole] = useState("PATIENT");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleRegister = async () => {
    try {
      let url = "";
      let payload = {};

      if (role === "PATIENT") {
        url = "http://localhost:8080/api/register/patient";
        payload = {
          username,
          password,
          age,
          disease,
        };
      } else {
        url = "http://localhost:8080/api/register/doctor";
        payload = {
          username,
          password,
          specialization,
        };
      }

      const res = await axios.post(url, payload);

      if (res.data === "REGISTER_SUCCESS" || res.data.includes("success")) {
        alert("Registration successful");
        navigate("/login");
      }

    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Username already exists");
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-16 flex flex-col justify-center text-white">
        <div className="mb-16">
          <div className="text-7xl mb-6">🏥</div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">HealthCare Portal</h1>
          <p className="text-xl opacity-95">Your trusted medical companion</p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-5 items-start">
            <div className="w-11 h-11 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl flex-shrink-0">✓</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Secure Registration</h3>
              <p className="opacity-90 leading-relaxed">Your data is protected with industry-standard encryption</p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="w-11 h-11 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl flex-shrink-0">✓</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="opacity-90 leading-relaxed">Connect with certified healthcare professionals</p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="w-11 h-11 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl flex-shrink-0">✓</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="opacity-90 leading-relaxed">Round-the-clock assistance for your health needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-600">Join our healthcare platform today</p>
          </div>

          {/* ROLE SELECT */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole("PATIENT")}
                className={`py-4 px-4 rounded-xl font-semibold transition-all ${
                  role === "PATIENT"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                👤 Patient
              </button>
              <button
                onClick={() => setRole("DOCTOR")}
                className={`py-4 px-4 rounded-xl font-semibold transition-all ${
                  role === "DOCTOR"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                👨‍⚕️ Doctor
              </button>
            </div>
          </div>

          {/* COMMON FIELDS */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
              />
            </div>

            {/* PATIENT FIELDS */}
            {role === "PATIENT" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                  <input
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Medical Condition</label>
                  <input
                    placeholder="Describe your condition"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                  />
                </div>
              </>
            )}

            {/* DOCTOR FIELDS */}
            {role === "DOCTOR" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Specialization</label>
                <input
                  placeholder="e.g., Cardiology, Neurology"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleRegister}
            className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all shadow-lg"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            By registering, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}