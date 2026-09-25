const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export const predictLeafImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(API_BASE_URL + "/predict/leaf", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Leaf prediction failed with status " + response.status);
  }

  return response.json();
};

export const predictFruitImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(API_BASE_URL + "/predict/fruit", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Fruit prediction failed with status " + response.status);
  }

  return response.json();
};

export const predictStemImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(API_BASE_URL + "/predict/stem", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Stem prediction failed with status " + response.status);
  }

  return response.json();
};

export const performFusion = async (predictionsData) => {
  const response = await fetch(API_BASE_URL + "/fusion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(predictionsData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Decision fusion failed");
  }

  return response.json();
};

export const submitContactForm = async (contactData) => {
  const response = await fetch(API_BASE_URL + "/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to submit contact form");
  }

  return response.json();
};

export const checkHealth = async () => {
  const response = await fetch(API_BASE_URL + "/health");
  return response.json();
};

