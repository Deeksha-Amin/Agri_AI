const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export const downloadPdfReport = async (reportData) => {
  const response = await fetch(API_BASE_URL + "/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reportData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to download PDF report from server.");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  
  const diseaseTitle = (reportData.final_diagnosis || reportData.disease || "Analysis").replace(/ /g, "_");
  a.download = "Tomato_Disease_Report_" + diseaseTitle + ".pdf";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

