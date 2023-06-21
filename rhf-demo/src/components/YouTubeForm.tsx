import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string
  email: string
  channel: string
}

const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  // FORM SUBMISSION : (3 Steps)
      // Step 1: Define the functionwhich should be called when the submit button is pressed
      const onSubmit = (data: FormValues) => { 
        console.log('Form submitted', data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>

      {/* For Devtool visualization */}
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
