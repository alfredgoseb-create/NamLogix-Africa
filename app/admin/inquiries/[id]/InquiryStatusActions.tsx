"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  inquiryId: string;
};

export default function InquiryStatusActions({ inquiryId }: Props) {
  const router = useRouter();

  async function updateStatus(status: string) {
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", inquiryId);

    if (error) {
      alert("Failed to update inquiry: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div style={buttonRowStyle}>
      <button onClick={() => updateStatus("new")} style={blueButtonStyle}>
        Mark New
      </button>

      <button onClick={() => updateStatus("reviewed")} style={orangeButtonStyle}>
        Mark Reviewed
      </button>

      <button onClick={() => updateStatus("closed")} style={greenButtonStyle}>
        Close Inquiry
      </button>
    </div>
  );
}

const buttonRowStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  marginTop: 18,
};

const blueButtonStyle = {
  background: "#1d4ed8",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  cursor: "pointer",
};

const orangeButtonStyle = {
  ...blueButtonStyle,
  background: "#f97316",
};

const greenButtonStyle = {
  ...blueButtonStyle,
  background: "#16a34a",
};