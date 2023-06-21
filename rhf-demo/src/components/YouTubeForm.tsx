import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

const YouTubeForm = () => {
  const form = useForm();
  const { register, control } = form;

  renderCount++;
  return (
    <div>
      {/* HINT: renderCount / 2 : because react strict mode renders each comeponent twice so we divide by 2 */}
      <h1>Youtube Form (Re-Render Count : {renderCount / 2} )</h1>
      <form>
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
