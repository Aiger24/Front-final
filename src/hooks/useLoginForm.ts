import { useState } from "react";

interface LoginFormState {
  username: string;
  password: string;
  showPassword: boolean;
  error: string | null;
}

interface LoginFormActions {
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  togglePassword: () => void;
  handleSubmit: (e?: React.FormEvent) => void;
}

export function useLoginForm(): [LoginFormState, LoginFormActions] {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña");
      return;
    }

    const payload = { identifier: username, password };

    try {
      const res = await fetch("https://localhost:7112/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login exitoso:", data);
        // Ejemplo: guardar userId en localStorage
        localStorage.setItem("userId", data.userId);
        alert("Inicio de sesión correcto");
      } else {
        setError(data.message || "Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return [
    { username, password, showPassword, error },
    { setUsername, setPassword, togglePassword, handleSubmit }
  ];
}
