export async function onRequest() {
  const contactInfo = {
    email: "anlaharpanda@gmail.com",
    github: "https://github.com/itsanla",
    linkedin: "https://www.linkedin.com/in/anlaharpanda",
    message: "Anda bisa menghubungi Anla langsung melalui email (anlaharpanda@gmail.com), GitHub (github.com/itsanla), atau LinkedIn (linkedin.com/in/anlaharpanda)"
  };

  return new Response(
    JSON.stringify({ message: contactInfo.message }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
