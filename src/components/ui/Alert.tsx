interface AlertProps {
  message: string;
  type?: "success" | "error";
}

export default function Alert({
  message,
  type = "error",
}: AlertProps) {
  return (
    <div
      className={`br-alert br-alert-${type}`}
    >
      {message}
    </div>
  );
}