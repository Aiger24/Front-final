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

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    
    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña");
      return;
    }

    // Aquí iría la llamada real a la API / autenticación
    console.log("Login attempt:", { username });
    alert(`Intentando iniciar sesión como ${username}`);
  };

  return [
    { username, password, showPassword, error },
    { setUsername, setPassword, togglePassword, handleSubmit }
  ];
}