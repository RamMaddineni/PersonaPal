const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
let previousMessages = [];

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

exports.botController = async (req, res) => {
  try {
    // console.log(text, personality, conversationStyle, expertise, strictnessValue, character);
    const { valid } = req.body;
    if (!valid) {
      previousMessages = [];
      console.log("server side changed behaviours");
      return res.status(200).json({
        message: "Ok u changed behaviours",
      });
    }
    const { currentMessage } = req.body;
    const { personality } = req.body;
    const { expertise } = req.body;
    let { strictnessValue } = req.body;
    strictnessValue = (strictnessValue * 2) / 5;
    const { character } = req.body;

    let p1 =
      personality == "default" || personality == ""
        ? ""
        : `Always Answer in a ${personality} way and fix this as your personality .`;
    let p2 =
      character == "default" || character == ""
        ? ""
        : `and reply  like a character named ${character} `;
    let p3 =
      expertise == "default" || expertise == ""
        ? ""
        : `You are expertise in ${expertise} field ONLY , Answer to the questions which are related to your field  only , otherwise say ' I am not expertise in this field , you may ask questions related to ${expertise}'`;
    // `You are an expert in ${expertise} and can only answer queries related to it. Say 'I am not expert' in any other field related queries.`;

    console.log(p1, p2, p3);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: ` ${p1} ${p2} ${p3} ` },
        ...previousMessages,
        { role: "system", content: ` ${p1} ${p2} ${p3} ` },
        { role: "user", content: currentMessage },
      ],
      // set temperature
      temperature: strictnessValue,
    });

    if (response) {
      console.log(previousMessages);
      if (response.data.choices[0].message.content) {
        previousMessages.push({ role: "user", content: currentMessage });
        previousMessages.push({
          role: "system",
          content: response.data.choices[0].message.content,
        });
        return res.status(200).json(response.data.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
