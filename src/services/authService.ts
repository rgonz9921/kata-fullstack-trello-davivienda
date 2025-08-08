export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("http://localhost:8080/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.message || "Credenciales inválidas")
  }

  const data = await res.json()
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }
}
