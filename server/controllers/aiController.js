
const axios = require('axios');
const EmailHistory = require('../models/EmailHistory');

exports.generateEmail = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        message: 'Please enter a prompt.'
      });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({
        message: 'Prompt cannot exceed 2000 characters.'
      });
    }

    // Validate Groq API key
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return res.status(500).json({
        message: 'AI service is not configured.'
      });
    }

    const systemPrompt = `
You are PitchPilot, an expert cold-email writing assistant.

Generate personalized, professional outreach content based on the user's prompt.
Do not invent specific facts, experience, achievements, or company information.
Use placeholders when information is missing.

Return all four fields:
- subject: 6-9 words
- emailBody: approximately 80-120 words
- linkedInDM: 30-40 words
- followUpEmail: 50-60 words

Use a professional, natural, confident tone.
Avoid generic phrases and exaggerated claims.
Return only the requested JSON object, with no Markdown or extra text.
`;

    // Generate email using Groq
    const aiResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt.trim()
          }
        ],
        temperature: 0.4,
        max_completion_tokens: 4000,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'pitchpilot_email',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                emailBody: { type: 'string' },
                linkedInDM: { type: 'string' },
                followUpEmail: { type: 'string' }
              },
              required: [
                'subject',
                'emailBody',
                'linkedInDM',
                'followUpEmail'
              ],
              additionalProperties: false
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    const choice = aiResponse.data?.choices?.[0];
    const generatedText = choice?.message?.content;

    // Log diagnostic information without exposing credentials
    console.log('Groq finish reason:', choice?.finish_reason);
    console.log('Groq response received:', Boolean(choice));

    if (choice?.finish_reason === 'length') {
      return res.status(502).json({
        message: 'The AI response was cut off. Please try again.'
      });
    }

    if (
      typeof generatedText !== 'string' ||
      generatedText.trim().length === 0
    ) {
      console.error('Groq returned empty content:', {
        finishReason: choice?.finish_reason
      });

      return res.status(502).json({
        message: 'The AI returned an empty response. Please try again.'
      });
    }

    // Parse the JSON response
    let parsedResponse;

    try {
      parsedResponse = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Groq returned invalid JSON:', generatedText);

      return res.status(502).json({
        message: 'The AI returned an invalid response. Please try again.'
      });
    }

    // Validate and normalize fields
    const emailData = {
      subject: typeof parsedResponse.subject === 'string'
        ? parsedResponse.subject.trim()
        : '',
      emailBody: typeof parsedResponse.emailBody === 'string'
        ? parsedResponse.emailBody.trim()
        : '',
      linkedInDM: typeof parsedResponse.linkedInDM === 'string'
        ? parsedResponse.linkedInDM.trim()
        : '',
      followUpEmail: typeof parsedResponse.followUpEmail === 'string'
        ? parsedResponse.followUpEmail.trim()
        : ''
    };

    if (!emailData.subject || !emailData.emailBody) {
      return res.status(502).json({
        message: 'The AI response is missing the email subject or body.'
      });
    }

    // Ensure user is authenticated
    if (!req.user?._id) {
      return res.status(401).json({
        message: 'Please log in again.'
      });
    }

    // Save generated email to history
    const historyEntry = await EmailHistory.create({
      userId: req.user._id,
      prompt: prompt.trim(),
      subject: emailData.subject,
      emailBody: emailData.emailBody,
      linkedInDM: emailData.linkedInDM,
      followUpEmail: emailData.followUpEmail
    });

    return res.status(200).json(historyEntry);

  } catch (error) {
    const status = error.response?.status;
    const apiError = error.response?.data?.error;

    console.error('AI Generation Error:', {
      status,
      code: apiError?.code,
      message: apiError?.message || error.message,
      failedGeneration: apiError?.failed_generation
    });

    if (status === 429) {
      return res.status(429).json({
        message: 'Groq rate limit reached. Please wait and try again.'
      });
    }

    if (status === 401) {
      return res.status(502).json({
        message: 'Groq rejected the API credentials. Check your server configuration.'
      });
    }

    if (status === 400) {
      return res.status(502).json({
        message: 'Groq rejected the generation request. Check the model and response format.',
        error: apiError?.message || 'Invalid request'
      });
    }

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        message: 'The AI request timed out. Please try again.'
      });
    }

    return res.status(500).json({
      message: 'Failed to generate email.',
      error: apiError?.message || error.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        message: 'Please log in again.'
      });
    }

    const history = await EmailHistory
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json(history);

  } catch (error) {
    console.error('History fetch error:', error.message);

    return res.status(500).json({
      message: 'Failed to fetch email history.'
    });
  }
};
