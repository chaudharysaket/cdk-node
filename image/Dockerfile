# Use the official AWS Lambda Node.js runtime as a parent image
FROM public.ecr.aws/lambda/nodejs:14

# Copy function code and package.json to the container image
COPY index.js package.json ${LAMBDA_TASK_ROOT}

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could be app.handler if your handler is in app.js)
CMD [ "index.handler" ]
