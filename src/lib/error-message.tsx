
export const getErrorMessage = (error: unknown): string => {
  let message: string = "Something went wrong"

  if (error instanceof TypeError) {
    message = "API server could be down. Please contact the IT Administrator"
    return message
  }
  else if (error instanceof Error) {
    message = error.message
    return message
  }
  else {
    return message
  }
}