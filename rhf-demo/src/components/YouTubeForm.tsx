import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

// Just for debugging if the component re-renders how many times
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
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  // Default values for the feilds in the form - Here the username feild gets populated with batman as default
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "sudir@gmail.com",
      channel: "sudir - yt",
      social: {
        twitter: "sudir@tw.com",
        facebook: "sudir@fb.com",
      },
      phoneNumbers: ["0422", "0123"],
      phNumbers: [{ number: "" }],
      age: 30,
      dob: new Date(),
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

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;

  //errors -  For validation errors messages
  const { errors, touchedFields, dirtyFields, isDirty } = formState;

  // console.log("Touched Feilds :",touchedFields);
  // console.log("Dirty Feilds :",dirtyFields);
  
  // isDirty is useful (HINT: like a flag) when to show/disable the submit button 
  // console.log("isDirty  :",isDirty);


  // For Dynamic Feilds
  // append - built-in function to add dynamic feild
  // remove - built-in function to remove dynamic feild
  const { fields, append, remove } = useFieldArray<any>({
    name: "phNumbers",
    control,
  });

  // FORM SUBMISSION : (3 Steps)
  // Step 1: Define the functionwhich should be called when the submit button is pressed
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  // Step 2: Destructure handleSubmit in form (LINE NUM 9)
  //    const { register, control, handleSubmit } = form;

  // Step 3: Pass an onSubmit function in <form> JSX tag and pass it like
  //  <form onSubmit={handleSubmit(onSubmit //--HINT: which we defined in step 1--// )}> (LINE NUM 26)

  // This function is called when the form submission fails due to errors
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors:", errors);
  }

  // ________________________________________________________________

  // Watch Feild Values
  // Watch Single value
  // const watchUsername = watch("username");

  // Watch Multiple values
  // const watchUsername = watch(["username","email"]);

  // Watch the entire form
  // const watchForm = watch();

  // When you want want to perfrom some side effects while watching the values
  // useEffect(() => {
  //   // Here value is the latest value which is being watched for changes
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   // This is a Cleanup method : we unsubcribe the subscription
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // ________________________________________________________________

  // Get Values : This method is useful for retrieving the values when a specific action is performed (eg button click)
  const handleGetValues = () => {
    // Get all the values
    console.log("Get Values", getValues());

    // Get single value
    console.log("Social Get Values", getValues("social"));

    // Get multiple value
    console.log(
      "username and email Get Values",
      getValues(["username", "email"])
    );
  };
  // ________________________________________________________________

  // Set value
  const handleSetValues = () => {
    // Syntax : setValue(feildName, value)
    // Here , we set the value of the username to "hello_test" when we click on the "Set Username" button
    // NOTE: By default it will not change the Touched:false & Dirty:false properties even though we chnage the value
    // setValue("username", "hello_test");

    // To chnage the Touched & Dirty properties
    setValue("username", "hello_test", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  renderCount++;
  return (
    <div>
      {/* HINT: renderCount / 2 : because react strict mode renders each comeponent twice so we divide by 2 */}
      <h1>Youtube Form ({renderCount / 2})</h1>

      {/* Displaying watched values */}
      {/* <h2>Watched value: {watchUsername}</h2> */}
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}

      {/* noValidate : means This will prevent browser validation and allowing react-hook-form to handle the VALIDATIONS of the feilds */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
              // disabled: true,
              //Example Scenario : Conditionally disable only when channel (above form feild) is not filled
              disabled: watch("channel") === "",
              required: "Enter twitter profile",
            })}
          />
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
          {/* <p className="error">{errors.phoneNumbers?.at(0)?.message}</p> */}
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
          {/* <p className="error">{errors.phoneNumbers?.at(1)?.message}</p> */}
        </div>

        {/* Dynamic Feilds */}
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                // TIP:  Here key={feild.id} beacuse react-hook-form website recommends this and not to use index
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)} // Here  as const is just for TYPESCRIPT
                  />
                  {/* Remove button is shown for every phone number except the first ph number feild */}
                  {index > 0 && (
                    // remove - built-in function to remove dynamic feild
                    //        - accepts index to be removed as a parameter
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}

            {/*  append - built-in function to add dynamic feild 
                                - accepts an object as a parameter */}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              // NOTE: By default it's set as STRING , so make sure valueAsNumber is true to make it as a number
              valueAsNumber: true,
              // Validation - Required feild
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        {/* This div is just for css styling  */}
        <div className="form-control">
          <label htmlFor="dob">Date Of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              // NOTE: By default it's set as STRING , so make sure valueAsDate is true to make it as a date format
              valueAsDate: true,
              // Validation - Required feild
              required: {
                value: true,
                message: "DOB is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <br />
        <button>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>

        <button type="button" onClick={handleSetValues}>
          Set Username Value
        </button>
      </form>

      {/* For Devtool visualization */}
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
