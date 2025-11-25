# Enlace Qroo Frontend (Vite + React + TS)

Este proyecto usa Vite para servir el frontend y expone un único punto de integración con la IA a través de un endpoint configurable (`/api/chat` por defecto). El backend (Azure Functions, App Service, etc.) solo necesita implementar ese endpoint y devolver un JSON con la respuesta generada por Azure OpenAI.

## Variables de entorno

Crea un archivo `.env` (o `.env.local`) en la raíz y define las siguientes variables según tu despliegue:

```
VITE_CHAT_ENDPOINT=/api/chat          # Ruta pública que expone el backend
VITE_CHAT_API_KEY=                    # Opcional: clave para enviar en el header x-functions-key
VITE_AZURE_OPENAI_DEPLOYMENT=         # Opcional: nombre del deployment para logging o routing
```

Si no defines `VITE_CHAT_ENDPOINT`, el cliente usará `/api/chat` automáticamente, lo que funciona bien cuando montas una Azure Function o proxy en la misma URL del sitio.

### Contrato esperado del backend

- **Request**: `POST VITE_CHAT_ENDPOINT`
- **Body**: `{ "message": "texto del usuario" }`
- **Response**: `{ "answer": "texto que debe mostrarse en el chat" }`

El archivo `src/services/chatClient.ts` ya gestiona los headers comunes y lanza errores descriptivos si el backend responde con un estado diferente de 2xx.

## Flujo para desarrollar

1. Instala dependencias: `npm install`.
2. Configura tu `.env` con el endpoint real (por ejemplo, la URL de tu Azure Function).
3. Ejecuta `npm run dev` para correr Vite.
4. Desde el backend, asegúrate de recibir `{ message }` y devolver `{ answer }`. No es necesario modificar el frontend para cambiar el modelo de IA.

## Notas

- Puedes ampliar `chatClient` para soportar audio (ej. `audioUrl`) cuando el backend lo exponga.
- Si usas Azure API Management o Front Door, solo asegúrate de que la ruta configurada en `VITE_CHAT_ENDPOINT` esté expuesta y maneje CORS según corresponda.
