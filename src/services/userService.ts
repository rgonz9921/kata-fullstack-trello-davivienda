export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export async function createUser(payload: RegisterPayload) {
  const response = await fetch("http://localhost:8080/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Error al registrar usuario")
  }

  return await response.json()
}
