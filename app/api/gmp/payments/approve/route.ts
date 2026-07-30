import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json({ error: 'paymentId مفقود' }, { status: 400 });
    }

    const piResponse = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Key ${process.env.PI_API_KEY}`,
        },
      }
    );

    if (!piResponse.ok) {
      const errText = await piResponse.text();
      return NextResponse.json({ error: errText }, { status: piResponse.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'فشل الموافقة على الدفع' }, { status: 500 });
  }
}
