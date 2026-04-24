/**
 * Payment Service - Handles payment gateway integration (Paystack & Flutterwave)
 */

export interface PaymentConfig {
  provider: 'paystack' | 'flutterwave';
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  reference: string;
  message: string;
  status?: string;
}

/**
 * Paystack Payment Integration
 */
export const paystackPayment = async (config: PaymentConfig): Promise<PaymentResponse> => {
  const { email, amount, reference, metadata } = config;
  
  // Get Paystack public key from environment
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  
  if (!paystackKey) {
    throw new Error('Paystack public key not configured');
  }

  // Initialize PaystackPop
  const handler = window.PaystackPop.setup({
    key: paystackKey,
    email: email,
    amount: amount * 100, // Convert to kobo (Paystack uses smallest currency unit)
    ref: reference || `ref_${Date.now()}`,
    metadata: {
      ...metadata,
      tenant_id: metadata?.tenantId,
      payment_type: metadata?.paymentType || 'rent',
    },
    onClose: () => {
      throw new Error('Payment window closed');
    },
    onSuccess: (response: any) => {
      return {
        success: true,
        reference: response.reference,
        message: 'Payment successful',
        status: 'success',
      };
    },
  });

  return new Promise((resolve, reject) => {
    handler.openIframe();
    
    // Listen for payment completion
    const checkStatus = setInterval(() => {
      if (window.paystackPaymentStatus === 'completed') {
        clearInterval(checkStatus);
        resolve({
          success: true,
          reference: reference || `ref_${Date.now()}`,
          message: 'Payment successful',
          status: 'success',
        });
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(checkStatus);
      reject(new Error('Payment timeout'));
    }, 300000); // 5 minute timeout
  });
};

/**
 * Flutterwave Payment Integration
 */
export const flutterwavePayment = async (config: PaymentConfig): Promise<PaymentResponse> => {
  const { email, amount, reference, metadata } = config;

  // Get Flutterwave public key from environment
  const flutterKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;

  if (!flutterKey) {
    throw new Error('Flutterwave public key not configured');
  }

  // Load Flutterwave script if not already loaded
  if (!window.FlutterwaveCheckout) {
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.body.appendChild(script);

    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  return new Promise((resolve, reject) => {
    window.FlutterwaveCheckout({
      public_key: flutterKey,
      tx_ref: reference || `flw_${Date.now()}`,
      amount: amount,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: email,
        phonenumber: metadata?.phone,
        name: metadata?.name,
      },
      customizations: {
        title: 'BamiHustle - Rent Payment',
        description: metadata?.description || 'Rent payment for your apartment',
        logo: 'https://bamihustle.com/logo.png',
      },
      meta: {
        tenant_id: metadata?.tenantId,
        payment_type: metadata?.paymentType || 'rent',
      },
      onComplete: (response: any) => {
        if (response.status === 'successful') {
          resolve({
            success: true,
            reference: response.transaction_id,
            message: 'Payment successful',
            status: 'success',
          });
        } else {
          reject(new Error('Payment failed'));
        }
      },
      onClose: () => {
        reject(new Error('Payment cancelled'));
      },
    });
  });
};

/**
 * Process payment with selected provider
 */
export const processPayment = async (config: PaymentConfig): Promise<PaymentResponse> => {
  try {
    if (config.provider === 'paystack') {
      return await paystackPayment(config);
    } else if (config.provider === 'flutterwave') {
      return await flutterwavePayment(config);
    } else {
      throw new Error('Unknown payment provider');
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

/**
 * Verify payment with backend
 */
export const verifyPayment = async (reference: string, provider: string): Promise<any> => {
  try {
    const response = await fetch(`/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        provider,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
};
