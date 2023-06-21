# YouTube Form Summary(Notes)

What all has been implemented on `YouTubeForm.tsx` file are :

## OUTPUT:

![Alt text](../assets/yt-form/yt-form-output.png)

## On Submit:

![Alt text](../assets/yt-form/yt-form-submit.png)

## Feild Validations:

1. `Username` Feild :

   - Validation : Required feild
     ![Alt text](../assets/yt-form/image.png)

2. `Email` Feild :

   - Validation : Follows General email format (using RegEx)
     ![Alt text](../assets/yt-form/image-1.png)

   - Validation : Custom validation

     It checks if the value of the email field is not equal to "admin@example.com".
     - If it is equal to "admin@example.com", it returns the error message "Enter a different email address".
     - If it is not equal to "admin@example.com", it returns true, indicating that the validation has passed.

   ![Alt text](../assets/yt-form/image-2.png)

   - Validation : Custom validation

     It checks if the email address entered by the user does not end with "baddomain.com". 
     - If it does not end with "baddomain.com", the validation passes and returns true. 
     - If it ends with "baddomain.com", the validation fails and returns the error message "This domain is not supported".

     ![Alt text](../assets/yt-form/image-3.png)

