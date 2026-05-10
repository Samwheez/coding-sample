# coding-sample
This code snippet comes from an automated label transcription service where I worked full stack development with a small team for clients at the Smithsonian Institute's National Museum of Natural History.\
The entirety of this code snippet was written by me.\
This code snippet does not necessarily include the full code in any file.\
This is not representative of our full tech stack.\
I am not restricted from sharing any part of our full tech stack.

We had received feedback during a presentation to our clients to add some way to visualize progress of the image processing early on in our development.\
This code snippet showcases a simple, modular solution to that problem.  It uses server-sent events to update the status view with a loading bar and the current active processing step.\
Additional events with arbitrary parameters can be added very easily using this framework.

### index.js
This is the route for the server-sent events using the express.js app object.  It passes an event handler that is used to update the progress bar and show the current processing step.
### sse-middleware.js
This is a simple middleware for any server-sent event route that sets the appropriate response headers
### image-processing.js
This handles the image processing pipeline.  The given event handler is called for the progress bar after each image is completed, as well as the message before starting any processing step.
### status.ejs
This is the view that updates on receiving a server-sent event.  It also redirects to the output page when the processing is complete.
