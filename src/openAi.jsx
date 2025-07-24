export async function sendMsgToOpenAi(message) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAIPxCXosk1z0JChlF2Bk2VaKW-Xqi4OMI', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    })
  });

  const data = await res.json();

  // Gemini returns output in a slightly different structure
  const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  return generatedText;
}

