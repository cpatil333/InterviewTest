import React, { useState } from "react";

const ContactForm = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(inputValue);

    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content type for JSON
          },
          body: JSON.stringify(inputValue),
        }
      );

      // Wait for the response to be parsed as JSON
      const text = await response.text();
      console.log("Response text:", text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Received non-JSON response from server.");
        return;
      }
      if (data !== null) {
        alert("Congratulations!");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="name-input">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={inputValue.name}
          onChange={handleInputValue}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={inputValue.email}
          onChange={handleInputValue}
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Enter Mesage"
          rows="10"
          value={inputValue.message}
          onChange={handleInputValue}
        ></textarea>
      </div>
      <button>Send</button>
    </form>
  );
};

export default ContactForm;
