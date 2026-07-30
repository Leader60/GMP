'use client';

declare global {
  interface Window {
    Pi?: {
      createPayment: (
        paymentData: {
          amount: number;
          memo: string;
          metadata: Record<string, unknown>;
        },
        callbacks: {
          onReadyForServerApproval: (paymentId: string) => void;
          onReadyForServerCompletion: (paymentId: string, txid: string) => void;
          onCancel: (paymentId: string) => void;
          onError: (error: Error) => void;
        }
      ) => void;
    };
  }
}

export default function PiPaymentTest() {
  const handlePayment = () => {
    if (typeof window === 'undefined' || !window.Pi) {
      alert('افتح التطبيق من Pi Browser');
      return;
    }

    window.Pi.createPayment(
      {
        amount: 1,
        memo: 'GMP Annual Subscription Test',
        metadata: { app: 'GMP', type: 'test' },
      },
      {
        onReadyForServerApproval: async (paymentId: string) => {
          await fetch('/api/gmp/payments/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId }),
          });
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          await fetch('/api/gmp/payments/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid }),
          });
          alert('تم الدفع بنجاح ✅');
        },
        onCancel: (paymentId: string) => {
          console.log('تم إلغاء الدفع:', paymentId);
        },
        onError: (error: Error) => {
          console.error('خطأ في الدفع:', error);
          alert('حدث خطأ أثناء الدفع');
        },
      }
    );
  };

  return (
    <button
      onClick={handlePayment}
      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium"
    >
      اختبار الدفع (1 Pi)
    </button>
  );
}
