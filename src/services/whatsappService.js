const axios = require("axios");
const { fb_access_token } = require("../../constant");
require("dotenv").config();

const sendWhatsAppMessage = async (phone_number,message) => {
  const bodyUserMessage = {
    event_name: "GenAI Event",
    date: "12 Nov 2024",
    time_start: "12:00 PM",
    time_end: "02:00 PM",
    location: "Mumbai",
    Description: "This is a test event",
    dress_Code: "Formal",
    contact_Person: "John Doe",
    rsvp_by: "1234567890",
    contact_website: "www.test.com",
    registration_link: "www.test.com",
  };
  try {
    let data = JSON.stringify({
      messaging_product: "whatsapp",
      to: phone_number,
      type: "template",
      template: {
        name: "workshop_template",
        language: {
          code: "en",
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "text",
                text: `${bodyUserMessage.event_name}`,
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: bodyUserMessage.date,
              },
              {
                type: "text",
                text: bodyUserMessage.time_start,
              },
              {
                type: "text",
                text: bodyUserMessage.time_end,
              },
              {
                type: "text",
                text: bodyUserMessage.location,
              },
              {
                type: "text",
                text: bodyUserMessage.Description,
              },

              {
                type: "text",
                text: bodyUserMessage.dress_Code,
              },
              {
                type: "text",
                text: "91",
              },
              {
                type: "text",
                text: bodyUserMessage.contact_Person,
              },
              {
                type: "text",
                text: bodyUserMessage.rsvp_by,
              },
              {
                type: "text",
                text: bodyUserMessage.contact_website,
              },
              {
                type: "text",
                text: bodyUserMessage.registration_link,
              },
              {
                type: "text",
                text: bodyUserMessage.registration_link,
              },
              {
                type: "text",
                text: bodyUserMessage.registration_link,
              },
            ],
          },
        ],
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



