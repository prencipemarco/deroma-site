import { useState } from "react";
import { supabase } from "../../backend/supabase"; // assicurati che il path sia corretto
import { Link, useNavigate } from "react-router-dom";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setForm({ email: "", password: "", confirmPassword: "" });
    setError(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        setError("Le password non coincidono!");
        return;
      }

      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      setLoading(false);

      if (error) {
        setError(error.message);
      } else {
        alert("Registrazione effettuata! Controlla la tua email per confermare.");
        setIsRegister(false);
        setForm({ email: "", password: "", confirmPassword: "" });
      }
    } else {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      setLoading(false);

      if (error) {
        setError(error.message);
      } else {
        alert("Accesso effettuato!");
        // Reindirizza o aggiorna lo stato dell'app
        navigate("/"); // esempio di redirect alla home
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      <div className="max-w-md w-full bg-yellow-100 p-8 rounded-lg shadow">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">
          {isRegister ? "Registrati" : "Accedi"}
        </h2>

        {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-gold"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="input-gold"
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Conferma Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="input-gold"
            />
          )}
          <button type="submit" disabled={loading} className="btn-yellow w-full">
            {loading ? "Caricamento..." : isRegister ? "Registrati" : "Accedi"}
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
