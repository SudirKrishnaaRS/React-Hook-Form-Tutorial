import React from "react";

const YouTubeForm = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="channel">Channel</label>
        <input type="text" name="channel" id="channel" />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YouTubeForm;
