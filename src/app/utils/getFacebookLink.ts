import { z } from "zod";

const FacebookPageResponseSchema = z.object({
  id: z.string(), // Ensures `id` is a valid string
});

export const getFacebookPageId = async (pageUrl: string) => {
  const apiUrl = `https://graph.facebook.com/v19.0?id=${encodeURIComponent(pageUrl)}&fields=id&access_token=${process.env.FACEBOOK_APP_USER_TOKEN}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const parsedData = FacebookPageResponseSchema.safeParse(data);

    if (parsedData.success) {
      return parsedData.data.id; // ✅ Facebook Page ID
    } else {
      throw new Error("Invalid API response:", parsedData.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Facebook Page ID:", error);
    return null;
  }
};
