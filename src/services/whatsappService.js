const axios = require("axios");
const { fb_access_token } = require("../../constant");
require("dotenv").config();

const sendWhatsAppMessage = async (phone_number, message) => {
  const bodyWorkshopUserMessage = {
    event_name: "GenAI Event",
    date: "12 Nov 2024",
    time_start: "12:00 PM",
    time_end: "02:00 PM",
    location: "MIT College Satara ",
    description: "This is a test event",
    dress_Code: "Formal",
    contact_Person: "Sharad Bhadait",
    rsvp_by: "9552158335",
    contact_website: "sharad31.vercel.app",
    registration_link: "www.test.com",
  };
  console.log("bodu ======>  ", message);

  const workshop_template = [
    {
      type: "header",
      parameters: [
        {
          type: "text",
          text: `${message.event_name}`,
        },
      ],
    },
    {
      type: "body",
      parameters: [
        {
          type: "text",
          text: `${message.date}`,
        },
        {
          type: "text",
          text: `${message.time_start}`,
        },
        {
          type: "text",
          text: `${message.time_end}`,
        },
        {
          type: "text",
          text: `${message.location}`,
        },
        {
          type: "text",
          text: `${message.description}`,
        },
        {
          type: "text",
          text: `${message.dress_Code}`,
        },
        {
          type: "text",
          text: "91",
        },
        {
          type: "text",
          text: `${message.contact_person}`,
        },
        {
          type: "text",
          text: `${message.rsvp_by}`,
        },
        {
          type: "text",
          text: `${message.contact_website}`,
        },
        {
          type: "text",
          text: `${message.registration_link}`,
        },
        {
          type: "text",
          text: `${message.registration_link}`,
        },
        {
          type: "text",
          text: `${message.registration_link}`,
        },
      ],
    },
  ];

  try {
    let data = JSON.stringify({
      messaging_product: "whatsapp",
      to: 919552158335,
      type: "template",
      template: {
        name: "workshop_template",
        language: {
          code: "en",
        },
        components: workshop_template,
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://graph.facebook.com/v20.0/411262348747739/messages",
      headers: {
        Authorization: `Bearer ${fb_access_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log("Whatsapp api error ", err.message);
  }
};

// sendWhatsAppMessage();
module.exports = {
  sendWhatsAppMessage,
};
