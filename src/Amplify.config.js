export default {
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'bandituseruploads'
  },
  apiGateway: {
    REGION: 'us-east-1',
    post_URL: 'https://4g7llowddj.execute-api.us-east-1.amazonaws.com/prod',
    user_URL: 'https://9pwbyj6hrj.execute-api.us-east-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_jOvDJbhB0',
    APP_CLIENT_ID: 'hj4rvvjbr0i775lc8d1s3dpuc',
    IDENTITY_POOL_ID: 'us-east-1:ca0f2d70-dd7c-400d-817b-7b2f267d1ba2'
  }
};
