"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ padding: "24px" }}>
      <h1>เกิดข้อผิดพลาด</h1>

      <p>{error.message}</p>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "16px",
          padding: "8px 16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        ลองอีกครั้ง
      </button>
    </main>
  );
}