import { SHARED_ATTRIBUTES } from '../constants/sharedAttributes.constants';

export default (data, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(data),
  ...SHARED_ATTRIBUTES
});
