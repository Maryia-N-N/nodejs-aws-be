import 'source-map-support/register';

import {getProductsByIdService} from './handlers/getProductsById.service';
import {getProductsList} from './handlers/getProductsList.service';

export default {
	getProductsList,
	getProductsByIdService
};

