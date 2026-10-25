const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Aquí se conecta con el cerebro de Google Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/jarvis', async (req, res) => {
    const { mensaje } = req.body;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Eres JARVIS, el asistente de inteligencia artificial personal de un entusiasta de la tecnología de 13 años. 
            Tu tono debe ser amigable, inteligente, un poco sarcástico y muy motivador, como en las películas de Iron Man. 
            Te encantan las redes sociales como TikTok e Instagram. Responde de forma concisa al siguiente mensaje: ${mensaje}`,
        });
        
        res.json({ respuesta: response.text });
    } catch (error) {
        console.error(error);
        res.json({ respuesta: "Señor, he detectado un error en mis sistemas centrales. Inténtelo de nuevo." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`JARVIS activo en puerto ${PORT}`));
