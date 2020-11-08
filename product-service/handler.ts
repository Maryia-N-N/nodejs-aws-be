import 'source-map-support/register';

import { getProductsByIdService } from './handlers/getProductsById.service';
import { getProductsListService } from './handlers/getProductsList.service';
import { updateProductService } from './handlers/updateProduct.service';

export {
  getProductsListService,
  getProductsByIdService,
  updateProductService
};
