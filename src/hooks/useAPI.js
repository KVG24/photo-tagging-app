const API_URL = import.meta.env.VITE_API_URL;

export default function useAPI() {
    const createRecord = async (recordData) => {
        try {
            const response = await fetch(`${API_URL}/leaderboard/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recordData),
            });

            if (!response.ok) throw new Error("Failed to create record");
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return {
        createRecord,
    };
}
