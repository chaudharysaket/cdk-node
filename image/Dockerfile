# Use the official AWS Lambda Node.js runtime as a parent image
FROM public.ecr.aws/x6n7b2o2/newrelic-lambda-layers-nodejs:18-arm64 AS Extension
FROM public.ecr.aws/lambda/nodejs:18

# Extension code
WORKDIR /opt
COPY --from=Extension /opt/ .

# Copy function code and package.json to the container image
COPY index.mjs package.json ./

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could be app.handler if your handler is in app.js)
CMD [ "index.handler" ]
