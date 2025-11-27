function Record() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Registrado correctamente ✅");
  };

  return (
    <section className="Record">
      <h2>Contacto</h2>
      <form className="reccord-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Tu nombre" required />
        <input type="email" placeholder="Tu correo" required />
        <textarea placeholder="Escribe tu mensaje..." required></textarea>
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Record ;
