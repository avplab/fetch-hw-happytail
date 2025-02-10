import { useNavigate } from 'react-router'
import { ApiError } from "../api/http";

export default function useApiErrorHandlers() {
  const navigate = useNavigate()

  const redirectToLogin = (error: Error) => {
    if (error instanceof ApiError && error.response.status === 401) {
      navigate('/login')
    }
  }

  return {
    redirectToLogin,
  }
}