import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  // nested objects
  social: {
    twitter: string;
    facebook: string;
  };
  // array
  phoneNumbers: string[];
};

const YouTubeForm = () => {
  // Default values for the feilds in the form - Here the username feild gets populated with batman as default
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },
  });

  // Example usage: How to store the default values by making an API call
  // const form = useForm<FormValues>({
  //   defaultValues: async () => {
  //       const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  //       const data = await response.json();
  //       return {
  //         username: data.username,
  //         email: data.email,
  //         channel: "",
  //       }
  //   }
  // });

  const { register, control, handleSubmit, formState } = form;
  //errors -  For validation errors messages
  const { errors } = formState;

  // FORM SUBMISSION : (3 Steps)
  // Step 1: Define the functionwhich should be called when the submit button is pressed
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  // Step 2: Destructure handleSubmit in form (LINE NUM 9)
  //    const { register, control, handleSubmit } = form;

  // Step 3: Pass an onSubmit function in <form> JSX tag and pass it like
  //  <form onSubmit={handleSubmit(onSubmit //--HINT: which we defined in step 1--// )}> (LINE NUM 26)

  renderCount++;
  return (
    <div>
      {/* HINT: renderCount / 2 : because react strict mode renders each comeponent twice so we divide by 2 */}
      <h1>Youtube Form ({renderCount / 2})</h1>

      {/* noValidate : means This will prevent browser validation and allowing react-hook-form to handle the VALIDATIONS of the feilds */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // By adding the below line brings it under tracking of react-hook-form
            {...register("username", {
              // Validation - Required feild
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          {/* To display validation error messages */}
          <p className="error">{errors.username?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              // Validation - RegEx
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              // Validation - Custom validation for our specific business logic
              validate: {
                // Here "notAdmin" is just a name (any name can be given here)
                // HINT : "feildValue" is the value which you enter for the feild (here its for email)
                notAdmin: (feildValue) => {
                  return (
                    /* It checks if the value of the email field is not equal to "admin@example.com". 
                      -  If it is equal to "admin@example.com", it returns the error message "Enter a different email address".
                      -  If it is not equal to "admin@example.com", it returns true, indicating that the validation has passed. */
                    feildValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                // Here "notBlackListed" is just a name (any name can be given here)
                notBlackListed: (feildValue) => {
                  return (
                    /* It checks if the email address entered by the user does not end with "baddomain.com".
                      -  If it does not end with "baddomain.com", the validation passes and returns true.
                      -  If it ends with "baddomain.com", the validation fails and returns the error message "This domain is not supported".
                      NOTE :  The `!` operator is used to negate the result of `feildValue.endsWith("baddomain.com")`. */
                    !feildValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              // Validation - Required feild
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          {/* Here register("social.twitter") - social.twitter is because we are nesting the twitter into social object */}
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "Twitter profile-id is required",
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          {/* Here register("social.facebook") - social.facebook is because we are nesting the facebook into social object */}
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Facebook profile-link is required",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          {/* Here register("phoneNumbers.0")} - phoneNumbers.0 is to store in 0th index of phoneNumbers[] */}
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Primary Phone Number is required",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.at(0)?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          {/* Here register("phoneNumbers.1")} - phoneNumbers.1 is to store in 1st index of phoneNumbers[] */}
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Secondary Phone Number is required",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.at(1)?.message}</p>
        </div>

        <button>Submit</button>
      </form>

      {/* For Devtool visualization */}
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
