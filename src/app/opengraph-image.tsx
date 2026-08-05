import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mrugesh Shukla — Mrugesh Beats, Live Musician";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf3e3",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(184,134,11,0.22), transparent 60%)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            color: "#8b1e3f",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Mrugesh Beats
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            color: "#241a15",
            letterSpacing: 2,
          }}
        >
          MRUGESH SHUKLA
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#7a6a5d",
            marginTop: 20,
          }}
        >
          Live Musician · Nadiad, Gujarat
        </div>
      </div>
    ),
    { ...size }
  );
}
