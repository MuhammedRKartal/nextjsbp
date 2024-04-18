import { api } from './api';
import { account, checkout, user } from '../urls';
import { buildClientRequestUrl } from '../../utils';
import { CheckoutType } from '@/types';

interface CreateCheckoutRequest {
  basket_id: number;
}
export const checkoutApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCheckout: build.mutation<CheckoutType, void>({
      query: () => ({
        url: buildClientRequestUrl(checkout.createCheckout, {
          contentType: 'application/json'
        }),
        method: 'POST'
      })
    })
  }),
  overrideExisting: true
});

export const { useCreateCheckoutMutation } = checkoutApi;
