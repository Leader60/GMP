import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { paymentId, txid } = await request.json();

    if (!paymentId || !txid) {
      return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 });
    }

    const piResponse = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Key ${process.env.PI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txid }),
      }
    );

    if (!piResponse.ok) {
      const errText = await piResponse.text();
      return NextResponse.json({ error: errText }, { status: piResponse.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'فشل إتمام الدفع' }, { status: 500 });
  }
}
