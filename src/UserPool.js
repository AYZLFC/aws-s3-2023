import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_fAsqQq5fC',
  ClientId: '2lofbteduocnk03vbeb8eobl6u'
};

export default new CognitoUserPool(poolData);