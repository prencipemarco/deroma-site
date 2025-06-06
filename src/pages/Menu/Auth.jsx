import { useState } from "react";
import { Link } from "react-router-dom";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setForm({ email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        alert("Le password non coincidono!");
        return;
      }
      alert(`Registrazione con email: ${form.email}`);
    } else {
      alert(`Login con email: ${form.email}`);
    }
  };

  const handleGoogle = () => {
    alert("Login/Registrazione con Google non implementato ancora.");
  };

  const handleApple = () => {
    alert("Login/Registrazione con Apple non implementato ancora.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 p-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-yellow-500 hover:text-yellow-300 text-3xl font-bold"
      >
        <img src="/icons/arrow.png" alt="Torna" className="w-6 h-6" />
      </Link>
      <div className="max-w-md w-full bg-yellow-100 p-8 rounded-lg shadow">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">
          {isRegister ? "Registrati" : "Accedi"}
        </h2>

        <div className="flex flex-col space-y-3 mb-6">
          <button onClick={handleGoogle} className="btn-yellow flex items-center justify-center space-x-2">
            <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
            <span>{isRegister ? "Registrati con Google" : "Accedi con Google"}</span>
          </button>

          <button onClick={handleApple} className="btn-yellow flex items-center justify-center space-x-2">
            <img src="/icons/apple.png" alt="Apple" className="w-5 h-5" />
            <span>{isRegister ? "Registrati con Apple" : "Accedi con Apple"}</span>
          </button>
        </div>

        {/* Linea divisoria */}
        <hr className="my-6 border-t border-gray-300" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Conferma Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          )}
          <button type="submit" className="btn-yellow w-full">
            {isRegister ? "Registrati" : "Accedi"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? "Hai già un account?" : "Non hai un account?"}{" "}
          <button onClick={toggleMode} className="ml-6 text-black font-semibold underline">
            {isRegister ? "Accedi" : "Registrati"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
