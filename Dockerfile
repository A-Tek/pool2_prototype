
RUN mkdir -p /home/ubuntu/18fapi
WORKDIR /home/ubuntu/18fapi

RUN npm install -g bower grunt-cli mocha

RUN groupadd -r node \
&&  useradd -r -m -g node node

# Copy source
COPY . /home/ubuntu/18fapi
RUN chown -R node:node /home/ubuntu/18fapi

USER node

# Install mean dependencies
WORKDIR /home/ubuntu/18fapi
RUN npm install; bower install; grunt build


# Expose port 3000 to host
EXPOSE 3000

# Start server
WORKDIR /home/ubuntu/18fapi
CMD ["npm", "start"]
