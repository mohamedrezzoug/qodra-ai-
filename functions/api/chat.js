
export async function onRequestPost({ request, env }) {
  try {
    if (!env.GEMINI_API_KEY) {
      return Response.json(
        { error: "AI key is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message = String(body.message || "").trim();

    if (!message || message.length > 4000) {
      return Response.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    const language = ["ar", "en", "fr"].includes(body.language)
      ? body.language
      : "ar";

    const languageNames = {
      ar: "Arabic (Moroccan Darija when appropriate)",
      en: "English",
      fr: "French"
    };

    const history = Array.isArray(body.history)
      ? body.history.slice(-10).map(item => ({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{
            text: String(item.content || "").slice(0, 2000)
          }]
        })).filter(item =>
          item.parts[0].text.length > 0
        )
      : [];

    const contents = [
      ...history,
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const systemPrompt = `
You are QODRA AI, a helpful global personal development assistant.

Your mission:
- Help people discover and develop their abilities.
- Support education, creativity and critical thinking.
- Turn ideas into practical action plans.
- Encourage innovation and positive contributions to humanity.
- Help people set realistic goals and measure progress.

Always:
- Respond in ${languageNames[language]}.
- Be friendly, respectful and encouraging.
- Give practical, clear and organized answers.
- Adapt your answers to the user's level.
- Never claim to have performed actions you have not performed.
- Do not invent facts or information.
- Protect user privacy.
- For medical, legal or financial matters, provide general information and recommend qualified professionals when appropriate.

You are QODRA AI. Your motto is:
Every human being has potential worth developing.
`;

    const apiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500
          }
        })
      }
    );

    const result = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error("Gemini API error:", result);

      return Response.json(
        { error: "AI service temporarily unavailable" },
        { status: 502 }
      );
    }

    const reply = result.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      return Response.json(
        { error: "No response generated" },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("QODRA error:", error);

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
