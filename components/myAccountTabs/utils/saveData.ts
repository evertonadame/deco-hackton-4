interface SaveDataProps<Data> {
  url?: string;
  data: Data;
}

// Fake requests while we don't have a backend.
export const saveData = async <Data>({
  url = "/fake-api/save-user-data",
  data,
}: SaveDataProps<Data>) => {
  try {
    // Fake POST request to save data.
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
  }

  // fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
