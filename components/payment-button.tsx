'use client';

export default function PaymentButton() {
  const handlePayment = () => {
    if (typeof window === 'undefined' || !window.Pi) {
      alert('افتح التطبيق من Pi Browser');
      return;
    }

    window.Pi.createPayment(
      {
        amount: 1, // عدّل المبلغ المناسب لـ GMP
        memo: 'GMP Payment',
        metadata: { app: 'GMP' },
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
          alert('تم الدفع بنجاح!');
        },
        onCancel: (paymentId: string) => {
          console.log('تم الإلغاء:', paymentId);
        },
        onError: (error: Error) => {
          console.error('خطأ بالدفع:', error);
        },
      }
    );
  };

  return (
    <button
      onClick={handlePayment}
      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium"
    >
      ادفع بـ Pi
    </button>
  );
}
