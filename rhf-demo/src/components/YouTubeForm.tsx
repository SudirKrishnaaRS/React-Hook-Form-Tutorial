import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>();
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
            {...register("username", {
              // Validating Required
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
              // Validating RegEx
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
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
              // Validating Required
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>

      {/* For Devtool visualization */}
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
